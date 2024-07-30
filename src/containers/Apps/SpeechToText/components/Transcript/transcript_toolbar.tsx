import React from 'react';
import { Flex } from '@mantine/core';
import TranscriptPlayer from '@/containers/Apps/SpeechToText/components/Transcript/transcript_player';
import TranscriptPlayerTimeline from '@/containers/Apps/SpeechToText/components/Transcript/transcript_player_timeline';

interface TranscriptToolbarProps {

};

function TranscriptToolbar({}: TranscriptToolbarProps) {
	return (
		<Flex justify={'space-between'} align={'center'}
					className={'h-14 w-full max-w-3xl rounded-[1rem] bg-gray-600/50 pl-10 pr-5 select-none'}>
			<TranscriptPlayer />
			<TranscriptPlayerTimeline />
		</Flex>
	);
}

export default TranscriptToolbar;