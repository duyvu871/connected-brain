import React from 'react';
import { Center, Flex, Title } from '@mantine/core';
import VoiceRecord from '@/containers/Apps/SpeechToText/components/Record/stream_record';
import UploadAudio from '@/containers/Apps/SpeechToText/components/Record/upload';
import { Tab, Tabs } from '@nextui-org/react';

interface StarterScreenProps {

};

function StarterScreen({}: StarterScreenProps) {
	const [activeTab, setActiveTab] = React.useState<'Upload' | 'Record'>('Record');

	return (
		<Flex className={'gap-5'} direction={'column'}>
			<Flex direction={'column'} justify={'center'} align={'center'} className={'gap-5'}>
				<Title order={1} fw={'bold'} className={'text-3xl'}>Start {activeTab}</Title>
				<Title order={3} fw={'normal'} className={'text-gray-400'}>
					Click the button below to begin recording your audio.
				</Title>
			</Flex>
			<Flex direction={'column'} justify={'center'} align={'center'}>
				<Tabs
					aria-label="Dynamic tabs"
					classNames={{
						tabList: 'bg-gray-800',
						cursor: 'dark:bg-gray-700',
					}}
					selectedKey={activeTab}
					onSelectionChange={setActiveTab as any}
					size={'lg'}
				>
					<Tab key={'Record'} title={'Recording'}>
						<Center className={'p-5 w-full h-60'}>
							<VoiceRecord size={{
								wrapper: 'xl',
								icon: 'xl',
							}} />
						</Center>
					</Tab>
					<Tab key={'Upload'} title={'Upload'}>
						<Center className={'p-5 w-full h-60'}>
							<UploadAudio
								classNames={{
									label: 'border border-gray-600 rounded-full p-1',
								}}
								size={'lg'}
							/>
						</Center>
					</Tab>
				</Tabs>
			</Flex>
		</Flex>
	);
}

export default StarterScreen;