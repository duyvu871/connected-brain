'use client';
import React, { Suspense } from 'react';
import SkeletonChatHistory from '@/components/SkeletonLoad/ChatHistory';
import SkeletonChatSection from '@/components/SkeletonLoad/ChatSection';
import '@/styles/markdownParser.css';
import ChatHistory from '@/containers/Apps/Chatbot/components/ChatHistory';
import { HiMenuAlt3 } from 'react-icons/hi';
// import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '@/redux/actions/ChatbotAtion';
import store from '@/redux/store';
import HistoryModal from '@/containers/Apps/Chatbot/components/Modals/HistoryModal';

interface AppChatbotProps {

};

const LazyChatSection = React.lazy(() => import('@/containers/Apps/Chatbot/components/ChatSection'));

function AppChatbot({}: AppChatbotProps) {
	// const isModalVisible = useSelector((state: RootState) => state.modal['myModal']);
	const handleToggleModal = () => {
		store.dispatch(toggleModal('history_modal') as any);
	};

	return (
		<>
			<div className={'relative w-full'}>
				{/* Navbar */}
				<nav
					className="absolute w-full h-16 top-0 bg-[--background-hero]/50 backdrop-blur-[4px] border-gray-800 border-b-[1px] z-40">
					<div className="flex justify-between items-center h-full px-5">
						<div className="flex items-center">
							<div className="flex items-center">
								<div className="flex items-center">
									<h1
										className="text-xl font-semibold text-gray-100">Assistant</h1>
								</div>
							</div>
						</div>
						<div className="flex items-center">
							<div className="flex items-center">
								<div className="flex items-center">
									<button
										onClick={() => handleToggleModal()}
										className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-800/40 transition-all">
										<HiMenuAlt3 size={24} className="text-gray-100" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</nav>
				{/*<div className={''}>*/}
				{/*<UserSidebar isOpen={isUserSidebarOpen} setIsOpen={setIsUserSidebarOpen} />*/}
				{/*</div>*/}
			</div>
			<div className={'pt-16 w-full h-[100vh]'}>
				<div className={'w-full h-full flex'}>
					<div className={'w-full md:p-5'}>
						<div className={'w-full h-full border border-gray-800 rounded-xl'}>
							<Suspense fallback={<SkeletonChatSection />}>
								<LazyChatSection />
							</Suspense>
						</div>
					</div>
					<Suspense fallback={
						<SkeletonChatHistory classnames={{
							wrapper: 'max-w-sm w-full h-full',
						}} />
					}>
						<ChatHistory classnames={{
							wrapper: 'md:block hidden',
						}} />
					</Suspense>
				</div>
			</div>
			<HistoryModal />
		</>

	);
}

export default AppChatbot;