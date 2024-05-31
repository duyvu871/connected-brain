import React from 'react';
import ProvidersLayout from '@/components/ProvidersLayout';
import FeatureDetailPage from '@/containers/FeatureDetailPage';
import BaseLayout from '@/components/BaseLayout';

;

async function Page() {
	return (
		<ProvidersLayout>
			<BaseLayout>
				<FeatureDetailPage />
			</BaseLayout>
		</ProvidersLayout>
	);
}

export default Page;