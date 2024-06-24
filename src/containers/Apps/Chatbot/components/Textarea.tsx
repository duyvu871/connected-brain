'use client';
import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill-custom.css';
import Quill from 'quill';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import store from '@/redux/store';

const Keyboard = ReactQuill.Quill.import('modules/keyboard');
Quill.register('modules/keyboard', Keyboard);

type Props = {
	placeholder?: string;
	className?: string;
	onContentChange: (content: string) => void;
	setIsTooLong?: (isTooLong: boolean) => void;
	value: string;
	isDisabled?: boolean;
	event?: {
		onEnter?: () => void;
	};
	isClear?: boolean;
};

const AutoResizeQuill = ({
													 placeholder, className,
													 onContentChange,
													 setIsTooLong,
													 value,
													 isDisabled,
													 event,
													 isClear,
												 }: Props) => {
	const { inputValue } = useSelector((state: RootState) => state.inputMessage);
	const [plainText, setPlainText] = React.useState<string>('');
	const quillRef = useRef<ReactQuill | any>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [quillInstance, setQuillInstance] = React.useState<ReactQuill.UnprivilegedEditor>(null);

	const updateInputValue = (value: string) => {
		store.dispatch({ type: 'UPDATE_INPUT', payload: value });
	};

	const handleKeyDown = (eventKeyDown: React.KeyboardEvent) => {
		if (eventKeyDown.key === 'Enter' && eventKeyDown.shiftKey) {
			// Shift + Enter: insert a newline
			eventKeyDown.preventDefault();
			quillRef.current.getEditor().insertText(quillInstance?.getSelection(true).index, '', 'user');

		} else if (eventKeyDown.key === 'Enter') {
			// Enter: submit
			eventKeyDown.preventDefault();
			eventKeyDown.stopPropagation();
			setPlainText('');
			updateInputValue('');
			onContentChange('');
			event?.onEnter && event.onEnter();
		}
	};

	const handleContentChange = (content: string, delta: any, source: string, editor: ReactQuill.UnprivilegedEditor) => {
		const textContent = quillRef.current.getEditor().getContents().ops[0].insert;
		onContentChange(textContent.replace(/\n+$/, ''));
		// setPlainText(quillRef.current.getEditor().root.innerHTML);
		updateInputValue(quillRef.current.getEditor().root.innerHTML);
		setQuillInstance(editor);

		const childCount: number = quillRef.current.getEditor().selection.root.childNodes.length;
		const rawContent = quillRef.current.getEditor().root.innerText;
		const newLinesCount = rawContent.split('\n').filter((item: string) => item !== '');
		// console.log(newLinesCount);
		if (childCount > 1 || newLinesCount.length > 1) {
			setIsTooLong && setIsTooLong(true);
		} else {
			setIsTooLong && setIsTooLong(false);
		}
		// console.log(textContent);

	};

	useEffect(() => {
		if (isClear) {
			setPlainText('');
			onContentChange('');
		}
	}, [isClear]);

	return (
		<div ref={containerRef} style={{ height: 'auto', overflow: 'hidden' }} className={className + ' input_editor'}>
			<ReactQuill
				readOnly={isDisabled}
				value={inputValue || value}
				ref={quillRef}
				theme="snow"
				onChange={handleContentChange}
				onKeyDown={handleKeyDown}
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