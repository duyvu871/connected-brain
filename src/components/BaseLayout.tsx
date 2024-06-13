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
			<NextUiSidebar />
			<main className="layout__main-content h-[100vh] overflow-x-hidden overflow-y-auto bg-[--background-hero]/80">
				{children}
			</main>
			{/*// </div>*/}
		</>
	);
};

export default BaseLayout;
