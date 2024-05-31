import { motion } from 'framer-motion';
import React from 'react';

interface UnderlineHoverProps {
	children: React.ReactNode;
	isMouseEnter: boolean;
};

function UnderlineHover({ children, isMouseEnter }: UnderlineHoverProps) {
	// console.log(isMouseEnter);
	return (
		<div>
			<div className="relative">
				{children}
			</div>
			<motion.div className="relative -bottom-[1px] left-0 right-0 h-[1px] bg-white w-full" initial={{
				scaleX: 0,
			}} animate={{
				scaleX: isMouseEnter ? 1 : 0,
			}} transition={{
				duration: 0.3,
			}} style={{
				backgroundColor: '#fff',
			}}>
			</motion.div>
		</div>
	);
}

export default UnderlineHover;
