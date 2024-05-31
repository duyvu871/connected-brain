import { ObjectId } from 'mongodb';

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
