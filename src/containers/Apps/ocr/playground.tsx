'use client';
import React, { useEffect } from 'react';
import { documentId } from '@/containers/Apps/ocr/states/playground';
import { useAtom } from 'jotai/index';
import HeaderWrapper from '@/containers/Apps/ocr/header-wrapper';
import { Box } from '@mantine/core';
import OriginFooter from '@/containers/Apps/ocr/components/origin-footer';
import MainApp from '@/containers/Apps/ocr/components/main-app';

function Playground({ id }: { id: string }): React.ReactElement {
	const [docId, setDocId] = useAtom(documentId);

	useEffect(() => {
		setDocId(id);
	}, [id]);

	return (
		<HeaderWrapper>
			<main className={'flex-1 max-h-svh md:pt-16'}>
				<Box className={'flex flex-col gap-3 border-t lg:border-t-0 p-4 pb-2 pt-3 lg:pt-0'}>
					<MainApp />
					<OriginFooter />
				</Box>
			</main>
		</HeaderWrapper>
	);
}

export default Playground;