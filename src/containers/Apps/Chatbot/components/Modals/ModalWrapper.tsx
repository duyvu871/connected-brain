import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ModalWrapperProps {
	trigger: React.ReactNode;
	content: React.ReactNode;
};

function ModalWrapper({ trigger, content }: ModalWrapperProps) {
	return (
		<Popover>
			<PopoverTrigger>{trigger}</PopoverTrigger>
			<PopoverContent>{content}</PopoverContent>
		</Popover>
	);
}

export default ModalWrapper;