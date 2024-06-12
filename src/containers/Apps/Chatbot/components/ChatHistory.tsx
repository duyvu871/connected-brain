'use client';
import React, { forwardRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { FiMessageSquare } from 'react-icons/fi';
import { SlOptionsVertical } from 'react-icons/sl';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { IoIosSearch } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import Tooltip from '@/components/Tooltip';
import { useChatbot } from '@/contexts/ChatbotContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, useAnimate } from 'framer-motion';
import { TfiAngleDown, TfiAngleLeft, TfiAngleRight, TfiAngleUp } from 'react-icons/tfi';
import { SectionMessageGeneratedType } from 'types/features/Chatbot';
import DownloadModal from '@/containers/Apps/Chatbot/components/Modals/DownloadModal';

interface ChatHistoryProps {
	classnames?: {
		wrapper?: string;
	};
};

const variants = {
	forward_to_left: {
		x: 0,
		transition: {
			duration: 0.5,
		},
	},
	forward_to_bottom: {
		y: 0,
		transition: {
			duration: 0.5,
			delay: 0.6,
		},
	},
};

const SearchIcon = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((props, ref) => (
	<div ref={ref} {...props}>
		<IoIosSearch className={'w-6 h-6 cursor-pointer'} />
	</div>
));
SearchIcon.displayName = 'SearchIcon';

const ChatHistoryItem = ({ title, startContent, endContent, isActive = false, sectionId }: {
	title: string;
	startContent?: React.ReactNode;
	endContent?: React.ReactNode,
	isActive?: boolean;
	sectionId: string;
}) => {
	const router = useRouter();
	const { updateChatHistory } = useChatbot();

	const [enableEditTile, setEnableEditTile] = React.useState(false);
	const sectionTitleRef = React.useRef<HTMLInputElement>(null);
	const [isEditing, setIsEditing] = React.useState(false);
	const [sectionTitle, setSectionTitle] = React.useState<string>(title.slice(0, 20) + (title.length > 20 ? '...' : ''));
	const [isUpdate, setIsUpdate] = React.useState<boolean>(false);

	const directToSection = (sectionId: string) => {
		if (!isEditing) {
			router.push(`/feature/chatbot-assistant?id=${sectionId}`);
		}
	};

	const updateSectionName = async () => {
		await updateChatHistory(sectionId, { section_name: sectionTitle });
	};

	useEffect(() => {
		if (sectionTitleRef.current) {
			sectionTitleRef.current.type = isEditing ? 'text' : 'text';
			sectionTitleRef.current.value = (isEditing ? title : title.slice(0, 20) + (title.length > 20 ? '...' : ''));
			if (isEditing) {
				sectionTitleRef.current.focus();
			} else {

			}
		}
	}, [isEditing]);

	return (
		<div className={'w-full flex justify-between overflow-hidden gap-1 '}>
			<div
				className={cn('flex w-full max-w-sm p-2 px-4 rounded-xl gap-2 justify-between items-center hover:bg-gray-800 transition-all duration-300 cursor-pointer', isActive ? 'bg-gray-800 ' : '')}>
				<div className={'flex justify-start items-center w-full'}>
					<div className={'text-white'} onClick={() => directToSection(sectionId)}>
						{startContent || <FiMessageSquare className={'w-4 h-4 font-bold text-gray-400'} />}
					</div>
					<div className={'w-full text-start relative pl-2'}
							 onClick={() => directToSection(sectionId)}>
						<input
							className={cn('w-full outline-none bg-inherit text-gray-400 relative text-start', isEditing ? '' : 'cursor-pointer')}
							readOnly={!isEditing}
							type={'text'}
							value={sectionTitle}
							ref={sectionTitleRef}
							onChange={(e) => {
								setSectionTitle(e.target.value);
							}}
							onKeyDown={async (e) => {
								if (e.key === 'Enter') {
									if (isEditing) {
										updateSectionName();
										setEnableEditTile(false);
										setIsEditing(false);
									}
								}
							}}
							onBlur={() => {
								if (isEditing) {
									updateSectionName();
									setEnableEditTile(false);
									setIsEditing(false);
								}
							}}
						/>
					</div>
				</div>
				<div className={'text-white'} onClick={() => setEnableEditTile(prev => !prev)}>
					{endContent || (
						<div className={'relative'}>
							<Tooltip title={'Chat options'}>
								<div className={'text-gray-600 hover:text-gray-200 p-1 transition-all'}>
									<SlOptionsVertical className={'w-4 h-4'} />
								</div>
							</Tooltip>
						</div>
					)}
				</div>
			</div>
			<div className={cn(
				'flex transition-all duration-300 cursor-pointer',
				enableEditTile ? 'w-20' : 'w-0',
			)}>
				<div className={'w-20 h-10 bg-gray-800 rounded-xl text-gray-400 flex'}>
					<Tooltip title={'Edit'}>
						<div
							className={'w-full h-full flex justify-center items-center hover:text-gray-200 transition-all border-r border-gray-800'}>
							<HiPencil className={'w-6 h-6'} onClick={() => {
								setIsEditing(true);
								setEnableEditTile(true);
							}} />
						</div>
					</Tooltip>
					<Tooltip title={'Delete session'}>
						<div className={'w-full h-full flex justify-center items-center hover:text-gray-200 transition-all'}>
							<RiDeleteBin7Line className={'w-6 h-6'} />
						</div>
					</Tooltip>
				</div>
			</div>
		</div>
	);
};

function ChatSectionList({ sections, chatHistoryCollapsed }: {
	sections: SectionMessageGeneratedType[];
	chatHistoryCollapsed: boolean
}) {
	const params = useSearchParams();
	const chat_id = params.get('id');

	return (
		<div
			className={cn('w-full max-h-72 block gap-2 transition-all overflow-x-hidden overflow-y-auto', chatHistoryCollapsed ? 'w-0 h-0 overflow-hidden' : '')}>
			<div className={'h-full'}>
				{sections.map((message, index) => (
					<div key={'chat-history-' + message._id.toString()}
							 className={'flex flex-col m-0 rounded-xl w-full h-10 mt-1 mr-4'}>
						<ChatHistoryItem
							title={message.section_name}
							isActive={chat_id && (message._id.toString() === chat_id)}
							sectionId={message._id.toString()} />
					</div>
				))}
			</div>
		</div>
	);
}

function ChatHistory({ classnames }: ChatHistoryProps) {

	const router = useRouter();
	const { sections } = useChatbot();
	const [CHRef, animate] = useAnimate(); // CHRef: Chat History Ref

	const [sectionRendered, setSectionRendered] = React.useState<SectionMessageGeneratedType[]>(sections.slice(0, 5));

	const [showMore, setShowMore] = React.useState<boolean>(false);
	const [chatHistoryCollapsed, setChatHistoryCollapsed] = React.useState(false);
	const [isCollapsed, setIsCollapsed] = React.useState(true);

	const [searchValue, setSearchValue] = React.useState('');
	const searchRef = React.useRef<HTMLInputElement>(null);

	const filterItems = (value: string) => {
		const filteredItems = sectionRendered.filter(section => section.section_name.toLowerCase().includes(value.toLowerCase()));
		setSectionRendered(filteredItems);
	};

	useEffect(() => {
		router.prefetch('/feature/chatbot-assistant');
	}, []);

	useEffect(() => {
		(async () => {
			if (chatHistoryCollapsed) {
				await animate(CHRef.current, variants.forward_to_left);
				await animate(CHRef.current, variants.forward_to_bottom);
			}
		})();
	}, [CHRef, animate, chatHistoryCollapsed]);

	useEffect(() => {
		if (showMore) {
			setSectionRendered(sections);
		} else {
			setSectionRendered(sections.slice(0, 5));
		}
	}, [sections, showMore]);

	return (
		<div
			className={cn('p-5 pl-0 w-full h-full max-w-xs flex flex-col justify-between transition-all', chatHistoryCollapsed ? 'w-fit gap-0' : '')}>
			<div
				className={cn('flex flex-col justify-between border border-gray-800 gap-1 shadow w-full h-full rounded-2xl p-2 max-w-lg mx-auto select-none transition-all', classnames?.wrapper || '', chatHistoryCollapsed ? 'w-fit' : '')}>
				<div className={'h-full w-full'}>
					<div className={cn(' flex flex-col justify-start items-center', showMore && 'h-full')}>
						<div
							className={cn('w-full flex justify-between select-none mb-4 transition-all gap-2', chatHistoryCollapsed ? 'w-fit gap-2' : '', isCollapsed ? '' : 'gap-0')}>
							<Tooltip title={chatHistoryCollapsed ? 'Show History' : 'Hide history'}>
								<motion.div
									ref={CHRef}
									className={cn(
										'relative w-10 h-10 bg-gray-800 flex justify-center items-center rounded-xl transition-all duration-300 cursor-pointer',
										'hover:bg-gray-700',
										isCollapsed ? '' : 'w-0 ',
									)}
									onClick={() => setChatHistoryCollapsed(prev => !prev)}
									initial={'rest'}
								>
									{chatHistoryCollapsed ? <TfiAngleLeft /> : <TfiAngleRight />}
								</motion.div>
							</Tooltip>
							<div className={cn(
								'rounded-xl bg-gray-800 h-10 w-64 flex justify-center items-center px-3 transition-all duration-300',
								chatHistoryCollapsed ? 'w-10 p-0' : '',
								isCollapsed ? '' : 'w-full',
							)}
								// onMouseEnter={() => setIsCollapsed(false)}
							>
								<Tooltip title={'search'}>
									<SearchIcon
										className={chatHistoryCollapsed ? 'w-10 h-10 flex justify-center items-center transition-all hover:bg-gray-700 rounded-xl' : ''}
										onClick={() => {
											if (!searchValue) {
												searchRef?.current.focus();
											} else {
												filterItems(searchValue);
											}
											// setIsCollapsed(false);
										}} />
								</Tooltip>
								<input
									className={cn('outline-none bg-inherit h-10 ml-2 ', chatHistoryCollapsed ? ' ml-0 hidden' : 'w-full')}
									placeholder={'Search...'}
									onChange={(e) => setSearchValue(e.target.value)}
									ref={searchRef}
									onFocus={() => setIsCollapsed(false)}
									onBlur={() => setIsCollapsed(true)}
								/>
							</div>
						</div>
						<Tooltip title={'Create session'}>
							<div
								className={cn(
									'relative w-full h-10 bg-gray-800 flex justify-center items-center rounded-xl transition-all duration-[300] cursor-pointer',
									'hover:bg-gray-700',
									chatHistoryCollapsed ? 'w-[88px] p-0' : '',
								)}
								onClick={() => router.push('/feature/chatbot-assistant')}
							>
								<HiOutlineDocumentPlus className={'w-6 h-6'} />
								<span
									className={cn('text-white leading-5 transition-all', chatHistoryCollapsed ? 'w-0 invisible overflow-hidden' : 'ml-2 w-fit')}>{'Create New session'}</span>
							</div>
						</Tooltip>
						<div className={cn('w-full px-2 pt-2 transition-all', chatHistoryCollapsed ? 'w-0 invisible' : '')}>
							<span className={'font-semibold'}>Recent</span>
						</div>

						<ChatSectionList sections={sectionRendered} chatHistoryCollapsed={chatHistoryCollapsed} />

						<div className={'w-full h-fit p-2 flex justify-center items-center'}>
							<button
								className={cn('text-white bg-gray-800 rounded-xl p-2 transition-all duration-300 cursor-pointer', chatHistoryCollapsed ? 'w-0 h-0 hidden' : '')}
								onClick={() => setShowMore(prev => !prev)}>
								{showMore ? <TfiAngleUp /> : <TfiAngleDown />}
							</button>
						</div>
					</div>
				</div>
				<div className={'w-full h-28 bg-gray-900 rounded-xl p-3'}>
					<DownloadModal />
				</div>
			</div>
		</div>
	);
}

export default ChatHistory;