'use client';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface HeaderInnerProps {

};

function HeaderInner({}: HeaderInnerProps) {
	const { user } = useAuth();
	return (
		<div className={'w-full flex justify-start items-center p-5'}>
			<div>
				<h1>{user?.username}</h1>
			</div>
		</div>
	);
}

export default HeaderInner;