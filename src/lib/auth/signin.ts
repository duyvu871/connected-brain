import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import { extractProperties } from '@/helpers/extractProperties';
import { UserInterface } from 'types/user.type';
import { WithId } from 'mongodb';

type UserRecord<T extends 'username' | 'password' | 'role'> = T extends 'role'
	? {
		admin: {
			email: string;
			password: string;
			role: 'admin';
		};
		user: {
			email: string;
			password: string;
			role: 'user';
		};
	}['admin' | 'user']
	: T extends 'email'
		? { email: string }
		: T extends 'password'
			? { password: string }
			: never;

/**
 * Sign in with the given credentials
 * @param credentials - The credentials to sign in
 * @returns The user record
 * @throws Error
 * @example
 * const user = await signIn({
 * 	 email: 'email@example.com'
 * 	 password: 'password'
 * 	 role: 'admin'
 * });
 */

export async function signIn(credentials: UserRecord<'role'> | undefined) {
	const client = await clientPromise;
	// console.log(credentials);
	if (credentials.role !== 'admin' && credentials.role !== 'user') {
		throw new Error('Role is required.');
	}
	if (credentials.role === 'admin') {
		const adminsCollection = client
			.db(process.env.DB_NAME)
			.collection('admin');
		const email = credentials?.email;
		if (!email) {
			throw new Error('Email is required.');
		}
		const admin = await adminsCollection.findOne({ email });
		if (!admin) {
			throw new Error('Admin does not exist.');
		}
		const passwordIsValid = await bcrypt.compare(
			credentials?.password!,
			admin.password,
		);
		if (!passwordIsValid) {
			throw new Error('Password is wrong');
		}
		return extractProperties(admin, ['email', 'role', 'uid', '_id']);
	}
	const usersCollection = client
		.db(process.env.DB_NAME)
		.collection('users');

	const email = credentials?.email;
	const user = await usersCollection.findOne({ email }) as WithId<UserInterface> | null;

	if (!user) {
		throw new Error('User does not exist.');
	}

	const passwordIsValid = await bcrypt.compare(
		credentials?.password!,
		user.password,
	);

	if (!passwordIsValid) {
		throw new Error('Password is wrong');
	}

	return extractProperties(user, ['username', 'role', 'balance', '_id']);
}

