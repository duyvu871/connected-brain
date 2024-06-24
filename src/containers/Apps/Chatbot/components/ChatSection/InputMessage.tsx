import { useChatbot } from '@/contexts/ChatbotContext';
import React from 'react';
import { cn } from '@/lib/utils';
import AutoResizeQuill from '@/containers/Apps/Chatbot/components/Textarea';
import Tooltip from '@/components/Tooltip';
import UploadModal from '@/containers/Apps/Chatbot/components/Modals/UploadModal';
import { MdOutlineFileUpload } from 'react-icons/md';
import { BsFillSendFill } from 'react-icons/bs';
import { IoMicSharp } from 'react-icons/io5';
import VoiceRecordModal from '@/containers/Apps/Chatbot/components/Modals/VoiceRecordModal';
import store from '@/redux/store';

export default function InputMessage(
	{
		action,
	}: {
		action?: {
			sendMessage: (message: string, mediaContent?: string[]) => void;
		};
	}) {
	const { contentMedia, setContentMedia } = useChatbot();
	const [promptText, setPromptText] = React.useState<string>('');
	const [isTooLong, setIsTooLong] = React.useState<boolean>(false);
	const [isSendMessage, setIsSendMessage] = React.useState<boolean>(false);

	const updateInputValue = (value: string) => {
		store.dispatch({ type: 'UPDATE_INPUT', payload: value });
	};

	return (
		<div className={cn('flex justify-between items-center p-2', isTooLong ? 'flex-col' : '')}>
			<AutoResizeQuill
				isDisabled={false}
				placeholder={'Type a message'}
				value={promptText}
				className={cn(
					'w-full bg-transparent outline-none max-h-52 resize-none text-white',
					isTooLong ? 'h-fit p-4' : 'h-14',
				)}
				onContentChange={setPromptText}
				isClear={isSendMessage}
				setIsTooLong={setIsTooLong}
				event={{
					onEnter: () => {
						// console.log(promptText);
						if (promptText === '') return;
						action.sendMessage(promptText, contentMedia);
						setContentMedia([]);
					},
				}}
			/>
			<div
				className={cn('flex flex-row justify-end items-center gap-2', isTooLong ? 'w-full ' : 'w-fit')}>
				<Tooltip title={'Voice Record'}>
					<VoiceRecordModal>
						<div className={'p-2 aspect-square flex justify-center items-center rounded-full cursor-pointer'}>
							<IoMicSharp className={'text-white'} size={24} />
						</div>
					</VoiceRecordModal>
				</Tooltip>
				<Tooltip title={'Upload'}>
					<UploadModal>
						<div
							className={'p-2 aspect-square flex justify-center items-center rounded-full cursor-pointer'}>
							<MdOutlineFileUpload className={'text-white'} size={26} />
						</div>
					</UploadModal>
				</Tooltip>
				<Tooltip title={'Generate prompt'}>
					<div className={'p-3 rounded-full bg-gray-600 cursor-pointer'} onClick={() => {
						if (promptText === '') {
							return;
						}
						setContentMedia([]);
						// setIsSendMessage(true);
						setPromptText('');
						updateInputValue('');
						action.sendMessage(promptText, contentMedia);
						// setIsSendMessage(false);
					}}>
						<BsFillSendFill className={'text-white'} />
					</div>
				</Tooltip>
			</div>
		</div>
	);
}