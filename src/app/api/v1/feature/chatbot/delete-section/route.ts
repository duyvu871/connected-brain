import { ChatbotService } from '@/services/Chatbot/chatbot.service';
import { UpdateSectionRequest } from 'types/apps/chatbot/api.type';
import { NextRequest } from 'next/server';
import { getServerAuthSession } from '@/lib/nextauthOptions';
import { dataTemplate } from '@/helpers/returned_response_template';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
	try {
		const session = await getServerAuthSession();
		const user = session?.user;
		if (!user) return dataTemplate({
			error: 'Unauthorized',
		}, 400);
		const user_id = user._id;
		const { update_data, section_id } = (await req.json()) as UpdateSectionRequest;

		const chatbotService = new ChatbotService(user_id as unknown as ObjectId);
		const response = await chatbotService.updateChatHistory(section_id, update_data);

		return dataTemplate({
			data: response,
		}, 200);
	} catch (error: any) {
		console.log(error);
		return dataTemplate({
			error: error.message,
		}, 500);
	}
};