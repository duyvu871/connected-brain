import React from 'react';
import { Button, Slider } from '@nextui-org/react';
import { formatMillisecondsToMinutesSeconds } from '@/utils/time';
import { useAtom } from 'jotai';
import { audioCurrentTime, audioDuration } from '@/containers/Apps/SpeechToText/states/jotai';

interface TranscriptPlayerTimelineProps {}

function TranscriptPlayerTimeline({}: TranscriptPlayerTimelineProps) {
	const [value, setValue] = useAtom<number | number[]>(audioCurrentTime);
	const [maxValue, setMaxValue] = useAtom<number>(audioDuration);
	return (
		<Slider
			aria-label='Volume'
			maxValue={maxValue}
			minValue={0}
			size='sm'
			color='success'
			value={value}
			onChange={setValue}
			startContent={
				<Button isIconOnly variant='light' radius='full'>
					{formatMillisecondsToMinutesSeconds(Number(value))}
				</Button>
			}
			endContent={
				<Button isIconOnly variant='light' radius='full'>
					{formatMillisecondsToMinutesSeconds(maxValue)}
				</Button>
			}
			className='max-w-md'
			classNames={{
				thumb: 'bg-white',
				track: 'bg-zinc-300',
			}}
		/>
	);
}

export default TranscriptPlayerTimeline;
