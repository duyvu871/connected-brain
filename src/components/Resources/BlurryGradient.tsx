import React from 'react';

interface BlurryGradientProps {
	children: React.ReactNode;
	props?: HTMLDivElement;
}

function BlurryGradient({ children, ...props }: BlurryGradientProps) {
	return (
		<div className={'relative'}>
			<div {...props}>
				{children}
			</div>
			<div className={'absolute w-full h-full'}>
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 700 700" width="700" height="700"
						 opacity="0.45">
					<defs>
						<linearGradient gradientTransform="rotate(300, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%"
														id="ffflux-gradient">
							<stop stopColor="hsl(0, 0%, 100%)" stopOpacity="1" offset="0%"></stop>
							<stop stopColor="hsl(227, 60%, 30%)" stopOpacity="1" offset="100%"></stop>
						</linearGradient>
						<filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox"
										primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
							<feTurbulence type="fractalNoise" baseFrequency="0.003 0.006" numOctaves="2" seed="2" stitchTiles="stitch"
														x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
							<feGaussianBlur stdDeviation="100 100" x="0%" y="0%" width="100%" height="100%" in="turbulence"
															edgeMode="duplicate" result="blur"></feGaussianBlur>
							<feBlend mode="color-dodge" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur"
											 result="blend"></feBlend>

						</filter>
					</defs>
					<rect width="700" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect>
				</svg>
			</div>
		</div>
	);
}

export default BlurryGradient;