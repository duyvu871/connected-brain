import { motion } from 'framer-motion';
import React from 'react';

interface HideToShowProps {
	position: 'left' | 'right' | 'top' | 'bottom';

	mainProps: React.HTMLAttributes<HTMLDivElement>;
	children: React.ReactNode;
};

function HideToShow({ mainProps, position, children }: HideToShowProps) {
	return (
		<motion.div className={''}>
			{children}
		</motion.div>
	);
}

export default HideToShow;