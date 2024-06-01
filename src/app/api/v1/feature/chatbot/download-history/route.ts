import { NextRequest } from 'next/server';
import { dataTemplate } from '@/helpers/returned_response_template';
import { getServerAuthSession } from '@/lib/nextauthOptions';
import { SendMessageRequest } from 'types/features/Chatbot';
import { ChatbotService } from '@/services/Chatbot/chatbot.service';
import { ObjectId } from 'mongodb';
import markdownToTxt from 'markdown-to-txt';

export async function POST(req: NextRequest) {
	try {
		const session = await getServerAuthSession();
		const user = session?.user;
		if (!user) return dataTemplate({
			error: 'Unauthorized',
		}, 400);
		const user_id = user._id;
		const { section_id } = await req.json() as SendMessageRequest;

		const chatbotService = new ChatbotService(new ObjectId(user_id));
		const response = await chatbotService.getChatHistoryDetail(new ObjectId(section_id));

		const dataFormatted = response.map((message) => {
			return `[${message.role}]: ${markdownToTxt(message.message)}`;
		}).join('\n\n');
		console.log(dataFormatted);

		const buffer = Buffer.from(dataFormatted, 'utf-8');

		const headers = new Headers();
		headers.append(
			'Content-Disposition',
			'attachment; filename="chatbot-history.txt"',
		);
		headers.append('Content-Type', 'application/text');

		return new Response(buffer, {
			headers,
			// status: 200,
		});
	} catch (error) {
		return dataTemplate({ error: error.message }, 500);
	}
}