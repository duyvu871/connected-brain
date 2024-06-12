'use client';

import React, { FC } from 'react';
// import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { GoHomeFill } from 'react-icons/go';
import { IoSettings } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { RiRobot3Line } from 'react-icons/ri';
import { LuPenLine } from 'react-icons/lu';
import { FaMicrophone } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useSidebarCollapse } from '@/hooks/useSidebarCollapse';
import { usePathname, useRouter } from 'next/navigation';
import Tooltip from '@/components/Tooltip';

const featureList2 = [
	{
		title: 'AI assistant',
		list: [
			{
				title: 'conservation',
				href: '/feature/conservation',
				description: 'A platform for connecting brain to handle native language processing',
				icon: HiOutlineChatBubbleLeftRight,
			},
			{
				title: 'assistant',
				href: '/feature/chatbot-assistant',
				description: 'Answer questions, find information, and help you get things done.',
				icon: RiRobot3Line,
			},
		],
	},
	{
		title: 'Text processor',
		list: [
			{
				title: 'OCR',
				href: '/feature/ocr',
				description: 'Extract text from images and documents.',
				icon: LuPenLine,
			},
			{
				title: 'speech to text',
				href: '/feature/speech-to-text',
				description: 'Convert spoken language into written text.',
				icon: FaMicrophone,
			},
		],
	},
];

interface NextUiSidebarProps {
	// hideSidebar: boolean;
	// setHideSidebar: (value: boolean) => void;
}

interface FeatureListProps {
	title: string;
	list: { title: string, href: string, description: string, icon: IconType }[];
	isCollapsed: boolean;
}


function NextUiSidebar(
	{
		// hideSidebar, setHideSidebar
	}: NextUiSidebarProps,
) {
	const router = useRouter();
	const pathname = usePathname();
	const { isCollapsed, toggleSidebarCollapse } = useSidebarCollapse();

	const FeatureListItem: FC<FeatureListProps['list'][number]> = ({ title, href, description, icon: Icon }) => {
		return (
			<li className="sidebar__item" key={title}>
				<div
					className={cn('font-semibold text-base no-underline text-black flex gap-2 px-4 py-[0.8rem]  justify-start items-center cursor-pointer bg-gray-800/50 backdrop-blur',
						` ${pathname.includes(href) ? 'bg-gray-600/40' : ''}`,
						'hover:bg-gray-600/40 transition-all',
					)}
					onClick={() => {
						router.push(href);
					}}>
					<span className="sidebar__icon text-gray-100">
						<Icon />
					</span>
					<span className={cn(
						'sidebar__name text-sm text-gray-100 capitalize overflow-hidden w-full transition-all',
					)}>{title}</span>
				</div>
			</li>
		);
	};

	const FeatureList: FC<FeatureListProps> = ({ title, list, isCollapsed }) => {
		return (
			<div className={'w-full text-start mt-3'}>
				<div className={cn(
					'w-full text-start text-sm font-semibold overflow-hidden p-2',
				)}>{title}</div>
				<ul className="sidebar__list w-full rounded-[0.8rem] overflow-hidden">
					{list.map(({ title: name, href, icon: Icon, description }) => {
						return (
							<Tooltip title={name} key={name}>
								<FeatureListItem title={name} href={href} icon={Icon} description={description} />
							</Tooltip>
						);
					})}
				</ul>
			</div>
		);
	};

	return (
		<div className="sidebar__wrapper w-fit flex flex-col fixed left-0 top-0 bg-[--background-hero] "
				 data-collapse={isCollapsed}>
			<button className={'btn top-16'} onClick={toggleSidebarCollapse}>
				{isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
			</button>
			<div className={cn('h-16 border-r-[1px] border-gray-800 flex',
				{
					'border-b-[1px]': true,
				})}>
				<div
					className={('w-full flex justify-center items-center cursor-pointer gap-2 m-0')}
					onClick={() => {
						router.push('/');
					}}>
					<Icons.logo className="h-8 w-8 fill-blue-400" />
					<p className={cn(
						'sidebar__logo-name text-md flex flex-col leading-5',
						isCollapsed ? 'hidden' : '',
					)}>
						<span>Connected</span>
						<span>Brain</span>
					</p>
				</div>
			</div>
			<aside
				className="w-60 h-full transition-all duration-[0.4s] ease-[cubic-bezier(0.175,0.885,0.32,1.1)] overflow-hidden p-2 pt-6 flex flex-col gap-2 justify-between items-center bg-[--background-hero] border-r-[1px] border-gray-800"
				data-collapse={isCollapsed}
			>
				<div className={'flex flex-col gap-3 w-fit h-16 border-0 border-b-[1px] border-gray-800'}>
					<div className={'border-0 border-b-[1px] border-gray-800'}>
						<div
							className={cn(
								`h-12 text-base font-semibold no-underline text-black flex mb-4 justify-between rounded-[0.8rem] items-center bg-gray-800/50 backdrop-blur `,
								// isCollapsed ? ' justify-center items-center h-fit' : '',
							)}
						>
							<div
								className={cn('flex w-full h-full justify-start items-center cursor-pointer hover:bg-gray-600/40 transition-all px-2 border-gray-700',
									'border-r-[1px] ',
								)}
								onClick={() => {
									router.push('/feature');
								}}>
									<span className="sidebar__icon text-gray-100">
										<GoHomeFill />
								</span>
								<span
									className="sidebar__name text-sm text-gray-100 whitespace-nowrap">Feature Overview</span>
							</div>
							<Tooltip title={'Settings'}>
								<motion.div
									className={cn('p-4 w-full h-full flex justify-center items-center hover:bg-gray-600/40 rounded-r-xl transition-all cursor-pointer ',
									)}
									initial={'reset'}
								>
									<IoSettings className={'sidebar__icon text-gray-100'} />
								</motion.div>
							</Tooltip>
						</div>
					</div>
					<div className={''}>
						{
							// isCollapsed ||
							<div className={cn('w-full text-start overflow-hidden')}>
								<span className={'text-md font-bold px-1 whitespace-nowrap'}>Product categories</span>
							</div>
						}
						<ul className="sidebar__list w-full rounded-[0.8rem] ">
							{featureList2.map(({ title, list }) =>
								<FeatureList key={`feature-list-[${title}]`} title={title} list={list} isCollapsed={false} />,
							)}
						</ul>
					</div>
				</div>
			</aside>
		</div>
	);
}

export default NextUiSidebar;
