import React, { useEffect, useRef, useState } from 'react';
import { Center, Flex, ScrollArea, Stack } from '@mantine/core';
import { useAtom } from 'jotai/index';
import { transcript } from '@/containers/Apps/SpeechToText/states/transcript';
import useUID from '@/hooks/useUID';
import { formatMillisecondsToMinutesSeconds } from '@/utils/time';
import { Howl } from 'howler';
import { audioFile, audioInstance } from '@/containers/Apps/SpeechToText/states/jotai';
import { HiMiniPause, HiMiniPlay } from 'react-icons/hi2';
import { atom } from 'jotai';

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
	const [instance] = useAtom(audioInstance);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [audioActive, setAudioActive] = useAtom(audioItemActive);
	const audioInstanceRef = useRef<Howl | null>(instance);
	const playSegment = () => {
		const instance = global as (typeof globalThis & {
			audioInstance?: Howl;
		});
		const audioInstance = instance?.audioInstance;
		audioInstanceRef.current = audioInstance;

		if (audioActive !== props.audioId) {
			audioInstanceRef.current?.stop();
		}
		if (isPlaying) {

			setAudioActive(null);
			return;
		}
		if (!audioInstance) return;
		if (!props.audioId) return;

		setAudioActive(props.audioId);
		audioInstance.play(props.audioId);
		audioInstance.once('end', () => {
			setAudioActive(null);
		});
		return;
	};

	useEffect(() => {
		if (audioActive === props.audioId) {
			setIsPlaying(true);
		} else {
			audioInstanceRef.current?.stop();
			setIsPlaying(false);
		}
	}, [audioActive]);

	return (
		<Flex direction={'column'} align={'start'} justify={'center'} className={'flex-grow h-fit w-full gap-1'}>
			<Flex align={'center'} justify={'space-between'} className={'w-full'}>
				<p className={'text-green-400/85 text-bold text-sm'}>{props.speaker ?? 'Speaker'}</p>
				<p className={'text-gray-500 text-bold text-xs'}>{formatMillisecondsToMinutesSeconds(props.start)}</p>
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
				<button onClick={playSegment}>{isPlaying ? <HiMiniPause className={'text-red-500'} /> :
					<HiMiniPlay />}</button>
				<p className={'text-xs text-gray-300 pl-2'}>{props.words ?? 'Words'}</p>
			</Flex>
			{/*</Tooltip>*/}
		</Flex>
	);
};

function TranscriptList({}: TranscriptListProps) {
	const [genID] = useUID();
	const [transcript_data, setTranscriptData] = useAtom(transcript);
	const [currentFile] = useAtom(audioFile);
	const [, setAudioInstance] = useAtom(audioInstance);
	useEffect(() => {
		if (currentFile) {
			// @ts-ignore
			window.audioInstance = new Howl({
				src: [currentFile.url],
				autoplay: false,
				html5: true, // use html5 audio
				sprite: {
					...transcript_data?.transcript.reduce((acc, item, index) => {
						return {
							...acc,
							[`audio-${currentFile.name}-${index}`]: [item.start, item.end - item.start],
						};
					}, {}),
				},
				onplay: () => {
					console.log('onplay');
				},
				onpause: () => {
					console.log('onpause');
				},
				onend: () => {
					console.log('onend');
				},
				onseek: () => {
				},
			});
		}
	}, [currentFile]);
	return (
		<Center className={'flex-grow w-full overflow-hidden'}>
			<ScrollArea className={'h-full w-full'} type="scroll" scrollbarSize={6} scrollHideDelay={500}>
				<Stack align={'start'} className={'gap-5'}>
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