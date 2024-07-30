import React from 'react';
import FeatureNavbar from '@/components/Navbar/FeatureNavbar';
import HeroBanner from '@/components/HeroComponents/HeroBanner';
import { Icons } from '@/components/icons';
import HeaderInner from '@/containers/Feature/Components/HeaderInner';

interface FeatureDetailPageProps {

};

function FeatureDetailPage({}: FeatureDetailPageProps) {
	return (
		<>
			<FeatureNavbar />
			<div className={'w-full p-5 pt-16 flex-grow'}>
				<HeaderInner />
				<HeroBanner
					justify={'center'}
					type={'banner'}
					classNames={{ container: 'mt-5' }}
					bannerImage={<Icons.logo className={'flex-grow-[5] h-24 w-24 fill-blue-400'} />}
				>
					<div className={'flex-grow-[5] flex justify-center items-center bg-gray-900'}>
						<p className={'text-lg font-semibold text-center'}>Feature Detail Page</p>
					</div>
				</HeroBanner>
			</div>
		</>
	);
}

export default FeatureDetailPage;