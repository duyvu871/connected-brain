import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoReload, IoSearch } from 'react-icons/io5';
import { TiMediaStopOutline } from 'react-icons/ti';
import { RiRobot2Line, RiVoiceprintFill } from 'react-icons/ri';
import { HiOutlineDocumentText } from 'react-icons/hi';

interface MacbookContentGraphicProps {

};

const FloatingWrapper = (props: React.ComponentPropsWithoutRef<'div'>) => {
	return (
		<div {...props}>
			<motion.div

			>
				{props.children}
			</motion.div>
		</div>
	);
};


function MacbookContentGraphic({}: MacbookContentGraphicProps) {

	const heroIcons = [RiVoiceprintFill, HiOutlineDocumentText, IoSearch, RiRobot2Line];
	const notificationImages = ['/preview-images/img_1.png', '/preview-images/img_2.png', '/preview-images/img_3.png'];
	return (
		<div className={'w-full mx-auto p-5 pb-20 md:pb-5 flex justify-center items-center'}>
			<div className={'h-fit w-fit relative flex flex-col justify-center items-center'}>
				<div className={'relative'}>
					<Image src={'/graphics/macbook_robot.png'} width={1000} height={600} alt={'screen'} className={'relative'} />
					<div className={'absolute w-full flex justify-center'}>
						<div
							className={'relative max-w-[200px] md:max-w-md sm:max-w-xs w-full md:bottom-28 sm:bottom-20 bottom-14'}>
							<div
								className={`flex items-center md:p-2 bg-gray-200/50 rounded-full text-gray-900 backdrop-blur-[4px] text-[10px] md:text-xl font-semibold`}
							>
								<IoReload className={'p-1 mr-3 text-gray-900 w-6 h-6 md:w-8 md:h-8'} />
								<span className={'flex justify-between items-center w-full'}>
						AI is generating...
						<TiMediaStopOutline className={' text-gray-900 w-6 h-6 md:w-8 md:h-8'} />
					</span>
							</div>
						</div>
					</div>
				</div>
				<ul
					className=" flex left-2 top-[360px] sm:top-60 xl:flex absolute md:left-24 px-1 py-1 bg-gray-500/20 backdrop-blur-[8px] border border-gray-800 rounded-2xl md:block xl:left-[-10px]">
					{heroIcons.map((icon, index) => (
						<motion.li className="p-2 md:p-5" key={'hero-icon-' + index} whileHover={'hover'} variants={{
							hover: {
								scale: 1.3,
								color: '#60a5fa',
								animationDuration: '1s',
								transition: {
									ease: [0.15, 0.75, 0.5, 1],
									duration: 0.4,
								},
							},
						}}>
							{icon({ className: 'md', size: 30 })}
						</motion.li>
					))}
				</ul>

				<div
					className={' top-60 w-64 absolute right-0 xl:right-[-60px] md:top-20 md:w-80 flex items-center p-4 pr-6 bg-gray-500/20 backdrop-blur-[8px] border border-gray-800 rounded-2xl gap-5'}
				>
					<Image
						src={'/graphics/main_robot.png'}
						width={62}
						height={62}
						alt="image"
						className="rounded-xl aspect-square object-cover"
					/>

					<div className="flex-1">
						<h6 className="mb-1 font-semibold text-base ">Conservation Recorded</h6>

						<div className="flex items-center justify-between">
							<ul className="flex -m-0.5">
								{notificationImages.map((item, index) => (
									<li
										key={index}
										className="flex w-6 h-6 border border-gray-800 rounded-full overflow-hidden"
									>
										<Image
											src={item}
											className="w-full"
											width={20}
											height={20}
											alt={item}
										/>
									</li>
								))}
							</ul>
							<div className="body-2 text-sm text-gray-600">1m ago</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MacbookContentGraphic;