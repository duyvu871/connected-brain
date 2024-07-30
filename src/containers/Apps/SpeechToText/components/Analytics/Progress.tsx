import React, { FC } from 'react';
import { Box, Center, Flex } from '@mantine/core';
import { CircularProgress } from '@nextui-org/react';

interface ProgressProps {

};

interface ProgressLabelProps {
	value: number;
}

const ProgressLabel: FC<ProgressLabelProps> = ({ value }) => {
	return (
		<Flex direction={'column'} justify={'center'} align={'center'} className={''}>
			<Box className={'text-green-400 text-xl font-semibold'}>{value}%</Box>
			<Box className={'text-gray-300/70 text-xs'}>Completed</Box>
		</Flex>
	);
};

function Progress({}: ProgressProps) {
	return (
		<Center className={'w-full max-w-lg h-full gap-5'}>
			<CircularProgress
				aria-label="Loading..."
				label={<ProgressLabel value={70} />}
				size="sm"
				value={70}
				color="success"
				// showValueLabel={true}
				strokeWidth={1}
				classNames={{
					base: 'relative block',
					track: 'bg-gray-700',
					value: 'text-white',
					label: 'text-white absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]	',
					indicator: 'stroke-green-500 h-2',
					svg: 'stroke-white w-24 h-24 ',
				}}
			/>
		</Center>
	);
}

export default Progress;