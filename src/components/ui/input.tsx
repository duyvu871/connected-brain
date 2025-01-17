import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
	classNames?: {
		wrapper?: string
		input?: string
		startIcon?: string
		endIcon?: string
	};
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({
		 className = '', type = 'text', endIcon, startIcon, classNames = {
			wrapper: '',
			input: '',
			startIcon: '',
			endIcon: '',
		}, ...props
	 }, ref) => {
		return (
			<div className={cn(
				'flex justify-between items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				classNames.wrapper,
				className,
			)}>
				<div className={'flex w-full h-fit items-center '}>
					{startIcon && (
						<div className={cn('flex items-center', classNames.startIcon)}>
							{startIcon}
						</div>
					)}
					<input
						type={type}
						className={cn(
							'w-full h-full bg-transparent focus:outline-none',
							classNames.input,
						)}
						ref={ref}
						{...props}
					/>
				</div>
				{endIcon && (
					<div className={cn('flex items-center', classNames.endIcon)}>
						{endIcon}
					</div>
				)}
			</div>
		);
	},
);
Input.displayName = 'Input';

export { Input };
