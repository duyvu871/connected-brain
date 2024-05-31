import React from 'react';
import { LoginForm } from '@/components/AuthComponents/LoginForm';
import AuthContainer from '@/components/AuthComponents/AuthContainer';

interface LoginProps {

};

function Login({}: LoginProps) {
	return (
		<AuthContainer>
			<LoginForm className={'max-w-sm'} />
		</AuthContainer>
	);
}

export default Login;