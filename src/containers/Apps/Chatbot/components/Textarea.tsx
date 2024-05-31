'use client';
import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill-custom.css';

type Props = {
	placeholder?: string;
	className?: string;
	onContentChange: (content: string) => void;
	setIsTooLong?: (isTooLong: boolean) => void;
	value: string;
	plainText: string;
	setPlainText: (value: string) => void;
};

const AutoResizeQuill = ({
													 placeholder, className,
													 onContentChange,
													 setIsTooLong,
													 value,
													 plainText,
													 setPlainText,
												 }: Props) => {
	// const [plainText, setPlainText] = useState<string>(value);

	const quillRef = useRef<any>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleContentChange = (content: string) => {
		const childCount: number = quillRef.current.getEditor().selection.root.childNodes.length;
		const rawContent = quillRef.current.getEditor().root.innerText;
		const newLinesCount = rawContent.split('\n').filter((item: string) => item !== '');
		// console.log(newLinesCount);
		if (childCount > 1 || newLinesCount.length > 1) {
			setIsTooLong && setIsTooLong(true);
		} else {
			setIsTooLong && setIsTooLong(false);
		}
		onContentChange(quillRef.current.getEditor().root.innerText);
		setPlainText(content);
	};

	useEffect(() => {
		const quill = quillRef.current.getEditor();
		const container = containerRef.current;

		const updateHeight = () => {
			const height = quill.root.scrollHeight;
			if (height > 200) {
				container.style.height = '200px';
				return;
			}
			container.style.height = 'auto';
			container.style.height = `${quill.scrollHeight}px`;
		};

		quill.on('text-change', updateHeight);

		updateHeight();

		return () => quill.off('text-change', updateHeight);
	}, []);

	// useEffect();

	return (
		<div ref={containerRef} style={{ height: 'auto', overflow: 'hidden' }} className={className + ' input_editor'}>
			<ReactQuill
				value={plainText}
				ref={quillRef}
				theme="snow"
				onChange={handleContentChange}
				placeholder={placeholder}
				className={'border-0 max-h-52'}
				formats={[]}
				bounds={'.input_editor'}
				modules={{
					toolbar: false,
				}}
			/>
		</div>
	);
};

export default AutoResizeQuill;