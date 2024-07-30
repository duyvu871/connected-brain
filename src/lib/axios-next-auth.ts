import axios, { InternalAxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

const axiosNextAuth = axios.create();

axiosNextAuth.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
	const session = await getSession();
	console.log('session', session);
	if (session && session.token) {
		config.headers.Authorization = `Bearer ${session.token}`;
	}

	return config;
});

export default axiosNextAuth;