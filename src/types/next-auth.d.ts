import { DefaultSession } from 'next-auth';
import { UserSessionPayload } from '@/types/user.type';
import { UserInterface } from 'types/user.type';

declare module 'next-auth' {
	interface Session {
		user: UserSessionPayload
			& DefaultSession['user'];
		token?: string;
	}

	interface User {
		userPayload: UserInterface;
		accessToken: string;
	}

	interface NextAuthUser extends UserSessionPayload, DefaultSession['user'] {
	}
}