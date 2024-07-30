import React from 'react';
import { Box } from '@mantine/core';
import { Tab, Tabs } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { TranscriptActiveFeature, transcriptActiveFeature } from '@/containers/Apps/SpeechToText/states/transcript';

interface TranscriptFeatureTabProps {

};

function TranscriptFeatureTab({}: TranscriptFeatureTabProps) {
	const [selected, setSelected] = useAtom(transcriptActiveFeature);
	return (
		<Box className={'w-full'}>
			<div className="flex w-full flex-col">
				<Tabs
					aria-label="Options"
					selectedKey={selected}
					onSelectionChange={setSelected as any}
					size={'lg'}
					className={'w-full'}
					classNames={{
						tabList: 'w-full bg-gray-800',
						cursor: 'dark:bg-gray-700',
					}}
				>
					{Object.keys(TranscriptActiveFeature).map((key) => (
						<Tab key={key}
								 value={TranscriptActiveFeature[key]}
								 title={TranscriptActiveFeature[key]}>
							{/*{key}*/}
						</Tab>
					))}
				</Tabs>
			</div>
		</Box>
	);
}

export default TranscriptFeatureTab;