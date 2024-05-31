import { DefaultSession } from 'next-auth';
import { UserSessionPayload } from '@/types/user.type';

declare module 'next-auth' {
	interface Session {
		user: UserSessionPayload
			& DefaultSession['user'];
	}

	interface NextAuthUser extends UserSessionPayload, DefaultSession['user'] {
	}
}