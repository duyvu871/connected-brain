'use client';
import React from 'react';
import { Box, Flex } from '@mantine/core';
import MainSidebar from '@/containers/Apps/SpeechToText/components/Sidebar/main_sidebar';

interface SidebarLayoutProps {
	children: React.ReactNode;
};

function SidebarLayout({ children }: SidebarLayoutProps) {
	return (
		<Flex w={'100vw'} h={'100vh'} className={'flex-row'}>
			<MainSidebar />
			<Box className={'w-[calc(100%-200px)] h-full p-4 flex-grow'}>
				{children}
			</Box>
		</Flex>
	);
}

export default SidebarLayout;