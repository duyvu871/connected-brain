'use client';
import React from 'react';
import { MantineProviderClient } from '@/components/Providers/MantineProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/contexts/SidebarContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import { Toaster } from '@/utils/component_default_props.ultis';

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
				<ToastContainer {...(Toaster as ToastContainerProps)} />
			</AuthProvider>
			{/*<Script src={'/scripts/donut-shaped.js'} defer={true} />*/}
		</>
	);
}

export default ProvidersLayout;