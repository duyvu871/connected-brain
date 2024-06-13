import React from 'react';
import ProvidersLayout from '@/components/ProvidersLayout';
import FeatureDetailPage from '@/containers/Feature/FeatureDetailPage';
import BaseLayout from '@/components/BaseLayout';
import { getServerAuthSession } from '@/lib/nextauthOptions';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import NextuiProvider from '@/components/NextuiProvider';

;

async function Page() {
	const session = await getServerAuthSession();
	const header = headers();
	const pathname = header.get('x-pathname');
	if (!session?.user) {
		return redirect('/auth/method?type=login');
	}
	return (
		<ProvidersLayout>
			<NextuiProvider>
				<BaseLayout>
					<FeatureDetailPage />
				</BaseLayout>
			</NextuiProvider>
		</ProvidersLayout>
	);
}

export default Page;