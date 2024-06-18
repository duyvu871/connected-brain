import { useChatbot } from '@/contexts/ChatbotContext';
import React from 'react';
import InputMessage from '@/containers/Apps/Chatbot/components/ChatSection/InputMessage';
import ContentMedia from '@/containers/Apps/Chatbot/components/ChatSection/ContentMedia';

export default function InputWrapper() {
	const { sendMessage } = useChatbot();

	return (
		<div className={'w-full h-14 h-fit rounded-[30px] border border-gray-800 bg-gray-950 relative z-[110]'}>
			<ContentMedia />
			<InputMessage action={{
				sendMessage,
			}} />

		</div>
	);
}