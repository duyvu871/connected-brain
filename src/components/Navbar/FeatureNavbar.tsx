'use client';
import React from 'react';
import { useSidebarCollapse } from '@/hooks/useSidebarCollapse';
import { HiMenuAlt3 } from 'react-icons/hi';
import store from '@/redux/store';
import { toggleModal } from '@/redux/actions/ChatbotAtion';

interface FeatureNavbarProps {
	customChild?: React.ReactNode;
	navTitle?: string;
}

function FeatureNavbar({ customChild, navTitle }: FeatureNavbarProps) {
	const { isCollapsed } = useSidebarCollapse();
	const [isUserSidebarOpen, setIsUserSidebarOpen] = React.useState<boolean>(false);
	const handleToggleModal = () => {
		store.dispatch(toggleModal('history_modal') as any);
	};
	return (
		<div className={'relative w-full'}>
			{/* Navbar */}
			<div className=' w-full h-16 top-0 bg-[--background-hero]/50 backdrop-blur-[4px] border-gray-800 border-b-[1px] z-40'>
				<div className='flex justify-between items-center h-full px-5'>
					<div className='flex items-center'>
						<div className='flex items-center'>
							<div className='flex items-center '>
								<img
									src='/chatbot/chatbot-icon.jpg'
									alt='logo'
									className='h-10 w-10 rounded-full mr-4'
								/>
								<h1 className='text-xl font-semibold text-gray-100'>Chatbot Assistant</h1>
							</div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='flex items-center'>
							<div className='flex items-center'>
								<button
									onClick={() => handleToggleModal()}
									className='md:hidden flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-800/40 transition-all'>
									<HiMenuAlt3 size={24} className='text-gray-100' />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/*<div className={''}>*/}
			{/*<UserSidebar isOpen={isUserSidebarOpen} setIsOpen={setIsUserSidebarOpen} />*/}
			{/*</div>*/}
		</div>
	);
}

export default FeatureNavbar;
