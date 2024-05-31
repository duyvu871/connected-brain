import React from 'react';
import { cn } from '@/lib/utils';

interface ChatHistoryProps {
	totalChat?: number;
	classnames?: {
		wrapper?: string;
	};
};

function ChatHistory({ totalChat = 4, classnames }: ChatHistoryProps) {
	return (
		<div
			className={cn('border border-gray-800 shadow rounded-xl p-4 max-w-lg w-full mx-auto', classnames?.wrapper || '')}>
			<div className={'animate-pulse flex flex-col justify-center items-start gap-3'}>
				<div className={'w-full'}>
					<div className={'rounded-xl bg-gray-800 h-10 max-w-[200px]'}></div>
				</div>
				<div className={'w-full px-2'}>
					<div className={'h-1 bg-gray-800 rounded-lg'}></div>
				</div>
				<div className={'w-full flex flex-col justify-center items-start gap-2'}>
					{new Array(totalChat).fill(0).map((_, index) => (
						<div key={'chat-history-' + index} className={'flex flex-col m-0 rounded-xl bg-gray-800 w-full h-10'}>

						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ChatHistory;