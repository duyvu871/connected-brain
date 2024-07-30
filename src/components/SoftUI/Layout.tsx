// Layout.tsx

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { styles } from '@/utils/soft-ui-base/box';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	clearStyles?: boolean;
}

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	columns?: number;
	gap?: number;
}

const Box = forwardRef<HTMLDivElement, BoxProps>(({ children, className, ...props }, ref) => {
	const boxStyles = props.clearStyles ? '' : styles.box;

	return (
		<div ref={ref} className={cn(`flex`, boxStyles, className)} {...props}>
			{children}
		</div>
	);
});
Box.defaultProps = {
	className: '',
};
Box.displayName = 'Box';

const FlexboxCenter: React.FC<BoxProps> = ({ children, className, ...props }) => (
	<Box className={`items-center justify-center ${className}`} {...props}>
		{children}
	</Box>
);

const GridCenter: React.FC<BoxProps> = ({ children, className, ...props }) => (
	<Grid className={`place-items-center ${className}`} {...props}>
		{children}
	</Grid>
);

const Grid = forwardRef<HTMLDivElement, BoxProps>(({ children, className, ...props }, ref) => (
	<div ref={ref} className={`grid ${className}`} {...props}>
		{children}
	</div>
));
Grid.defaultProps = {
	className: 'grid-cols-1 gap-4',
};
Grid.displayName = 'Grid';

const GridItem = forwardRef<HTMLDivElement, BoxProps>(({ children, className, ...props }, ref) => (
	<div ref={ref} className={`${className}`} {...props}>
		{children}
	</div>
));
GridItem.defaultProps = {
	className: '',
};
GridItem.displayName = 'GridItem';

export { Box, Grid, FlexboxCenter, GridCenter };