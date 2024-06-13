import React from 'react';
import ProvidersLayout from '@/components/ProvidersLayout';
import BaseLayout from '@/components/BaseLayout';
import AppChatbot from '@/containers/Apps/Chatbot/AppChatbot';
import { ChatbotProvider } from '@/contexts/ChatbotContext';
import ReduxProviders from '@/app/ReduxProviders';
import { getServerAuthSession } from '@/lib/nextauthOptions';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import NextuiProvider from '@/components/NextuiProvider';

interface PageProps {

};

async function Page({}: PageProps) {
	const session = await getServerAuthSession();
	const header = headers();
	const pathname = header.get('x-pathname');
	if (!session?.user) {
		return redirect('/auth/method?type=login');
	}
	return (
		<ReduxProviders>
			<ProvidersLayout>
				<NextuiProvider>
					<BaseLayout>
						<ChatbotProvider>
							<AppChatbot />
						</ChatbotProvider>
					</BaseLayout>
				</NextuiProvider>
			</ProvidersLayout>
		</ReduxProviders>
	);
}

export default Page;