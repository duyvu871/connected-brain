'use client';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md';
import { cn } from '@/lib/utils';

type CopyValue = string | null;

interface CopyToClipBoardProps {
	childrenProps?: React.HTMLAttributes<HTMLDivElement>;
	customIcon?: React.ReactNode;
	text: string;
	tooltipText?: string;
}

function Copy({ childrenProps, customIcon, text, tooltipText }: CopyToClipBoardProps) {
	const [textToCopy, setTextToCopy] = useState<CopyValue>(text);
	const [isCopied, setIsCopied] = useState<boolean>(false);
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	const onCopyText = () => {
		setIsCopied(true);
		setIsOpen(true);
		setTimeout(() => {
			setIsCopied(false);
			setIsOpen(false);
		}, 2000); // Reset status after 2 seconds
	};
	return (
		<div className={'relative'}>
			<div
				className={cn(
					'absolute px-2 py-1 bg-gray-800/70 backdrop-blur shadow rounded text-white  text-md font-semibold top-[-36px] transition-all',
					isOpen ? '' : 'hidden',
				)}>
				{tooltipText ? tooltipText : 'Copied!'}
			</div>
			<CopyToClipboard
				text={textToCopy}
				onCopy={() => {
					setIsCopied(true);
					setIsOpen(true);
				}}>
				{/*<input ref={inputRef} value={text}/>*/}
				<div
					className={'block'}
					onClick={onCopyText}
					{...childrenProps}>
					{customIcon ? customIcon : <MdContentCopy />}
				</div>
				{/*</Tooltip>*/}
			</CopyToClipboard>
		</div>
	);
}

export default Copy;
