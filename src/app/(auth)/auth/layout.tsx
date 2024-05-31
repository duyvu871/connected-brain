import React from 'react';
import ProvidersLayout from '@/components/ProvidersLayout';
import NextauthSessionProviders from '@/components/NextauthSessionProviders';

interface LayoutProps {
	children: React.ReactNode;
};

function AuthLayout({ children }: LayoutProps) {
	return (
		<NextauthSessionProviders>
			<ProvidersLayout>
				{children}
			</ProvidersLayout>
		</NextauthSessionProviders>
	);
}

export default AuthLayout;