import React from 'react';
import ModalWrapper from '@/containers/Apps/Chatbot/components/Modals/ModalWrapper';
import { SlCloudDownload } from 'react-icons/sl';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { useSearchParams } from 'next/navigation';

interface DownloadModalProps {
};

const DownloadModalTrigger: React.FC<{}> = () => {
	return (
		<div className={'flex justify-center items-center'}>
			<div
				className={'flex justify-center items-center p-2 text-white border border-gray-600 rounded-xl transition-all hover:text-gray-800 hover:bg-gray-200'}>
				<SlCloudDownload className={'text-lg'} />
			</div>
		</div>
	);
};

const DownloadModalContent: React.FC<{}> = () => {

	const params = useSearchParams();

	const downloadChatHistory = () => {
		fetch('/api/v1/feature/chatbot/download-history', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				section_id: params.get('id'),
			}),
		})
			.then(response => response.blob())
			.then(blob => {
				// Tạo một liên kết tải xuống
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'content.txt');
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			})
			.catch(error => console.error('Lỗi tải xuống:', error));
	};

	return (
		<div className={'flex flex-col justify-center items-center px-5 pb-5'}>
			<div className={'flex justify-center items-center'}>
				<SlCloudDownload className={'text-white text-lg'} />
			</div>
			<div className={'text-white text-lg font-semibold mt-2'}>
				Download Chat History
			</div>
			<div>
				<div className={'text-white text-sm mt-2'}>
					Download your chat history to view it later.
				</div>
				<div className={'text-white text-sm mt-2'}>
					You can download the chat history in .txt format.
				</div>
			</div>
			<div className={'w-full flex flex-col justify-center items-center gap-2 mt-2'}>
				<div className={'rounded-xl w-full bg-gray-600 flex justify-center items-center cursor-pointer'}
						 onClick={downloadChatHistory}>
					<IoDocumentTextOutline size={26} />
					<span className={'text-white p-2'}>Download as .txt</span>
				</div>
			</div>
		</div>
	);
};

function DownloadModal({}: DownloadModalProps) {
	return (
		<ModalWrapper trigger={<DownloadModalTrigger />} content={<DownloadModalContent />} containCloseBtn={true} />
	);
}

export default DownloadModal;