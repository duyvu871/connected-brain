import {
	Content,
	GenerationConfig,
	GoogleGenerativeAI,
	HarmBlockThreshold,
	HarmCategory,
	SafetySetting,
} from '@google/generative-ai';
import { initAI } from './init';

export type MimeTypes =
	'image/png'
	| 'image/jpeg'
	| 'image/gif'
	| 'image/webp'
	| 'image/svg+xml'
	| 'image/bmp'
	| 'image/tiff'
	| 'image/x-icon'
	| 'image/vnd.microsoft.icon'
	| 'image/vnd.wap.wbmp'
	| 'image/heic'
	| 'image/heif'
	| 'image/heif-sequence'
	| 'image/heic-sequence'
	| 'image/hej2'
	| 'image/avif'
	| 'image/avif-sequence'
	| 'image/jxl'
	| 'image/jxl-sequence'
	| 'image/jpm'
	| 'image/jpm-sequence'
	| 'image/jpg'
	| 'image/jpm'
	| 'image/jpm-sequence'
	| 'image/jpx'
	| 'image/jpx-sequence'
	| 'image/jpg'
	| 'image/jpg-sequence'
	| 'image/jpeg'
	| 'image/jpeg-sequence'
	| 'image/png'
	| 'image/png-sequence'
	| 'image/webp'
	| 'image/webp-sequence'
	| 'image/gif'
	| 'image/gif-sequence'
	| 'image/svg+xml'
	| 'image/svg+xml-sequence'
	| 'image/bmp'
	| 'image/bmp-sequence'
	| 'image/tiff'
	| 'image/tiff-sequence'
	| 'image/x-icon'
	| 'image/x-icon-sequence'
	| 'image/vnd.microsoft.icon'
	| 'image/vnd.microsoft.icon-sequence'
	| 'image/vnd.wap.wbmp'
	| 'image/vnd.wap.wbmp-sequence'
	| 'image/heic'
	| 'image/heic-sequence'
	| 'image/heif'
	| 'image/heif-sequence'
	| 'image/heif-sequence'
	| 'image/heic-sequence'
	| 'image/hej2'
	| 'image/hej2-sequence'
	| 'image/avif'
	| 'image/avif-sequence'
	| 'image/jxl'
	| 'image/jxl-sequence'
	| 'image/jpm'
	| 'image/jpm-sequence'
	| 'image/jpg'
	| 'image/jpg-sequence'
	| 'image/jpm'
	| 'image/jpm-sequence'
	| 'image/jpx'
	| 'image/jpx-sequence'
	| 'image/jpg'
	| 'image/jpg-sequence'
	| 'image/jpeg'
	| 'image/jpeg-sequence';


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

		// chatSession.

		const result = await chatSession.sendMessage(message);
		return result.response.text();
	}

	/**
	 * Generate a message from a prompt
	 * @param content base64 encoded asset
	 * @param mimeType mime type of the asset
	 * @returns
	 */
	public fileToGenerativePath(content: string, mimeType: MimeTypes): {
		inlineData: {
			data: string;
			mimeType: MimeTypes;
		};
	} {
		return {
			inlineData: {
				data: content,
				mimeType,
			},
		};
	}
}
