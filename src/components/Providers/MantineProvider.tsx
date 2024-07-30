'use client';
import React from 'react';
import { createTheme, Loader, MantineProvider } from '@mantine/core';
import RingLoader from '@/components/Loaders/RingLoader';


const theme = createTheme({
	components: {
		Loader: Loader.extend({
			defaultProps: {
				loaders: { ...Loader.defaultLoaders, ring: RingLoader },
				type: 'ring',
			},
		}),
	},
});


interface MantineProviderProps {
	children: React.ReactNode;
};

export function MantineProviderClient({ children }: MantineProviderProps) {
	return (
		<MantineProvider theme={theme} forceColorScheme={'dark'}>
			{children}
		</MantineProvider>
	);
}

export default MantineProvider;