'use client';
import React, { createContext, useCallback, useContext, useLayoutEffect, useState } from 'react';
import store from '@/redux/store';
import {
	insertMessage as InsertMessageAction,
	loadChat,
	updateChatById as UpdateChatByIdAction,
} from '@/redux/actions/ChatbotAtion';
import {
	CreateNewSectionResponse,
	NewChatMessageEnum,
	SendMessageRequest,
	UpdateSectionRequest,
	UpdateSectionResponse,
} from 'types/apps/chatbot/api.type';
import { MessageHistoryType, SectionMessageGeneratedType } from 'types/features/Chatbot';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserSessionPayload } from 'types/user.type';
import { APIs } from '@/utils/route-list';
import { ObjectId } from 'mongodb';
import useUID from '@/hooks/useUID';

interface Message {
	id: string;
	sender: 'user' | 'bot';
	text: string;
}

interface ChatbotContextType {
	newMessageId: string;
	promptText: string;
	contentMedia: string[];
	setContentMedia: React.Dispatch<React.SetStateAction<string[]>>;
	setPromptText: (prompt: string) => void;
	messages: Message[];
	sections: SectionMessageGeneratedType[];
	isNewSection: boolean;
	isSending?: boolean;
	sendMessage: (text: string, mediaContent: string[]) => Promise<void>;
	clearMessages: () => void;
	insertMessage: (text: string, contentMedia: string[], sender: 'user' | 'assistant', chat_id: string) => void;
	createSectionMessage: (message: string) => Promise<void>;
	updateChatHistory: (chat_id: string, update_data: UpdateSectionRequest['update_data']) => Promise<UpdateSectionResponse['data']>;
}

const defaultContext: ChatbotContextType = {
	newMessageId: '',
	contentMedia: [],
	promptText: '',
	setContentMedia: () => {
	},
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
	const { user: userSession } = useAuth();
	const [chat_id, setChatId] = useState<string>('');
	const [user, setUser] = useState<UserSessionPayload>(userSession);
	const [generateUID] = useUID();
	// const { _id, role, username, uid } = user;
	const [contentMedia, setContentMedia] = useState<string[]>([]);

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

	const insertMessage = (text: string, contentMedia: string[], sender: 'user' | 'assistant', chat_id: string) => {
		store.dispatch(InsertMessageAction(text, contentMedia, sender, chat_id as string));
	};

	const updateMessage = (text: string, chat_id: string) => {
		store.dispatch(UpdateChatByIdAction(text, chat_id as string));
	};

	const sendMessage = async (text: string, mediaContent: string[] = []) => {
		if (!chat_id) {
			await createSectionMessage(text);
			return;
		}
		insertMessage(text, mediaContent, 'user', chat_id);
		const newMessageId = 'new_message_' + generateUID();
		insertMessage(NewChatMessageEnum.NEW_MESSAGE, [], 'assistant', newMessageId);
		setIsSending(true);
		const response = await fetch('/api/v1/feature/chatbot/send-message', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message: text,
				messageMedia: mediaContent,
				section_id: chat_id,
				user_id: user._id,
			} as SendMessageRequest),
		});
		setContentMedia([]);
		const data = await response.json() as MessageHistoryType;
		if (response.status !== 200) {
			console.error(data);
			return;
		}
		setIsSending(false);
		// insertMessage(data.message, 'assistant', chat_id);
		setNewMessageId(newMessageId);
		updateMessage(data.message, newMessageId);
	};

	const getSections = useCallback(async (user_id: string) => {
		if (!user_id) {
			// console.error('User id not found');
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

	const createSectionMessage = async (message: string, mediaContent: string[] = []) => {
		insertMessage(message, mediaContent, 'user', 'preview-created-user');
		insertMessage(NewChatMessageEnum.NEW_MESSAGE, [], 'assistant', 'preview-created-assistant');
		setIsSending(true);
		setIsNewSection(false);
		const response = await fetch(APIs.chatbot.createSection, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message: message,
				contentMedia: mediaContent,
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
		// pre-fetch the new chat page
		router.prefetch(`/feature/chatbot-assistant?id=${newChatId}`);
		// redirect to the new chat page
		router.push(`/feature/chatbot-assistant?id=${newChatId}`);
		// insert new message to the chat
		insertMessage(data.message_generated, [], 'assistant', newChatId);
		setNewMessageId(newChatId);
		// update new section to the list
		setSections((prevSections) => [{
			_id: data._id as unknown as ObjectId,
			section_name: data.section_name,
			user_id: user._id as unknown as ObjectId,
			createdAt: new Date(),
			updatedAt: new Date(),
			message_generated: [''] as unknown as ObjectId[],
		},
			...prevSections]);
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
				contentMedia: message.mediaMessage,
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
		if (params) {
			// console.log(params.get('id'));
			setChatId(params.get('id'));
		}
	}, [params]);

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
				contentMedia,
				setContentMedia,
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