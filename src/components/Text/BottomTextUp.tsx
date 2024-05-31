import { motion } from 'framer-motion';
import React from 'react';

interface BottomTextUpProps {
	text: string;
};

function BottomTextUp({ text }: BottomTextUpProps) {
	const container = {
		visible: {
			transition: {
				staggerChildren: 0.025,
			},
		},
	};
	return (
		<motion.div
			className="App"
			initial="hidden"
			animate="visible"
			variants={container}
		>
			<div className="container">
				<AnimatedCharacters text={text} type="heading1" />
			</div>
		</motion.div>
	);
}

const Wrapper = (props: {
	children: React.ReactNode;
}) => {
	// We'll do this to prevent wrapping of words using CSS
	return <span className="whitespace-nowrap">{props.children}</span>;
};

// Map API "type" vaules to JSX tag names
const tagMap = {
	paragraph: 'p',
	heading1: 'h1',
	heading2: 'h2',
};

export const AnimatedCharacters = (props: { text: string; type: string | number; }) => {
	// Framer Motion variant object, for controlling animation
	const item = {
		hidden: {
			y: '200%',
			// color: '#0055FF',
			transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
		},
		visible: {
			y: 0,
			// color: '#0055FF',
			transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
		},
	};

	//  Split each word of props.text into an array
	const splitWords = props.text.split(' ');

	// Create storage array
	const words = [];

	// Push each word into words array
	for (const item of splitWords) {
		words.push(item.split(''));
	}

	// Add a space ("\u00A0") to the end of each word
	words.map((word) => {
		return word.push('\u00A0');
	});

	// Get the tag name from tagMap
	const Tag = tagMap[props.type];

	return (
		<Tag>
			{words.map((word, index) => {
				return (
					// Wrap each word in the Wrapper component
					<Wrapper key={index}>
						{words[index].flat().map((element, index) => {
							return (
								<span
									style={{
										overflow: 'hidden',
										display: 'inline-block',
									}}
									key={index}
								>
                  <motion.span
										style={{ display: 'inline-block' }}
										variants={item}
									>
                    {element}
                  </motion.span>
                </span>
							);
						})}
					</Wrapper>
				);
			})}
			{/* {} */}
		</Tag>
	);
};

export default BottomTextUp;