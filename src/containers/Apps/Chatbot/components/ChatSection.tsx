'use client';
import React, { forwardRef, memo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { useAuth } from '@/hooks/useAuth';
// import { messages } from '@/containers/Apps/Chatbot/example_data/chat';
import { BsFillSendFill } from 'react-icons/bs';
import { MdOutlineFileUpload } from 'react-icons/md';
import Tooltip from '@/components/Tooltip';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import { useChatbot } from '@/contexts/ChatbotContext';
import LaunchScreen from '@/containers/Apps/Chatbot/components/LaunchScreen';
import AutoResizeQuill from '@/containers/Apps/Chatbot/components/Textarea';
import { LeftChat } from '@/components/SkeletonLoad/ChatSection';
import { motion } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import Copy from '@/components/CopyToClipBoard';
import markdownToTxt from 'markdown-to-txt';
import Markdown from '@/components/Markdown';
import { NewChatMessageEnum } from 'types/apps/chatbot/api.type';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import UploadModal from '@/containers/Apps/Chatbot/components/Modals/UploadModal';
import useUID from '@/hooks/useUID';
import { Image } from '@nextui-org/react';
import { LiaTimesSolid } from 'react-icons/lia';

interface ChatSectionProps {
	classNames?: {
		wrapper?: string;
	};
};

type ChatMessageProps = {
	classNames?: {
		wrapper?: string;
		chatList?: string;
	};
	children?: React.ReactNode;
	role?: 'assistant' | 'user'; // Add a prop for message role
	content?: string;
	contentMedia?: string[];
	isNewMessage?: boolean;
};

const ChatMessage = forwardRef<React.ElementRef<'div'> & ChatMessageProps, React.ComponentPropsWithoutRef<'div'> & ChatMessageProps>(
	({ classNames, children, role, content, contentMedia, isNewMessage = false, ...props }, ref) => {
		const isAssistant = role === 'assistant';
		const messageWrapperClass = cn('flex justify-start w-full', classNames?.wrapper || '');
		const messageListClass = cn('flex flex-col gap-1 w-full', classNames?.chatList || '');
		const { user } = useAuth();
		const [generateUID] = useUID();
		if (isNewMessage && content === NewChatMessageEnum.NEW_MESSAGE && isAssistant) {
			return <LeftChat />;
		}

		return (
			<div className={cn('relative', messageWrapperClass)} ref={ref} {...props}>

				{isAssistant ? (
					<div className={'h-8 w-8 rounded-full pt-5'}>
						<Icons.logo className="h-8 w-8 fill-blue-400" />
					</div>
				) : (
					<div className={'h-10 w-10 rounded-full bg-gray-800 mt-2.5'}>
						<div className={'w-full h-full flex justify-center items-center text-sm'}>
							{user?.username?.substring(0, 2).toUpperCase() || 'User'}
						</div>
					</div>
				)}
				<div className={messageListClass}>
					<div className={'h-fit max-w-2xl w-fit w-[inherit] rounded-xl p-5'}>
						<div
							className={cn('absolute w-full h-full bottom-0 left-0 overflow-hidden ',
								isNewMessage ? 'heightToZero' : '',
								isAssistant ? 'h-0 transition-all delay-500 duration-[1000]' : 'hidden')}
							style={{
								animationDuration: content.split('\n').length * 0.2 + 's',
							}}
						>
							<div className={'h-20 bg-gradient-to-t from-[--background-hero]'}></div>
							<div className={'h-full bg-[--background-hero]'}></div>
						</div>
						<Markdown>{content}</Markdown>
						<div className={'flex p-2 m-2 gap-4 justify-start'}>
							{!isAssistant && (
								contentMedia.map((media, index) => (
									<div className={'relative w-24 h-28'} key={'content-media_' + generateUID()}>
										<div
											className={'w-full h-full relative rounded-xl flex justify-center items-center bg-gray-800 overflow-hidden'}>
											<Image src={media} radius={'lg'} alt={'media'} className={'w-full h-full object-cover'} />
										</div>
									</div>
								))
							)}
						</div>
					</div>
					<div className={'w-full flex justify-start items-center gap-2'}>
						{isAssistant && (
							<>
								<Tooltip title={'Like this response'}>
									<div
										className={'p-2 rounded-full bg-gray-800 cursor-pointer transition-all hover:bg-gray-700 hover:text-white'}>
										<AiOutlineLike />
									</div>
								</Tooltip>
								<Tooltip title={'Unlike this response'}>
									<div
										className={'p-2 rounded-full bg-gray-800 cursor-pointer transition-all hover:bg-gray-700 hover:text-white'}>
										<AiOutlineDislike />
									</div>
								</Tooltip>
								<Tooltip title={'Unlike this response'}>
									<div
										className={'p-2 rounded-full bg-gray-800 cursor-pointer transition-all hover:bg-gray-700 hover:text-white'}>
										<FiEdit />
									</div>
								</Tooltip>
								<Tooltip title={'Copy'}>
									<Copy text={markdownToTxt(content)} childrenProps={{
										className: 'p-2 rounded-full bg-gray-800 cursor-pointer transition-all hover:bg-gray-700 hover:text-white',
									}} />
								</Tooltip>
							</>
						)}
					</div>
				</div>
			</div>
		);
	},
);

ChatMessage.displayName = 'ChatMessage';


export function MessageListRender() {
	const messages = useSelector((state: RootState) => state.chat.messages);
	const { newMessageId, isNewSection, isSending } = useChatbot();
	const [isShowScrollTo, setIsShowScrollTo] = React.useState<boolean>(false);

	const messageWrapperRef = React.useRef<HTMLDivElement & ChatMessageProps>(null);
	const scrollRef = React.useRef<HTMLDivElement>(null);

	const scrollToMessage = () => {
		if (messageWrapperRef.current) {
			// console.log(messageWrapperRef.current);
			const messageWrapper = messageWrapperRef.current;
			messageWrapper.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const checkScroll = () => {
		const scrollHeight = scrollRef.current.getBoundingClientRect().height;
		const lastMessageY = messageWrapperRef.current?.getBoundingClientRect().y;
		if (messages.length === 0) return;
		if (lastMessageY && lastMessageY < scrollHeight) {
			setIsShowScrollTo(false);
		} else {
			setIsShowScrollTo(true);
		}
	};

	useEffect(() => {

		const scrollEl = scrollRef.current;
		if (scrollEl) {
			scrollEl.addEventListener('scroll', checkScroll);
		}
		return () => {
			scrollEl.removeEventListener('scroll', checkScroll);
		};
	}, [checkScroll]);

	useEffect(() => {
		setTimeout(() => {
			scrollToMessage();
		}, 1000);
	}, []);

	useEffect(() => {
		scrollToMessage();
	}, [newMessageId]);

	return (
		<>
			<div
				className={' flex flex-col items-center gap-5 overflow-hidden overflow-y-auto w-full h-full pt-10 pb-20 relative'}
				ref={scrollRef}>
				{isNewSection ?
					<LaunchScreen />
					: (
						<div className={'max-w-3xl w-full flex flex-col justify-center gap-5 h-fit px-2 relative'}>
							{messages.length === 0 && (
								<>
									<LeftChat />
									<LeftChat classnames={{
										wrapper: 'flex-row-reverse',
										chatList: 'items-end',
									}} />
								</>
							)}
							{messages.map((message, index) => {
								return (
									<ChatMessage
										key={index}
										role={message.role}
										classNames={{
											wrapper: cn('flex justify-start w-full', message.role === 'assistant' ? 'items-start' : 'items-start flex-row-reverse'),
											chatList: message.role === 'assistant' ? 'items-start' : 'items-end',
										}}
										id={message.id}
										ref={index === messages.length - 1 ? messageWrapperRef : null}
										content={message.message}
										contentMedia={message.contentMedia}
										isNewMessage={index === messages.length - 1}
									/>
								);
							})}
						</div>
					)}
			</div>
			<motion.div className={'absolute bottom-0 cursor-pointer z-[100]'} initial={'rest'} animate={{
				y: isShowScrollTo ? -120 : -50,
				opacity: isShowScrollTo ? 1 : 0,
			}} variants={{
				rest: {
					y: -50,
				},
			}} transition={{
				type: 'spring',
				damping: 10,
				stiffness: 100,
			}}>
				<div className={'p-2 rounded-full bg-gray-700/70 backdrop-blur border border-gray-600'}
						 onClick={scrollToMessage}>
					<IoIosArrowDown />
				</div>
			</motion.div>
		</>
	);
}

const ContentMediaItem = memo(({ media, index, removeItemAction }: {
	media: string;
	index: number;
	removeItemAction: (index: number) => void
}) => {
	return (
		<div className={'relative w-24 h-28'}>
			<div
				className={'w-full h-full relative rounded-xl flex justify-center items-center bg-gray-800 overflow-hidden'}>
				<Image src={media} radius={'lg'} alt={'media'} className={'w-full h-full object-cover'} />
			</div>
			<button onClick={() => {
				removeItemAction(index);
			}}
							className={'w-5 h-5 rounded-full flex justify-center items-center bg-gray-600 hover:bg-gray-500 hover:text-white transition-all absolute top-0 right-0 z-[100] translate-x-[30%] translate-y-[-30%]'}>
				<LiaTimesSolid />
			</button>
		</div>
	);
});
ContentMediaItem.displayName = 'ContentMediaItem';

function ContentMediaList() {
	const { contentMedia, setContentMedia } = useChatbot();
	const [generateUID] = useUID();
	const deleteItem = React.useCallback((indexToDelete: number) => {
		setContentMedia((prevContent) =>
			prevContent.filter((item, index) => index !== indexToDelete),
		);
	}, []);
	if (contentMedia.length === 0) return null;
	return (
		<div className={'flex p-2 m-2 gap-4 justify-start w-full'}>
			{contentMedia.map((media, index) => (
				<ContentMediaItem
					key={'media-content_' + generateUID()}
					media={media}
					index={index}
					removeItemAction={deleteItem} />
			))}
		</div>
	);
}

const ContentMediaMemo = memo(ContentMediaList);

function InputMessage(
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
				<Tooltip title={'Upload'}>
					<UploadModal>
						<div
							className={'p-2 aspect-square flex justify-center items-center rounded-full bg-gray-600 cursor-pointer'}>
							<MdOutlineFileUpload className={'text-white'} size={26} />
						</div>
					</UploadModal>
				</Tooltip>
				<Tooltip title={'Generate prompt'}>
					<div className={'p-3 rounded-full bg-gray-600 cursor-pointer'} onClick={() => {
						if (promptText === '') {
							// setPromptText('Chủ đề đáng chú ý');
							return;
						}
						action.sendMessage(promptText, contentMedia);
						setContentMedia([]);
						setIsSendMessage(true);
						setPromptText('');
					}}>
						<BsFillSendFill className={'text-white'} />
					</div>
				</Tooltip>
			</div>
		</div>
	);
}

function InputWrapper() {
	const { sendMessage } = useChatbot();

	return (
		<div className={'w-full h-14 h-fit rounded-[30px] border border-gray-800 bg-gray-950 relative z-[110]'}>
			<ContentMediaMemo />
			<InputMessage action={{
				sendMessage,
			}} />
		</div>
	);
}

function ChatSection({ classNames }: ChatSectionProps) {
	return (
		<div
			className={cn(' shadow rounded-2xl p-2 md:p-4 pt-0 pr-0  w-full h-full mx-auto flex flex-col justify-between items-center relative', classNames?.wrapper || '')}>
			<MessageListRender />
			<div className={'w-full h-fit flex flex-col justify-center items-center relative max-w-3xl pr-4'}>
				<div className={'w-full h-14 bg-gradient-to-t from-[background-hero] absolute top-[-100%]'}></div>
				<InputWrapper />
				<div className={'absolute'}></div>
			</div>
		</div>
	);
}

export default ChatSection;