'use client';
import React, { forwardRef } from 'react';
import { Box, BoxProps, Center, Flex } from '@mantine/core';
import { IoExit } from 'react-icons/io5';
import { Image, Tab, Tabs, Tooltip } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { TbApps } from 'react-icons/tb';
import { HiMiniChartPie } from 'react-icons/hi2';
import { RiSettings3Fill } from 'react-icons/ri';
import { FaRegFolderOpen } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

interface ContentSidebarProps extends BoxProps {

};

const navItems = [
	{
		title: 'App',
		icon: <TbApps size={30} className={'text-gray-300'} />,
		href: '',
	},
	{
		title: 'Analytics',
		icon: <HiMiniChartPie size={30} className={'text-gray-300'} />,
		href: '/analytics',
	},
	{
		title: 'Records',
		icon: <FaRegFolderOpen size={30} className={'text-gray-300'} />,
		href: '/records',
	},
	{
		title: 'Settings',
		icon: <RiSettings3Fill size={30} className={'text-gray-300'} />,
		href: '/settings',
	},
];

const baseUrl = '/feature/speech-to-text';

const ContentSidebar = forwardRef<HTMLDivElement, ContentSidebarProps>((props, ref) => {
	const pathname = usePathname();
	const { className, ...others } = props;
	// console.log('pathname:', pathname.replace(baseUrl, ''));
	return (
		<Box
			ref={ref}
			className={cn('flex-grow h-full py-5 pl-5 flex flex-col justify-center items-center', className)}
			{...others}
		>
			<Center className={'w-full rounded-2xl  mb-5'}>
				<Flex direction={'column'} justify={'center'} align={'center'}
							className="shadow-xl rounded-2xl py-3">
					<div className="p-2">
						<Image className="w-20 h-20 rounded-full mx-auto color-gray-400"
									 src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="John Doe" />
					</div>
					<div className="p-2">
						<h3 className="text-center text-md text-white font-medium leading-8">Joh Doe</h3>
						<div className="text-center text-gray-400 text-xs font-semibold">
							<p>Web Developer</p>
						</div>
					</div>
				</Flex>
			</Center>
			<Flex className={'w-full flex-grow '} direction={'column'} justify={'start'} align={'center'}>
				<Tabs
					aria-label="Options"
					selectedKey={pathname.replace(baseUrl, '')}
					isVertical={true}
					classNames={{
						wrapper: 'w-full',
						base: 'flex-grow',
						tabList: 'flex-grow bg-transparent gap-7',
						cursor: 'dark:bg-gray-700 rounded-2xl',
						tab: 'flex-grow ease-in-out p-6 rounded-2xl group hover:bg-gray-700 hover:text-white transition-all duration-[500] data-[hover-unselected=true]:opacity-100 data-[hover-unselected=true]:text-white',
						tabContent: 'flex-grow flex justify-center items-center',
					}}
				>
					{navItems.map((item) =>
						<Tab
							key={item.href}
							title={
								<Flex justify={'space-between'} align={'center'} className={'gap-2'}>
									<p
										className={'w-full opacity-0 group-hover:opacity-100 absolute right-[50%] top-1/2 transform -translate-y-1/2 translate-x-full group-hover:translate-x-1/2 transition-all duration-[500] ease-in-out text-white'}>{item.title}</p>
									<Box
										className={'absolute right-1/2 top-1/2 transform -translate-y-1/2 translate-x-1/2 group-hover:right-0 transition-all duration-[500] ease-in-out'}>
										{item.icon}
									</Box>
								</Flex>
							}
							href={item.href}
							className={'flex-grow'}
						/>,
					)}
				</Tabs>
			</Flex>
			<Tooltip className={'dark'} content="Logout" classNames={{ content: 'text-md' }}>
				<Center
					className={'h-16 w-16 rounded-2xl transition-colors hover:bg-gray-800 cursor-pointer'}
					onClick={() => signOut({})}
				>
					<IoExit size={30} />
				</Center>
			</Tooltip>
		</Box>
	);
});
ContentSidebar.displayName = 'ContentSidebar';

export default ContentSidebar;