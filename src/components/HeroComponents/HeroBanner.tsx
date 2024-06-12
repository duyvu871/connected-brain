import React from 'react';
import { cn } from '@/lib/utils';

interface HeroBannerProps {
	justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
	type?: 'modal' | 'banner';
	children?: React.ReactNode;
	bannerImage?: React.ReactNode;
	classNames?: {
		container?: string;
		wrapper?: string;
		content?: string;
		bannerImage?: string;
	};
};

function HeroBanner({
											justify = 'center',
											type = 'banner',
											children,
											bannerImage,
											classNames = {
												container: '',
												wrapper: '',
												content: '',
												bannerImage: '',
											},
										}: HeroBannerProps) {
	return (
		<div className={cn(
			'relative mx-6 bg-gray-600 rounded-xl border-4 border-transparent border-solid flex ',

			{
				[`${classNames.container}`]: Boolean(classNames.container),
			},
		)}>
			<div className={cn('w-full h-full rounded-lg overflow-hidden flex bg-gray-900',
				`justify-${justify}`,
				{
					[`${classNames.wrapper}`]: Boolean(classNames.wrapper),
				},
			)}>
				<div className={cn('w-full flex rounded-lg overflow-hidden',
					{
						[`${classNames.content}`]: Boolean(classNames.content),
					},
				)}>{children}</div>
				<div className={cn('flex justify-center items-center p-5',
					{
						[`${classNames.bannerImage}`]: Boolean(classNames.bannerImage),
					})}>{bannerImage}</div>
			</div>
		</div>
	);
}

export default HeroBanner;