import React from 'react';
import { getServerAuthSession } from '@/lib/nextauthOptions';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import NextuiProvider from '@/components/NextuiProvider';
import { Toaster } from '@/utils/component_default_props.ultis';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import AppS2T from '@/containers/Apps/SpeechToText/AppS2T';
import DefaultPageProvider from '@/containers/Apps/SpeechToText/default_page_provider';
import SidebarLayout from '@/containers/Apps/SpeechToText/SidebarLayout';
import '@mantine/tiptap/styles.css';

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
		<>
			<NextuiProvider>
				<DefaultPageProvider>
					<SidebarLayout>
						<AppS2T />
					</SidebarLayout>
				</DefaultPageProvider>
			</NextuiProvider>
			<ToastContainer {...(Toaster as ToastContainerProps)} />
		</>
	);
}

export default Page;