'use client';
import React, { createContext, useCallback, useContext, useLayoutEffect, useState } from 'react';
import store from '@/redux/store';
import { deleteMessage, insertMessage as InsertMessageAction, loadChat } from '@/redux/actions/ChatbotAtion';
// import { ObjectId } from 'mongodb';
import {
	CreateNewSectionResponse,
	SendMessageRequest,
	UpdateSectionRequest,
	UpdateSectionResponse,
} from 'types/apps/chatbot/api.type';
import { MessageHistoryType, SectionMessageGeneratedType } from 'types/features/Chatbot';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
// import { Session } from 'next-auth';
import { UserSessionPayload } from 'types/user.type';
import { APIs } from '@/utils/route-list';
import { ObjectId } from 'mongodb';

interface Message {
	id: string;
	sender: 'user' | 'bot';
	text: string;
}

interface ChatbotContextType {
	newMessageId: string;
	promptText: string;
	setPromptText: (prompt: string) => void;
	messages: Message[];
	sections: SectionMessageGeneratedType[];
	isNewSection: boolean;
	isSending?: boolean;
	sendMessage: (text: string) => Promise<void>;
	clearMessages: () => void;
	insertMessage: (text: string, sender: 'user' | 'assistant', chat_id: string) => void;
	createSectionMessage: (message: string) => Promise<void>;
	updateChatHistory: (chat_id: string, update_data: UpdateSectionRequest['update_data']) => Promise<UpdateSectionResponse['data']>;
}

const defaultContext: ChatbotContextType = {
	newMessageId: '',
	promptText: '',
	setPromptText: () => {
	},
	isNewSection: false,
	isSending: false,
	messages: [],
	sections: [],
	sendMessage: async () => {
	},
	clearMessages: () => {
	},
	insertMessage: () => {
	},
	createSectionMessage: async () => {
	},
	updateChatHistory: async () => ({
		insertedId: '',
		modifiedData: {},
		error: '',
	} as UpdateSectionResponse['data']),
};

const ChatbotContext = createContext<ChatbotContextType | null>(defaultContext);

function ChatbotProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const params = useSearchParams();
	const chat_id = params.get('id');
	const { user: userSession } = useAuth();
	const [user, setUser] = useState<UserSessionPayload>(userSession);
	// const { _id, role, username, uid } = user;
	const [messages, setMessages] = useState<Message[]>([]);
	const [sections, setSections] = useState<SectionMessageGeneratedType[]>([]);
	const [promptText, setPromptText] = useState<string>('');
	const [newMessageId, setNewMessageId] = useState<string>('');

	const [isNewSection, setIsNewSection] = useState<boolean>(false);
	const [isSending, setIsSending] = useState<boolean>(false);
	const [isLoadMessage, setIsLoadMessage] = useState<boolean>(false);

	const clearMessages = () => {
		store.dispatch(loadChat({
			messages: [],
		}));
	};

	const insertMessage = (text: string, sender: 'user' | 'assistant', chat_id: string) => {
		store.dispatch(InsertMessageAction(text, sender, chat_id as string));
	};

	const updateMessage = (text: string, sender: 'user' | 'assistant', chat_id: string) => {
		store.dispatch(InsertMessageAction(text, sender, chat_id as string));
	};

	const sendMessage = async (text: string) => {
		if (!chat_id) {
			await createSectionMessage(text);
			return;
		}
		insertMessage(text, 'user', chat_id);
		setIsSending(true);
		const response = await fetch('/api/v1/feature/chatbot/send-message', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message: text,
				section_id: chat_id,
				user_id: user._id,
			} as SendMessageRequest),
		});
		const data = await response.json() as MessageHistoryType;
		if (response.status !== 200) {
			console.error(data);
			return;
		}
		setIsSending(false);
		insertMessage(data.message, 'assistant', chat_id);
		setNewMessageId(data._id.toString());
	};

	const getSections = useCallback(async (user_id: string) => {
		if (!user_id) {
			console.error('User id not found');
			return;
		}
		const response = await fetch('/api/v1/feature/chatbot/get-sections?user_id=' + user_id);
		const data = await response.json() as { data: SectionMessageGeneratedType[]; error?: string };
		if (response.status !== 200) {
			console.error(data);
			return;
		}
		return data;
	}, [userSession]);

	const createSectionMessage = async (message: string) => {
		insertMessage(message, 'user', 'preview-created-user');
		insertMessage('Creating new section...', 'assistant', 'preview-created-assistant');
		setIsSending(true);

		const response = await fetch(APIs.chatbot.createSection, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message: message,
				user_id: user._id,
			}),
		});
		const data = await response.json() as CreateNewSectionResponse;
		if (response.status !== 200) {
			console.error(data);
			return;
		}
		const newChatId = data._id.toString();
		setIsSending(false);
		router.prefetch(`/feature/chatbot-assistant?id=${newChatId}`);

		router.push(`/feature/chatbot-assistant?id=${newChatId}`);

		deleteMessage('preview-created-assistant');
		insertMessage(data.message_generated, 'assistant', newChatId);
		setNewMessageId(newChatId);
		setSections((prevSections) => [{
			_id: data._id as unknown as ObjectId,
			section_name: data.section_name,
			user_id: user._id as unknown as ObjectId,
			createdAt: new Date(),
			updatedAt: new Date(),
			message_generated: [''] as unknown as ObjectId[],
		}, ...prevSections]);
	};

	const getChatHistory = useCallback(async (chat_id: string) => {
		if (!user?._id) {
			console.error('User id not found');
			return;
		}
		const response = await fetch('/api/v1/feature/chatbot/get-chat-history?user_id=' + user._id.toString() + '&section_id=' + chat_id);
		const responseData = await response.json() as { data: MessageHistoryType[]; error?: string };
		if (response.status !== 200) {
			console.error(responseData.error);
			return;
		}
		store.dispatch(loadChat({
			messages: responseData.data.map(message => ({
				id: message._id.toString(),
				role: message.role,
				message: message.message,
			})),
		}));
	}, [userSession]);

	const updateChatHistory = async (chat_id: string, update_data: UpdateSectionRequest['update_data']) => {
		const response = await fetch(APIs.chatbot.updateSection, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update_data,
				section_id: chat_id,
			}),
		});
		const responseData = (await response.json()) as UpdateSectionResponse;
		if (response.status !== 200) {
			console.error(responseData.error);
			return;
		}
		return responseData.data;
	};

	useLayoutEffect(() => {
		setUser(userSession);
	}, [userSession]);

	useLayoutEffect(() => {
		if (userSession) {
			if (chat_id) {
				clearMessages();
				setIsNewSection(false);
				(async () => {
					await getChatHistory(chat_id);
				})();
			} else {
				setIsNewSection(true);
				clearMessages();
			}
		}
	}, [chat_id, userSession]);

	useLayoutEffect(() => {
		if (userSession) {
			(async () => {
				const data = await getSections(userSession._id);
				if (data) {
					setSections(data.data);
				}
			})();
		}
	}, [userSession]);

	return (
		<ChatbotContext.Provider
			value={{
				updateChatHistory,
				newMessageId,
				promptText,
				setPromptText,
				sections,
				messages,
				isNewSection,
				isSending,
				sendMessage,
				clearMessages,
				insertMessage,
				createSectionMessage,
			}}>
			{children}
		</ChatbotContext.Provider>
	);
};

const useChatbot = () => {
	const context = useContext(ChatbotContext);
	if (!context) {
		throw new Error('useChatbot must be used within a ChatbotProvider');
	}
	return context;
};

export const runtime = 'edge';

export { ChatbotProvider, useChatbot };