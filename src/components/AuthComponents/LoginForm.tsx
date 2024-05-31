'use client';
import { upperFirst } from '@mantine/hooks';
import {
	Anchor,
	Button,
	Checkbox,
	Divider,
	Group,
	Paper,
	PaperProps,
	PasswordInput,
	Stack,
	Text,
	TextInput,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/zod/userValidate';
import { LoginFormType } from 'types/form.type';
import { useAuth } from '@/hooks/useAuth';

export function LoginForm(props: PaperProps) {
	const router = useRouter();
	const { login } = useAuth();
	const {
		getValues,
		handleSubmit,
		formState,
		setValue,
		setError,
	} = useForm<LoginFormType>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = () => {
		return handleSubmit((value) => {
			login(value, '/');
			console.log(value);
		}, (errors) => {
			console.log(errors);
		});
	};

	const backToMain = () => {
		router.push('/');
	};

	const handleLogin = () => {
		router.push('/auth/method?type=login');
	};
	const handleRegister = () => {
		router.push('/auth/method?type=register');
	};
	const handleForgotPassword = () => {
		router.push('/auth/method?type=forgot-password');
	};

	return (
		<Paper radius="md" p="xl" withBorder {...props}>
			<Text size="lg" fw={500}>
				Welcome to <span className={'text-xl text-blue-400 cursor-pointer hover:underline'} onClick={backToMain}>Connected Brain</span>,
				Login with
			</Text>

			<Group grow mb="md" mt="md">
				<GoogleButton radius="xl" className={'bg-opacity-0'}>Google</GoogleButton>
			</Group>

			<Divider label="Or continue with email" labelPosition="center" my="lg" />

			<form onSubmit={onSubmit()}>
				<Stack>
					<TextInput
						required
						label="Email"
						placeholder="contract@connectedbrain.com"
						onChange={(event) => setValue('email', event.currentTarget.value)}
						error={formState.errors?.email?.message}
						radius="md"
					/>

					<PasswordInput
						required
						label="Password"
						placeholder="Your password"
						onChange={(event) => setValue('password', event.currentTarget.value)}
						error={formState.errors?.password?.message}
						radius="md"
					/>

				</Stack>
				<Group justify="space-between" mt="lg">
					<Checkbox label="Remember me" />
					<Anchor component="button" size="sm" onClick={handleForgotPassword}>
						Forgot password?
					</Anchor>
				</Group>
				<Group justify="space-between" mt="xl">
					<Anchor component="button" type="button" c="dimmed" onClick={handleRegister} size="xs">
						{'Don\'t have an account? Register'}
					</Anchor>
					<Button type="submit" radius="md">
						{upperFirst('login')}
					</Button>
				</Group>
			</form>
		</Paper>
	);
}