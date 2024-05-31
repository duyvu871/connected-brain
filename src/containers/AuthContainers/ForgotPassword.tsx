import React from 'react';
import AuthContainer from '@/components/AuthComponents/AuthContainer';
import { ForgotPasswordForm } from '@/components/AuthComponents/ForgotPasswordForm';

interface ForgotPasswordProps {

};

function ForgotPassword({}: ForgotPasswordProps) {
	return (
		<AuthContainer>
			<ForgotPasswordForm className={'max-w-sm'} />
		</AuthContainer>
	);
}

export default ForgotPassword;