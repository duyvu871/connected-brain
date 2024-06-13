import { ObjectId } from 'mongodb';

export type SectionMessageGeneratedType = {
	_id?: ObjectId;
	user_id: ObjectId;
	section_name: string;
	message_generated: ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}
export type MessageHistoryType = {
	_id?: ObjectId;
	message: string;
	mediaMessage?: string[];
	role: 'user' | 'assistant';
	createdAt: Date;
	updatedAt: Date;
	// coming soon update for the next version
	// modified history
}

export type SendMessageRequest = {
	user_id?: string;
	message?: string;
	messageMedia?: string[];
	section_id?: string;
}

export type SendMessageResponse = {
	message: string;
	role: 'USER' | 'ASSISTANT';
	createdAt: Date;
	updatedAt: Date;
}