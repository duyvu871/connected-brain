import { ObjectId } from 'mongodb';
import { SectionMessageGeneratedType } from 'types/features/Chatbot';

export type SendMessageRequest = {
	'id'?: (string);
	'message'?: (string);
	'section_id'?: (string);
}

export type SendMessageResponse = {
	'id'?: (string);
	'message'?: (string);
	'section_id'?: (string);
}

export type CreateNewSectionRequest = {
	user_id: string;
}

export type CreateNewSectionResponse = {
	_id: string | ObjectId;
	section_name: string;
	message_generated: string;
}

export type UpdateSectionRequest = {
	update_data: ExcludeProperties<SectionMessageGeneratedType, '_id' | 'updatedAt' | 'user_id' | 'createdAt' | 'message_generated'>;
	section_id: string;
}

export type UpdateSectionResponse = {
	data: {
		insertedId: string;
		modifiedData: Partial<SectionMessageGeneratedType>;
	};
	error?: string;
}

export enum NewChatMessageEnum {
	USER = 'user',
	NEW_MESSAGE = 'new_message',
}