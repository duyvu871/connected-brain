'use client';
import React from 'react';
import { MantineProviderClient } from '@/components/Providers/MantineProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as JotaiProvider } from 'jotai';

interface ProvidersLayoutProps {
	children: React.ReactNode;
};

function DefaultPageProvider({ children }: ProvidersLayoutProps) {
	return (
		<>
			<JotaiProvider>
				<AuthProvider>
					<MantineProviderClient>
						{children}
					</MantineProviderClient>
				</AuthProvider>
			</JotaiProvider>
			{/*<Script src={'/scripts/donut-shaped.js'} defer={true} />*/}
		</>
	);
}

export default DefaultPageProvider;