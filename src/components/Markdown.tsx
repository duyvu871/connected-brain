import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import React, { useEffect } from 'react';


interface MarkdownProps {
	children: string;
	isTyping?: boolean;
};

function CursorSVG() {
	return (
		<svg
			viewBox="8 4 8 16"
			xmlns="http://www.w3.org/2000/svg"
			className="cursor"
		>
			<rect x="10" y="6" width="4" height="12" fill="#fff" />
		</svg>
	);
}

function Markdown({ children, isTyping }: MarkdownProps) {
	const [displayResponse, setDisplayResponse] = React.useState('');
	const [completedTyping, setCompletedTyping] = React.useState(false);

	useEffect(() => {
		if (!isTyping) {
			setCompletedTyping(true);
			setDisplayResponse(children);
			return;
		}

		setCompletedTyping(false);

		let i = 0;
		const stringResponse = children;

		const intervalId = setInterval(() => {
			setDisplayResponse(stringResponse.slice(0, i));

			i++;

			if (i > stringResponse.length) {
				clearInterval(intervalId);
				setCompletedTyping(true);
			}
		}, 20);

		return () => clearInterval(intervalId);
	}, [isTyping, children]);
	return (
		<ReactMarkdown className={'markdown-body bg-opacity-0 text-gray-600'}
									 remarkPlugins={[remarkGfm]}>
			{displayResponse}
		</ReactMarkdown>
	);
}

export default Markdown;