import { combineReducers } from 'redux';
import chatReducer from '@/redux/reducers/ChatbotReducer';

const rootReducer = combineReducers({
	chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;