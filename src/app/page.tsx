import NextauthSessionProviders from '@/components/NextauthSessionProviders';
import ProvidersLayout from '@/components/ProvidersLayout';
import HomePage from '@/containers/HomePage';

export default function Home() {
	return (
		<NextauthSessionProviders>
			<ProvidersLayout>
				<HomePage />
			</ProvidersLayout>
		</NextauthSessionProviders>
	);
}
