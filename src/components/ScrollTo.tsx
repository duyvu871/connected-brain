import React, { FC, useEffect, useRef } from 'react';

type ScrollPosition = 'end' | 'top' | 'position';
type ScrollToProps = {
	target?: number;
	position?: ScrollPosition;
	smooth?: boolean;
	children: React.ReactNode;
};

const ScrollTo: FC<ScrollToProps> = ({ target, position = 'end', smooth = true, children }) => {
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current) {
			const { scrollHeight, offsetHeight } = ref.current;

			switch (position) {
				case 'end':
					ref.current.scrollTop = scrollHeight;
					break;
				case 'top':
					ref.current.scrollTop = 0;
					break;
				case 'position':
					ref.current.scrollTop = target;
					break;
				default:
					console.error('Invalid scroll position.');
					break;
			}
		}
	}, [target, position]);

	return (
		<div ref={ref} style={{ overflowY: 'scroll', height: '200px' }}>
			{children}
		</div>
	);
};

export default ScrollTo;