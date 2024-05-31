'use client';
import React from 'react';
import { MantineProviderClient } from '@/components/Providers/MantineProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/contexts/SidebarContext';

interface ProvidersLayoutProps {
	children: React.ReactNode;
};

function ProvidersLayout({ children }: ProvidersLayoutProps) {
	return (
		<>
			<AuthProvider>
				<SidebarProvider>
					<MantineProviderClient>
						{children}
					</MantineProviderClient>
				</SidebarProvider>
			</AuthProvider>
			{/*<Script src={'/scripts/donut-shaped.js'} defer={true} />*/}
		</>
	);
}

export default ProvidersLayout;