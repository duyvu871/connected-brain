import React from 'react';
import NextuiProvider from '@/components/NextuiProvider';
import DefaultPageProvider from '@/containers/Apps/SpeechToText/default_page_provider';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import { Toaster } from '@/utils/component_default_props.ultis';
import StarterScreen from '@/containers/Apps/ocr/starter-screen';

function Page() {
	return (
		<>
			<NextuiProvider>
				<DefaultPageProvider>
					<StarterScreen />
				</DefaultPageProvider>
			</NextuiProvider>
			<ToastContainer {...(Toaster as ToastContainerProps)} />
		</>
	);
}

export default Page;