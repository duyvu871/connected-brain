'use client';
import { upperFirst } from '@mantine/hooks';
// import { useForm } from '@mantine/form';
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
import { useAuth } from '@/hooks/useAuth';
import { RegisterFormType } from 'types/form.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/zod/userValidate';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export function RegisterForm(props: PaperProps) {
	const router = useRouter();
	const { register } = useAuth();
	const {
		resetField,
		getValues,
		handleSubmit,
		formState,
		setValue,
		setError,
	} = useForm<RegisterFormType>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = () => {
		return handleSubmit((value) => {
			register(value, '/auth/method?type=login');
			console.log(value);
		}, (errors) => {
			console.log(errors);
		});
	};

	const resetAllField = () => {
		resetField('username');
		resetField('phone');
		resetField('email');
		resetField('password');
		resetField('confirmPassword');
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

	useEffect(() => {
		resetAllField();
	}, []);

	return (
		<Paper radius="md" p="xl" withBorder {...props}>
			<Text size="lg" fw={500}>
				Welcome to <span className={'text-xl text-blue-400 cursor-pointer hover:underline'} onClick={backToMain}>Connected Brain</span>,
				Register with
			</Text>

			<Group grow mb="md" mt="md">
				<GoogleButton radius="xl" className={'bg-opacity-0'}>Google</GoogleButton>
			</Group>

			<Divider label="Or continue with email" labelPosition="center" my="lg" />

			<form onSubmit={onSubmit()}>
				<Stack>
					<TextInput
						autoComplete={'off'}
						spellCheck={false}
						label="Name"
						placeholder="Your name"
						onChange={(event) => setValue('username', event.currentTarget.value)}
						error={formState.errors?.username?.message}
						radius="md"
					/>
					<TextInput
						autoComplete={'off'}
						spellCheck={false}
						required
						label="phone"
						placeholder="contract@connectedbrain.com"
						onChange={(event) => setValue('phone', event.currentTarget.value)}
						error={formState.errors?.phone?.message}
						radius="md"
					/>
					<TextInput
						autoComplete={'off'}
						spellCheck={false}
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
					<PasswordInput
						required
						label="Confirm password"
						placeholder="Confirm password"
						onChange={(event) => setValue('confirmPassword', event.currentTarget.value)}
						error={formState.errors?.confirmPassword?.message}
						radius="md"
					/>
					<Checkbox
						label="I accept terms and conditions"
						// checked={}
						// onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
					/>
				</Stack>
				<Group justify="space-between" mt="xl">
					<Anchor component="button" type="button" c="dimmed" onClick={handleLogin} size="xs">
						{'Already have an account? Login'}
					</Anchor>
					<Button type="submit" radius="md">
						{upperFirst('register')}
					</Button>
				</Group>
			</form>
		</Paper>
	);
}