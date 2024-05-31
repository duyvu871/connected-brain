import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '@mantine/core/styles.css';
import '../styles/globals.css';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
	subsets: ['latin', 'vietnamese'],
	variable: '--font-sans',
});


export const metadata: Metadata = {
	title: 'Connected brain',
	description: 'A platform for connecting brain to handle native language processing',
};

export default function RootLayout({
																		 children,
																	 }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
		{/*<Head>*/}
		{/*	/!*<ColorSchemeScript />*!/*/}
		{/*</Head>*/}
		<body
			className={cn(
				'min-h-screen flex justify-center items-center w-full h-full bg-background font-sans antialiased bg-[#0c0d0f]',
				fontSans.variable)}
		>
		{children}
		</body>
		</html>
	);
}
