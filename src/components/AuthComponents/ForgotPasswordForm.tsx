'use client';
import {
	Anchor,
	Box,
	Button,
	Center,
	Container,
	ContainerProps,
	Group,
	Paper,
	rem,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';

export function ForgotPasswordForm(props: ContainerProps) {
	const router = useRouter();

	const backToLogin = () => {
		router.push('/auth/method?type=login');
	};

	return (
		<Container size={460} my={30} {...props}>
			<Title className={'text-3xl font-bold'} ta="center">
				Forgot your password?
			</Title>
			<Text c="dimmed" fz="sm" ta="center">
				Enter your email to get a reset link
			</Text>

			<Paper withBorder shadow="md" p={30} radius="md" mt="xl">
				<TextInput label="Your email" placeholder="contract@connectedbrain.com" required />
				<Group justify="space-between" mt="lg" className={'flex-col-reverse'}>
					<Anchor c="dimmed" size="sm" className={' w-full text-center '} onClick={backToLogin}>
						<Center inline className={'hover:text-white'}>
							<IoIosArrowRoundBack style={{ width: rem(18), height: rem(18) }} stroke={1.5.toString()} />
							<Box ml={5}>Back to the login page</Box>
						</Center>
					</Anchor>
					<Button className={'w-full text-center'}>Reset password</Button>
				</Group>
			</Paper>
		</Container>
	);
}