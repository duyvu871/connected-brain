import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { LiaTimesSolid } from 'react-icons/lia';

interface ModalWrapperProps {
	trigger: React.ReactNode;
	content: React.ReactNode;
	containCloseBtn?: boolean;
};

function ModalWrapper({ trigger, content, containCloseBtn }: ModalWrapperProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
			<PopoverTrigger>{trigger}</PopoverTrigger>
			<PopoverContent className={cn('shadow-2xl rounded-xl bg-gray-800 z')}>
				{containCloseBtn && (
					<div className={'w-full flex justify-end items-end p-2'}>
						<div onClick={() => setIsOpen(false)} className={'cursor-pointer'}>
							<LiaTimesSolid />
						</div>
					</div>
				)}
				<div className={''}>
					{content}
				</div>
			</PopoverContent>
		</Popover>
	);
}

export default ModalWrapper;