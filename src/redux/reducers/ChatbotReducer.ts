import { ChatAction, ChatActionTypes } from '@/redux/actions/ChatbotAtion';

export interface ChatState {
	messages: {
		message: string;
		role: 'user' | 'assistant';
		id: string;
	}[];
}

export const initialState: ChatState = {
	messages: [],
};

const chatReducer = (state = initialState, action: ChatAction): ChatState => {
	switch (action.type) {
		case ChatActionTypes.UPDATE_CHAT:
			return {
				...state,
				messages: [...action.payload.messages],
			};
		case ChatActionTypes.INSERT_MESSAGE:
			return {
				...state,
				messages: [...state.messages, ...action.payload.messages],
			};
		case ChatActionTypes.DELETE_MESSAGE:
			const newMessages = state.messages.filter((message, index) =>
				!(message.id === action.payload.messageId));
			console.log(newMessages);
			return { ...state, messages: newMessages };
		case ChatActionTypes.LOAD_CHAT:
			return {
				...state,
				messages: action.payload.messages,
			};
		case ChatActionTypes.UPDATE_CHAT_BY_ID:
			const updatedMessages = state.messages.map((message) => {
				if (message.id === action.payload.id) {
					return { ...message, message: action.payload.message };
				}
				return message;
			});
			return { ...state, messages: updatedMessages };
		default:
			return state;
	}
};

export default chatReducer;