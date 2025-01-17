import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
	classNames?: {
		wrapper?: string;
	};

};

function Card({ classNames }: CardProps) {
	return (
		<div
			className={cn('border border-gray-800 shadow rounded-xl p-4 max-w-lg w-full mx-auto', classNames?.wrapper || '')}>
			<div className={'animate-pulse flex space-x-4'}>
				<div className={'rounded-full bg-gray-700 h-10 w-10'}></div>
				<div className={'flex-1 space-y-6 py-1'}>
					<div className={'h-2 bg-gray-700 rounded'}></div>
					<div className={'space-y-3'}>
						<div className={'grid grid-cols-3 gap-4'}>
							<div className={'h-2 bg-gray-700 rounded col-span-2'}></div>
							<div className={'h-2 bg-gray-700 rounded col-span-1'}></div>
						</div>
						<div className={'h-2 bg-gray-700 rounded'}></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;