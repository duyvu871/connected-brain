import React from 'react';
import NextuiProvider from '@/components/NextuiProvider';
import DefaultPageProvider from '@/containers/Apps/SpeechToText/default_page_provider';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import { Toaster } from '@/utils/component_default_props.ultis';
import Playground from '@/containers/Apps/ocr/playground';

function Page({ params }: { params: { documentId: string } }) {
	return (
		<>
			<NextuiProvider>
				<DefaultPageProvider>
					<Playground id={params.documentId} />
				</DefaultPageProvider>
			</NextuiProvider>
			<ToastContainer {...(Toaster as ToastContainerProps)} />
		</>
	);
}

export default Page;