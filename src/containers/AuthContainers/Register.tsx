import React from 'react';
import AuthContainer from '@/components/AuthComponents/AuthContainer';
import { RegisterForm } from '@/components/AuthComponents/RegisterForm';

interface RegisterProps {

};

function Register({}: RegisterProps) {
	return (
		<AuthContainer>
			<RegisterForm className={'max-w-sm'} />
		</AuthContainer>
	);
}

export default Register;