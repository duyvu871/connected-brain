'use client';
import React from 'react';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({});


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