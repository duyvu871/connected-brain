import React from 'react';
import { cn } from '@/lib/utils';

interface DonutShapeProps extends React.HTMLAttributes<HTMLPreElement> {
	classNames?: {
		wrapper?: string;
		pre?: string;
	};
};

function DonutShape({ classNames, ...props }: DonutShapeProps) {
	return (
		<div className={cn('', classNames?.wrapper || '')}>
			<pre
				className={cn('donut-shaped w-[400px] h-[400px] text-md text-gray-600 flex justify-center items-center', classNames?.pre || '')} {...props} ></pre>
		</div>
	);
}

export default DonutShape;