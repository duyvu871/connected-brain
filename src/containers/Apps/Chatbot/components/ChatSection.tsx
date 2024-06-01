'use client';
import React, { forwardRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { useAuth } from '@/hooks/useAuth';
// import { messages } from '@/containers/Apps/Chatbot/example_data/chat';
import Markdown from '@/components/Markdown';
import { BsFillSendFill } from 'react-icons/bs';
import { MdOutlineFileUpload } from 'react-icons/md';
import Tooltip from '@/components/Tooltip';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import { useChatbot } from '@/contexts/ChatbotContext';
import LaunchScreen from '@/containers/Apps/Chatbot/components/LaunchScreen';
import AutoResizeQuill from '@/containers/Apps/Chatbot/components/Textarea';
import { LeftChat } from '@/components/SkeletonLoad/ChatSection';
import { useWindowScroll } from '@uidotdev/usehooks';
import { motion } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import Copy from '@/components/CopyToClipBoard';
import markdownToTxt from 'markdown-to-txt';

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
};

const ChatMessage = forwardRef<React.ElementRef<'div'> & ChatMessageProps, React.ComponentPropsWithoutRef<'div'> & ChatMessageProps>(
	({ classNames, children, role, content, ...props }, ref) => {
		const isAssistant = role === 'assistant';
		const messageWrapperClass = cn('flex justify-start w-full', classNames?.wrapper || '');
		const messageListClass = cn('flex flex-col gap-1 w-full', classNames?.chatList || '');
		const { user } = useAuth();
		return (
			<div className={messageWrapperClass} ref={ref} {...props}>
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
						<Markdown>{content}</Markdown>
						{/*{children}*/}
					</div>
					<div className={'w-full flex justify-start items-center'}>
						{isAssistant && (
							<Tooltip title={'Copy'}>
								<Copy text={markdownToTxt(content)} childrenProps={{
									className: 'p-2 rounded-full bg-gray-600 cursor-pointer',
								}} />
							</Tooltip>
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
	const [{ x, y }, scrollTo] = useWindowScroll();

	const [isShowScrollTo, setIsShowScrollTo] = React.useState<boolean>(false);

	const messageWrapperRef = React.useRef<HTMLDivElement & ChatMessageProps>(null);
	const scrollRef = React.useRef<HTMLDivElement>(null);

	const scrollToMessage = () => {
		if (messageWrapperRef.current) {
			console.log(messageWrapperRef.current);
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

	}, [messages]);

	return (
		<>
			<div
				className={' flex flex-col items-center gap-5 overflow-hidden overflow-y-auto w-full h-full pt-10 pb-20 relative'}
				ref={scrollRef}>
				{isNewSection ?
					isSending ? (
						<>
							<LeftChat />
							<LeftChat classnames={{
								wrapper: 'flex-row-reverse',
								chatList: 'items-end',
							}} />
						</>
					) : <LaunchScreen />
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

function InputMessage({
												action,
											}: {
	action?: {
		sendMessage: (message: string) => void;
	};
}) {
	const [isTooLong, setIsTooLong] = React.useState<boolean>(false);
	const { promptText, setPromptText } = useChatbot();
	return (
		<div className={'w-full h-14 h-fit rounded-[30px] border border-gray-800 bg-gray-950 relative z-[110]'}>
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
					setIsTooLong={setIsTooLong}
					event={{
						onShiftEnter: () => {
							// console.log(promptText);
							action.sendMessage(promptText);
						},
					}}
				/>
				<div
					className={cn('flex flex-row justify-end items-center gap-2', isTooLong ? 'w-full ' : 'w-fit')}>
					<Tooltip title={'Upload'}>
						<div
							className={'p-2 aspect-square flex justify-center items-center rounded-full bg-gray-600 cursor-pointer'}>
							<MdOutlineFileUpload className={'text-white'} size={26} />
						</div>
					</Tooltip>
					<Tooltip title={'Generate prompt'}>
						<div className={'p-3 rounded-full bg-gray-600 cursor-pointer'} onClick={() => {
							action.sendMessage(promptText);
							setPromptText('');
						}}>
							<BsFillSendFill className={'text-white'} />
						</div>
					</Tooltip>
				</div>
			</div>
		</div>
	);
}

function ChatSection({ classNames }: ChatSectionProps) {
	const { sendMessage } = useChatbot();

	return (
		<div
			className={cn(' shadow rounded-2xl p-4 pt-0 pr-0  w-full h-full mx-auto flex flex-col justify-between items-center', classNames?.wrapper || '')}>
			<MessageListRender />
			<div className={'w-full h-fit flex flex-col justify-center items-center relative max-w-3xl pr-4'}>
				<div className={'w-full h-14 bg-gradient-to-t from-[background-hero] absolute top-[-100%]'}></div>
				<InputMessage action={{ sendMessage }} />
				<div className={'absolute'}></div>
			</div>
		</div>
	);
}

export default ChatSection;