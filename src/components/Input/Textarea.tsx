import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {
	placeholder?: string;
	className?: string;
};


const AutoResizeQuill = ({
													 placeholder, className,
												 }: Props) => {
	const quillRef = useRef<any>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const quill = quillRef.current.getEditor();
		const container = containerRef.current;

		const updateHeight = () => {
			container.style.height = 'auto';
			container.style.height = `${quill.scrollHeight}px`;
		};

		quill.on('text-change', updateHeight);

		updateHeight();

		return () => quill.off('text-change', updateHeight);
	}, []);

	return (
		<div ref={containerRef} style={{ height: 'auto', overflow: 'hidden' }} className={className}>
			<ReactQuill
				ref={quillRef}
				theme="snow"
				placeholder={placeholder}
			/>
		</div>
	);
};

export default AutoResizeQuill;