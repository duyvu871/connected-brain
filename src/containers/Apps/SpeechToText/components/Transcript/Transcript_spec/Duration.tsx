import React, { FC } from 'react';
import { Box, Flex } from '@mantine/core';
import { formatMillisecondsToMinutesSeconds } from '@/utils/time';
import { useAtom } from 'jotai/index';
import { audioDuration } from '@/containers/Apps/SpeechToText/states/jotai';

interface DurationProps {
};

const DurationTime: FC<any> = () => {
	const [duration, _] = useAtom<number>(audioDuration);
	return (
		<Flex direction={'column'} justify={'center'} align={'start'} className={' flex-grow'}>
			<Box className={'text-green-400 text-3xl font-semibold'}>{formatMillisecondsToMinutesSeconds(duration)}</Box>
			<Box className={'text-gray-300/70 text-sm'}>Minutes processed</Box>
		</Flex>
	);
};

function Duration({}: DurationProps) {
	return (
		<Flex justify={'center'} align={'center'} className={'gap-5 p-5'}>
			<Box className={'flex-grow'}>
				<svg width="100" height="100" viewBox="0 0 287 251" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="36" y="75" width="10" height="100" rx="5" fill="#53C269" />
					<rect x="18" y="84" width="10" height="80" rx="5" fill="#53C269" />
					<rect y="98" width="10" height="50" rx="5" fill="#53C269" />
					<rect x="53" y="25" width="10" height="200" rx="5" fill="#53C269" />
					<rect x="104" y="100" width="10" height="50" rx="5" fill="#53C269" />
					<rect x="87" width="10" height="250" rx="5" fill="#53C269" />
					<rect x="140" width="10" height="250" rx="5" fill="#BEBEBE" />
					<rect x="121" y="60" width="10" height="130" rx="5" fill="#53C269" />
					<rect x="70" y="50" width="10" height="150" rx="5" fill="#53C269" />
					<rect x="252.254" y="174.255" width="10" height="100" rx="5" transform="rotate(-180 252.254 174.255)"
								fill="#BEBEBE" />
					<rect x="269.254" y="158.255" width="10" height="70" rx="5" transform="rotate(-180 269.254 158.255)"
								fill="#BEBEBE" />
					<rect x="286.254" y="149.255" width="10" height="50" rx="5" transform="rotate(-180 286.254 149.255)"
								fill="#BEBEBE" />
					<rect x="235.254" y="224.551" width="10" height="200" rx="5" transform="rotate(-180 235.254 224.551)"
								fill="#BEBEBE" />
					<rect x="184.263" y="150.44" width="10" height="50" rx="5" transform="rotate(-180 184.263 150.44)"
								fill="#BEBEBE" />
					<rect x="201.261" y="250.145" width="10" height="250" rx="5" transform="rotate(-180 201.261 250.145)"
								fill="#BEBEBE" />
					<rect x="167.266" y="190.737" width="10" height="130" rx="5" transform="rotate(-180 167.266 190.737)"
								fill="#BEBEBE" />
					<rect x="218.256" y="199.847" width="10" height="150" rx="5" transform="rotate(-180 218.256 199.847)"
								fill="#BEBEBE" />
				</svg>
			</Box>
			<DurationTime />
		</Flex>
	);
}

export default Duration;