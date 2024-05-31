import React from 'react';
import { Tooltip as ShadcnTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TooltipProps {
	children: React.ReactNode;
	title: string;
};

function Tooltip({ children, title }: TooltipProps) {
	return (
		<TooltipProvider>
			<ShadcnTooltip delayDuration={1000}>
				<TooltipTrigger asChild>
					{children}
				</TooltipTrigger>
				<TooltipContent className={'z-[500] text-white'}>
					{title}
				</TooltipContent>
			</ShadcnTooltip>
		</TooltipProvider>
	);
}

export default Tooltip;