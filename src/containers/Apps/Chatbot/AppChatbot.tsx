import React, { Suspense } from 'react';
import SkeletonChatHistory from '@/components/SkeletonLoad/ChatHistory';
import SkeletonChatSection from '@/components/SkeletonLoad/ChatSection';
import FeatureNavbar from '@/components/Navbar/FeatureNavbar';
import '@/styles/markdownParser.css';
import ChatHistory from '@/containers/Apps/Chatbot/components/ChatHistory';


interface AppChatbotProps {

};

const LazyChatSection = React.lazy(() => import('@/containers/Apps/Chatbot/components/ChatSection'));

function AppChatbot({}: AppChatbotProps) {
	return (
		<>
			<FeatureNavbar navTitle={'Assistant'} />
			<div className={'pt-16 w-full h-[100vh]'}>
				<div className={'w-full h-full flex'}>
					<div className={'w-full p-5'}>
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
							wrapper: 'max-w-sm w-full h-full',
						}} />
					</Suspense>
				</div>
			</div>
		</>

	);
}

export default AppChatbot;