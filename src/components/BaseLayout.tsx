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

			<main className="flex flex-col flex-grow h-[100svh] max-w-[100svw] overflow-hidden bg-[--background-hero]/80">
				<NextUiSidebar />
				{children}
			</main>
			{/*// </div>*/}
		</>
	);
};

export default BaseLayout;
