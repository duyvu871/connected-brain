'use client';

import React from 'react';
import { Box, Flex } from '@mantine/core';
import HeaderNavigation from '@/containers/Apps/ocr/components/header';
import Footer from '@/containers/Apps/ocr/components/footer';
import { cn } from '@/lib/utils';
import { NavigationMenu } from '@/components/ui/navigation-menu';

interface HeaderWrapperProps {
	children?: React.ReactNode;
}

export default function HeaderWrapper({ children }: HeaderWrapperProps): React.ReactNode {
	return (
		<Flex w={'100%'} className={'flex-col min-h-[100svh] bg-zinc-950 overflow-x-hidden'}>
			<Box className="fixed w-full top-0 z-20">
				<NavigationMenu
					className={cn(`relative z-50 bg-opacity-[0.1] backdrop-blur-[10px] text-white w-full h-16 flex flex-row justify-between items-center border-0 border-b-[1px] border-gray-800`)}
					orientation={'vertical'}
				>
					<HeaderNavigation />
				</NavigationMenu>
			</Box>
			{children}
			<Footer />
		</Flex>
	);
}