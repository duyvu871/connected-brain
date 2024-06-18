'use client';
import NextUiSidebar from '@/components/Sidebar/NextUISidebar';
import React from 'react';
import '@/components/Sidebar/style.css';

interface BaseLayoutProps {
	children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
	return (
		// <div className="layout">
		<>

			<main className="flex-1 flex-col h-full max-w-full overflow-hidden bg-[--background-hero]/80">
				<NextUiSidebar />
				{children}
			</main>
			{/*// </div>*/}
		</>
	);
};

export default BaseLayout;
