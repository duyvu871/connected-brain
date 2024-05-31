import {
	Content,
	GenerationConfig,
	GoogleGenerativeAI,
	HarmBlockThreshold,
	HarmCategory,
	SafetySetting,
} from '@google/generative-ai';
import { initAI } from './init';

export class GeminiChatService {
	private genAI: GoogleGenerativeAI;
	private model: any;
	private readonly generationConfig: GenerationConfig;
	private readonly safetySettings: SafetySetting[];

	constructor(apiKey: string) {
		this.genAI = new GoogleGenerativeAI(apiKey);
		this.model = this.genAI.getGenerativeModel({
			model: 'gemini-1.5-flash-latest',
		});
		this.generationConfig = {
			temperature: 1,
			topP: 0.95,
			topK: 64,
			maxOutputTokens: 8192,
			responseMimeType: 'text/plain',
		};
		this.safetySettings = [
			{
				category: HarmCategory.HARM_CATEGORY_HARASSMENT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
		];
	}

	public async sendMessage(message: string, history: Content[], passInitPrompt?: boolean): Promise<string> {
		const initMessage = initAI().initPrompt as unknown as Content;
		const chatSession = this.model.startChat({
			generationConfig: this.generationConfig,
			safetySettings: this.safetySettings,
			history: passInitPrompt ? [initMessage, ...history] : history,
		});

		const result = await chatSession.sendMessage(message);
		return result.response.text();
	}
}
