'use client';
import React from 'react';
import { NavigationMenuDemo as NavigationMenuComponent } from '@/components/Navbar/NavbarComponent';
import BodyContent from '@/components/BodyContent';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import FeatureLine from '@/components/FeatureLine';
import PricingList from '@/components/Resources/PricingList';

interface HomePageProps {

};

function HomePage({}: HomePageProps) {
	return (
		<main className={'mx-auto relative w-full'}>
			<motion.div
				className={'fixed w-full z-50'}
				initial={{
					position: 'fixed',
					top: 0,
					transform: 'translateY(-100%)',
				}}
				animate={{
					transform: 'translateY(0%)',
				}}
			>
				<NavigationMenuComponent />
			</motion.div>
			<div className={'mt-16 '}></div>
			<BodyContent />
			<div className={'w-full h-0 border-b-[1px] border-gray-600'}>
			</div>
			<FeatureLine />
			<div className={'w-full h-0 border-b-[1px] border-gray-600'}>
			</div>
			{/*<DonutShape classNames={{*/}
			{/*	wrapper: 'absolute top-0 left-0 w-full h-[100vh] z-[12] flex justify-center items-center',*/}
			{/*}} />*/}
			<PricingList />
			<div className={'w-full h-0 border-b-[1px] border-gray-600'}>
			</div>
			<Footer />
		</main>
	);
}

export default HomePage;