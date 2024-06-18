import React from 'react';
import ModalWrapper from '@/containers/Apps/Chatbot/components/Modals/ModalWrapper';
import VoiceRecord from '@/components/PopoverComponent/VoiceRecord';

interface VoiceRecordModalProps {
	children: React.ReactNode;
};

function VoiceRecordModal({ children }: VoiceRecordModalProps) {
	return (
		<ModalWrapper trigger={children} content={<VoiceRecord />} />
	);
}

export default VoiceRecordModal;