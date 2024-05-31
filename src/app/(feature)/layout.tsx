import React from 'react';
import NextauthSessionProviders from '@/components/NextauthSessionProviders';
// import {SidebarProvider} from "@/contexts/SidebarContext";
// import BaseLayout from "@/components/AdminPageComponent/BaseLayout";

interface LayoutProps {
	children: React.ReactNode;
};

async function FeatureLayout({ children }: LayoutProps) {
	return (
		<>
			<NextauthSessionProviders>
				{children}
			</NextauthSessionProviders>
		</>
	);
}

export default FeatureLayout;