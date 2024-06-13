'use client';
import React from 'react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import ChatHistory from '@/containers/Apps/Chatbot/components/ChatHistory';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import store from '@/redux/store';
import { hideModal } from '@/redux/actions/ChatbotAtion';
import { LiaTimesSolid } from 'react-icons/lia';

interface HistoryModalProps {

};

function HistoryModal({}: HistoryModalProps) {
	const isModalVisible = useSelector((state: RootState) => state.modal['history_modal']);

	const handleCloseModal = () => {
		store.dispatch(hideModal('history_modal') as any);
	};

	return (
		<Modal
			isOpen={isModalVisible}
			onClose={() => handleCloseModal()}
			placement={'auto'}
			onOpenChange={() => {
			}}
			classNames={{
				wrapper: 'z-[900] md:hidden absolute bottom-0 right-0 md:w-[30rem] w-full border border-gray-800 rounded-tl-3xl rounded-tr-3xl bg-[--background-hero]',
				backdrop: 'z-[800] absolute top-0 left-0 bg-black/50 md:hidden',
				body: 'p-0',
				footer: 'p-0',
				closeButton: 'right-0 top-0 m-1 text-white text-xl hidden',
			}}
		>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader className={'flex flex-col gap-1'}>
							<div className={'flex justify-between items-center'}>
								<p className={'text-lg font-semibold'}>Chat History</p>
								<button onClick={handleCloseModal}>
									<LiaTimesSolid />
								</button>
							</div>
						</ModalHeader>
						<ModalBody className={'md:hidden'}>
							<ChatHistory classnames={{
								wrapper: '',
								container: 'rounded-none border-none',
							}} />
						</ModalBody>
						<ModalFooter>

						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}

export default HistoryModal;