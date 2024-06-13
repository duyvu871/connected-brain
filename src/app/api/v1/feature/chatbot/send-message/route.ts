import { ChatbotService } from '@/services/Chatbot/chatbot.service';
import { NextRequest } from 'next/server';
import { SendMessageRequest } from '@/types/features/Chatbot';
import { ObjectId } from 'mongodb';
import { dataTemplate } from '@/helpers/returned_response_template';
import { getServerAuthSession } from '@/lib/nextauthOptions';

export async function POST(req: NextRequest) {
	try {
		const session = await getServerAuthSession();
		const user = session?.user;
		if (!user) return dataTemplate({
			error: 'Unauthorized',
		}, 400);
		const user_id = user._id;
		const { section_id, message, messageMedia } = await req.json() as SendMessageRequest;
		if (!user_id) throw new Error('User ID is required');
		const messageContent = {
			textContent: message,
			mediaContent: messageMedia ?? [],
		};
		// console.log(messageContent);
		const chatbotService = new ChatbotService(new ObjectId(user_id));
		const response = await chatbotService.sendMessage(messageContent, new ObjectId(section_id));
		return dataTemplate({
			_id: response._id,
			message: response.message,
			role: response.role,
			createdAt: response.createdAt,
			updatedAt: response.updatedAt,
		}, 200);
	} catch (error) {
		return dataTemplate({ error: error.message }, 500);
	}
}