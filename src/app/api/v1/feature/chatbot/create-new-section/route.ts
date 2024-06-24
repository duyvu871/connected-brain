import { ChatbotService } from '@/services/Chatbot/chatbot.service';
import { NextRequest } from 'next/server';
import { SendMessageRequest } from '@/types/features/Chatbot';
import { ObjectId } from 'mongodb';
import { dataTemplate } from '@/helpers/returned_response_template';
import { getServerAuthSession } from '@/lib/nextauthOptions';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
	try {
		const session = await getServerAuthSession();
		const user = session?.user;
		if (!user) return dataTemplate({
			error: 'Unauthorized',
		}, 400);
		const user_id = user._id;
		const { message, messageMedia } = await req.json() as SendMessageRequest;

		if (!message) throw new Error('Message is required');
		const messageContent = {
			textContent: message,
			mediaContent: messageMedia ?? [],
		};
		const chatbotService = new ChatbotService(new ObjectId(user_id));
		const response = await chatbotService.createSectionMessage(message.split(' ').slice(0, 5).join(' '));
		const newSectionId = response._id.toString();
		const sendMessageResponse = await chatbotService.sendMessage(messageContent, new ObjectId(newSectionId));
		const generatedMessage = sendMessageResponse.message;
		;
		return dataTemplate({
			_id: response._id,
			section_name: response.section_name,
			message_generated: generatedMessage,
		}, 200);
	} catch (error) {
		console.log(error);
		return dataTemplate({ error: error.message }, 500);
	}
}