import React from 'react';
import PricingCard from '@/components/Resources/PricingCard';
import Link from 'next/link';

interface PricingListProps {

};

const pricingList = [
	{
		title: 'Enterprise',
		price: 0,
		desc: 'Custom AI chatbot, advanced analytics, dedicated account',
		featureList: ['An AI chatbot that can understand your queries',
			'Personalized recommendations based on your preferences',
			'Ability to explore the app and its features without any cost',
			'Priority support to solve issues quickly'],
	},
];

function PricingList({}: PricingListProps) {
	return (
		<div className={'w-full'}>
			<div className={'w-full flex flex-col mt-10 gap-5'}>
				<span className={'text-2xl w-full text-center text-white '}>Pay or use with limit action</span>
				{/*<span className={'text-xs w-full text-center text-gray-600 pb-5'}>ConnectedBrain unlocks the potential of AI-powered applications</span>*/}
			</div>
			<div className={'flex justify-center gap-2 p-5'}>
				{pricingList.map((priceInfo, index) => (
					<PricingCard key={'price-' + index} title={priceInfo.title} price={priceInfo.price} desc={priceInfo.desc}
											 featureList={priceInfo.featureList} />
				))}
			</div>
			<div className="flex justify-center my-10">
				<Link
					className="text-xs font-code font-bold tracking-wider uppercase border-b hover:text-white transition-all"
					href="/pricing"
				>
					See the full details
				</Link>
			</div>
		</div>
	)
		;
}

export default PricingList;