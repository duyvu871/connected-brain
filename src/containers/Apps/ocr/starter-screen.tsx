'use client';

import React from 'react';
import { Box, Center } from '@mantine/core';
import HeaderWrapper from '@/containers/Apps/ocr/header-wrapper';
import { Image } from '@nextui-org/react';
import UploadCard from '@/containers/Apps/ocr/components/starter/upload-card';
import ExploreSection from '@/containers/Apps/ocr/components/starter/explore-section';

export default function StarterScreen(): React.ReactNode {
	return (
		<HeaderWrapper>
			<main className={'flex-1'}>
				<Box className={'relative mb-4 flex items-center justify-center py-[26vh] pt-[18vh] sm:pt-[26vh]'}>
					<Box className={'absolute inset-0 flex items-center justify-center overflow-hidden'}>
						<Box
							className={'relative mb-72 h-fit w-full max-w-4xl sm:mb-0'}>
							<Image
								sizes={'(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px'}
								src={'/connected-brain-dashed.svg'}
								decoding={'async'}
								alt={'bg'}
								classNames={{
									wrapper: 'pointer-events-none inset-0 -z-0 -translate-x-2 select-none sm:translate-x-0 max-w-[96rem_!important]',
								}}
								className={'w-full h-full '}
							/>
						</Box>
					</Box>
					<Center className={'relative'}>
						<Box className={'flex flex-col gap-4 justify-center items-center'}>
							<Box className={'text-center'}>
								<p
									className={'max-w-[100vw] text-3xl sm:text-4xl font-semibold text-white mx-5 sm:whitespace-nowrap'}>
									<span>Scan</span>.
									<span>Recognize</span>.<span>Extract</span>
								</p>
							</Box>
							<Box className={'text-center max-w-xl'}>
								<p className={'text-medium font-thin text-zinc-300'}>
									OCR instantly transforms your images into editable text, saving you time and effort, no matter your
									industry.
								</p>
							</Box>
							<Box className={'flex justify-center items-center '}>
								<UploadCard />
							</Box>
						</Box>
					</Center>
				</Box>
				<Box className={'mx-auto flex max-w-7xl flex-col px-6 pb-20'}>
					<ExploreSection />
				</Box>
			</main>
		</HeaderWrapper>
	);
}