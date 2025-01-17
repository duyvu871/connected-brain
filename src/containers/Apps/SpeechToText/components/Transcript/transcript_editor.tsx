import React, { useEffect } from 'react';
import { Center, Flex, ScrollArea, Stack } from '@mantine/core';
import { useAtom } from 'jotai/index';
import { activeTranscriptSentence, transcript } from '@/containers/Apps/SpeechToText/states/transcript';
import useUID from '@/hooks/useUID';
import { formatMillisecondsToMinutesSeconds } from '@/utils/time';
import { audioCurrentTime, audioFile } from '@/containers/Apps/SpeechToText/states/jotai';
import { atom } from 'jotai';
import { useScrollIntoView } from '@mantine/hooks';


interface TranscriptListProps {

};

interface TranscriptListItemProps {
	speaker: string;
	words: string;
	start: number;
	end: number;
	color?: string;
	audioId?: string;
}

const audioItemActive = atom<string>(null as string | null);

const TranscriptListItem: React.FC<TranscriptListItemProps> = (props) => {
	const { scrollIntoView, targetRef } = useScrollIntoView<
		HTMLDivElement,
		HTMLDivElement
	>();
	const [activeSentence] = useAtom(activeTranscriptSentence);

	useEffect(() => {
		if (activeSentence === props.audioId) {
			console.log(activeSentence,
			);
			scrollIntoView();
		}
	}, [activeSentence]);

	return (
		<Flex
			direction={'column'}
			align={'start'}
			justify={'center'}
			className={'flex-grow h-fit w-full gap-1'}
			ref={targetRef}
		>
			<Flex align={'center'} justify={'flex-start'} className={'w-full gap-2'}>
				<p className={'text-green-400/85 text-bold text-medium'}>{props.speaker ?? 'Speaker'}</p>
				<p className={'text-gray-500 text-bold text-sm'}>{formatMillisecondsToMinutesSeconds(props.start)}</p>
			</Flex>
			{/*<Tooltip*/}
			{/*	className={'dark'}*/}
			{/*	content={*/}
			{/*		<Flex className="px-[2px]">*/}
			{/*			<Box>*/}
			{/*				/!*<Button size={'sm'}>*!/*/}
			{/*				/!*	<HiMiniPlay />*!/*/}
			{/*				/!*</Button>*!/*/}
			{/*			</Box>*/}
			{/*		</Flex>*/}
			{/*	}*/}
			{/*>*/}
			<Flex justify={'start'} align={'start'}>
				{/*<button onClick={playSegment}>{isPlaying ? <HiMiniPause className={'text-red-500'} /> :*/}
				{/*	<HiMiniPlay />}</button>*/}
				<p className={'text-sm text-gray-300 pl-2'}>{props.words ?? 'Words'}</p>
			</Flex>
			{/*</Tooltip>*/}
		</Flex>
	);
};

function TranscriptList({}: TranscriptListProps) {
	const [genID] = useUID();
	const [transcript_data, setTranscriptData] = useAtom(transcript);
	const [currentFile] = useAtom(audioFile);
	const [audioActive, setAudioActive] = useAtom(audioItemActive);
	const [currentTime, setCurrentTime] = useAtom<number>(audioCurrentTime);
	return (
		<Center className={'flex-grow w-full overflow-hidden'}>
			<ScrollArea className={'h-80'} type="scroll" scrollbarSize={6} scrollHideDelay={500}>
				<Stack align={'start'} className={'gap-3'}>
					{transcript_data?.transcript.map((item, index) => (
						<TranscriptListItem
							key={genID()}
							speaker={item.speaker}
							words={item.text}
							start={item.start}
							end={item.end}
							audioId={`audio-${currentFile.name}-${index}`}
						/>
					))}
				</Stack>
			</ScrollArea>

		</Center>
	);
}

export default TranscriptList;