import React from 'react';
import { cn } from '@/lib/utils';

interface ChatSectionProps {
	classNames?: {
		wrapper?: string;
	};

};

const LeftChat = ({
										classnames,
									}: {
	classnames?: {
		wrapper?: string;
		chatList?: string;
	};
}) => {
	return (
		<div className={cn('flex justify-start gap-2 w-full', classnames?.wrapper || '')}>
			<div className={'h-8 w-8 rounded-full bg-gray-800'}></div>
			<div className={cn('flex flex-col gap-1 w-full', classnames?.chatList || '')}>
				<div className={'h-20 max-w-xl w-full bg-gray-800 rounded-xl'}></div>
				<div className={'h-10 w-48 bg-gray-800 rounded-xl'}></div>
			</div>
		</div>
	);
};

function ChatSection({ classNames }: ChatSectionProps) {
	return (
		<div
			className={cn(' shadow rounded-xl p-4 max-w-3xl w-full h-full mx-auto flex flex-col justify-between items-center', classNames?.wrapper || '')}>
			<div className={'animate-pulse flex flex-col gap-5 overflow-hidden w-full'}>
				<LeftChat />
				<LeftChat classnames={{
					wrapper: 'flex-row-reverse',
					chatList: 'items-end',
				}} />
			</div>
			<div className={'w-full h-16 flex justify-center items-center'}>
				<div className={'w-full h-12 max-w-xl rounded-full bg-gray-800'}></div>
			</div>
		</div>
	);
}

export default ChatSection;