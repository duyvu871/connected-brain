'use client';
import React, { Suspense } from 'react';
import SkeletonChatHistory from '@/components/SkeletonLoad/ChatHistory';
import SkeletonChatSection from '@/components/SkeletonLoad/ChatSection';
import '@/styles/markdownParser.css';
import ChatHistory from '@/containers/Apps/Chatbot/components/ChatHistory';
// import { useDispatch, useSelector } from 'react-redux';
import HistoryModal from '@/containers/Apps/Chatbot/components/Modals/HistoryModal';
import FeatureNavbar from '@/components/Navbar/FeatureNavbar';

interface AppChatbotProps {}

const LazyChatSection = React.lazy(
	() => import('@/containers/Apps/Chatbot/components/ChatSection/index'),
);

function AppChatbot({}: AppChatbotProps) {
	return (
		<>
			<div className={'w-full h-full relative'}>
				<FeatureNavbar />
				<div className={'w-full h-[calc(100%-64px)] flex'}>
					<Suspense
						fallback={
							<SkeletonChatHistory
								classnames={{
									wrapper: 'max-w-sm w-full h-full',
								}}
							/>
						}>
						<ChatHistory
							classnames={{
								wrapper: 'md:block hidden',
							}}
						/>
					</Suspense>
					<div className={'w-full md:p-5'}>
						<div className={'w-full h-full md:border border-zinc-800 md:rounded-xl'}>
							<Suspense fallback={<SkeletonChatSection />}>
								<LazyChatSection />
							</Suspense>
						</div>
					</div>
				</div>
			</div>
			<HistoryModal />
		</>
	);
}

export default AppChatbot;
