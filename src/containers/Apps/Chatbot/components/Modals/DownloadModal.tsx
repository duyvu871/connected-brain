import React from 'react';
import ModalWrapper from '@/containers/Apps/Chatbot/components/Modals/ModalWrapper';
import { SlCloudDownload } from 'react-icons/sl';

interface DownloadModalProps {
};

const DownloadModalTrigger: React.FC<{}> = () => {
	return (
		<div className={'flex justify-center items-center'}>
			<div
				className={'flex justify-center items-center p-2 text-white border border-gray-600 rounded-xl transition-all hover:text-gray-800 hover:' +
					'.' +
					''}>
				<SlCloudDownload className={'text-lg'} />
			</div>
		</div>
	);
};

const DownloadModalContent: React.FC<{}> = () => {
	return (
		<div className={'flex flex-col justify-center items-center p-5 shadow-2xl rounded-xl bg-gray-800'}>
			<div className={'flex justify-center items-center'}>
				<SlCloudDownload className={'text-white text-lg'} />
			</div>
			<div className={'text-white text-lg font-semibold mt-2'}>
				Download Chat History
			</div>
		</div>
	);
};

function DownloadModal({}: DownloadModalProps) {
	return (
		<ModalWrapper trigger={<DownloadModalTrigger />} content={<DownloadModalContent />} />
	);
}

export default DownloadModal;