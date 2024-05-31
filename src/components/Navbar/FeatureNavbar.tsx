'use client';
import React from 'react';
import { useSidebarCollapse } from '@/hooks/useSidebarCollapse';
import { GoPersonFill } from 'react-icons/go';

interface FeatureNavbarProps {
	customChild?: React.ReactNode;
	navTitle?: string;
};

function FeatureNavbar({ customChild, navTitle }: FeatureNavbarProps) {
	const { isCollapsed } = useSidebarCollapse();
	const [isUserSidebarOpen, setIsUserSidebarOpen] = React.useState<boolean>(false);
	return (
		<div className={'relative w-full'}>
			{/* Navbar */}
			<nav
				className="absolute w-full h-16 top-0 bg-[--background-hero]/50 backdrop-blur-[4px] border-gray-800 border-b-[1px] z-40">
				<div className="flex justify-between items-center h-full px-5">
					<div className="flex items-center">
						<div className="flex items-center">
							<div className="flex items-center">
								<h1
									className="text-xl font-semibold text-gray-100">{isCollapsed && (navTitle || 'Feature Overview')}</h1>
							</div>
						</div>
					</div>
					<div className="flex items-center">
						{customChild}
						<div className="flex items-center">
							<div className="flex items-center">
								<button
									onClick={() => setIsUserSidebarOpen(!isUserSidebarOpen)}
									className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800/50 hover:bg-gray-800/40 transition-all">
									<GoPersonFill size={24} className="text-gray-100" />
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
	);
}

export default FeatureNavbar;