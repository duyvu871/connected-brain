import React from 'react';
import ModalWrapper from '@/containers/Apps/Chatbot/components/Modals/ModalWrapper';
import UploadPopover from '@/components/UploadPopover/UploadPopover';

interface UploadModalProps {
	children: React.ReactNode;
};

function UploadModal({ children }: UploadModalProps) {
	return (
		<ModalWrapper trigger={children} content={<UploadPopover />} />
	);
}

export default UploadModal;