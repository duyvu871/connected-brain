import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import { useChatbot } from '@/contexts/ChatbotContext';
import React, { forwardRef, useEffect } from 'react';
import LaunchScreen from '@/containers/Apps/Chatbot/components/LaunchScreen';
import { LeftChat } from '@/components/SkeletonLoad/ChatSection';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { useAuth } from '@/hooks/useAuth';
import useUID from '@/hooks/useUID';
import { NewChatMessageEnum } from 'types/apps/chatbot/api.type';
import { Icons } from '@/components/icons';
import Markdown from '@/components/Markdown';
import { Image } from '@nextui-org/react';
import Tooltip from '@/components/Tooltip';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import Copy from '@/components/CopyToClipBoard';
import markdownToTxt from 'markdown-to-txt';

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
		if (content === NewChatMessageEnum.NEW_MESSAGE && isAssistant) {
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


export default function MessageListRender() {
	const messages = useSelector((state: RootState) => state.chat.messages);
	const { newMessageId, isNewSection, isSending, isLoadMessage } = useChatbot();
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
							{isLoadMessage && (
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