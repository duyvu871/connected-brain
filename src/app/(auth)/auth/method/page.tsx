import React, { Suspense } from 'react';
import AuthMethodPage from '@/containers/AuthContainers/AuthMethodPage';

interface PageProps {

};

function Page({}: PageProps) {
	return (
		<Suspense>
			<AuthMethodPage />
		</Suspense>
	);
}

export default Page;