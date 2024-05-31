// Actions.ts
import { ObjectId } from 'mongodb';

export enum ChatActionTypes {
	UPDATE_CHAT = 'UPDATE_CHAT',
	INSERT_MESSAGE = 'INSERT_MESSAGE',
	DELETE_MESSAGE = 'DELETE_MESSAGE',
	LOAD_CHAT = 'LOAD_CHAT',
	UPDATE_CHAT_BY_ID = 'UPDATE_CHAT_BY_ID',
}

interface UpdateChatAction {
	type: ChatActionTypes.UPDATE_CHAT;
	payload: {
		messages: InsertMessageAction['payload']['messages']; // Update the message array
	};
}

interface UpdateChatByIdAction {
	type: ChatActionTypes.UPDATE_CHAT_BY_ID;
	payload: {
		message: string; // Update the message array
		id: string;
	};
}

interface InsertMessageAction {
	type: ChatActionTypes.INSERT_MESSAGE;
	payload: {
		messages: {
			message: string;
			role: 'user' | 'assistant';
			id: string;
		}[];
	};
}

interface DeleteMessageAction {
	type: ChatActionTypes.DELETE_MESSAGE;
	payload: {
		messageId: string; // Or any unique identifier for messages
	};
}

interface LoadChatAction {
	type: ChatActionTypes.LOAD_CHAT;
	payload: {
		messages: InsertMessageAction['payload']['messages']
	};
}

export type ChatAction =
	| UpdateChatAction
	| InsertMessageAction
	| DeleteMessageAction
	| LoadChatAction
	| UpdateChatByIdAction;

// Create action creators
export const updateChat = (newMessages: InsertMessageAction['payload']['messages']): UpdateChatAction => ({
	type: ChatActionTypes.UPDATE_CHAT,
	payload: { messages: newMessages },
});

export const updateChatById = (newMessage: string, id: string): UpdateChatByIdAction => ({
	type: ChatActionTypes.UPDATE_CHAT_BY_ID,
	payload: { message: newMessage, id },
});

export const insertMessage = (message: string, role: 'user' | 'assistant', id: string): InsertMessageAction => ({
	type: ChatActionTypes.INSERT_MESSAGE,
	payload: {
		messages: [{ message, role, id }],
	},
});

export const deleteMessage = (messageId: string | ObjectId): DeleteMessageAction => ({
	type: ChatActionTypes.DELETE_MESSAGE,
	payload: { messageId: messageId.toString() },
});

export const loadChat = (payload: InsertMessageAction['payload']): LoadChatAction => ({
	type: ChatActionTypes.LOAD_CHAT,
	payload: { messages: payload.messages },
});