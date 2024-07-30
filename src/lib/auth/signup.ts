// import { NotificationForAdmin } from '@/services/notification_for_admin';
import process from 'node:process';

/**
 * Sign up with the given credentials
 * @param credentials - The credentials to sign up
 * @returns The user record
 * @throws Error
 * @example
 * const user = await signUp({
 * 	 username: 'username',
 * 	 password: 'password',
 * 	 phone: 'phone',
 * 	 email: 'email@example.com'
 * 	 role: 'user'
 * 	 avatar: 'avatar'
 * 	 ...
 * });
 */
export async function signUp(
	credentials: Record<'username' | 'password' | 'phone' | 'email', string> | undefined,
) {
	// const client = await clientPromise;
	// // console.log(credentials);
	// const usersCollection = client.db(process.env.DB_NAME).collection('users');
	// // console.log(usersCollection);
	// const username = credentials?.username;
	// const password = credentials?.password;
	// const email = credentials?.email;
	// const phone = credentials?.phone;
	//
	// if (!username || !password) {
	// 	throw new Error('Invalid credentials');
	// }
	//
	// const user = await usersCollection.findOne({
	// 	// username: credentials.username,
	// 	// phone: credentials.phone,
	// 	email: credentials.email,
	// }) as WithId<UserInterface>;
	// // console.log(user)
	// if (user) {
	// 	throw new Error('Tài khoản đã tồn tại');
	// }
	//
	// checkValidFullName(username, message => {
	// 	if (message) throw new Error(message);
	// 	return true;
	// });
	//
	// const doc: WithId<UserInterface> = {
	// 	_id: new ObjectId(),
	// 	avatar: '',
	// 	username,
	// 	email: (email as string) || '',
	// 	phone: phone as string,
	// 	password: bcrypt.hashSync(password as string, 10),
	// 	role: 'user',
	// 	balance: 0,
	// 	id_index: (await usersCollection.countDocuments()) + 1,
	// 	virtualVolume: 0,
	// 	address: '',
	// 	transactions: [],
	// 	actionHistory: [],
	// 	chatHistory: [],
	// 	bankingInfo: {
	// 		bank: '',
	// 		accountNumber: '',
	// 		accountName: '',
	// 	},
	// 	createdAt: new Date(),
	// 	updatedAt: new Date(),
	// };
	//
	// const insertUser = await usersCollection.insertOne(doc);
	//
	// if (!insertUser) {
	// 	throw new Error('Insert user failed');
	// }

	const username = credentials?.username;
	const password = credentials?.password;
	const email = credentials?.email;
	// const phone = credentials?.phone;
	// console.log(username, password, email);
	// const response = await fetch(process.env.API_ENDPOINT + '/api/v1/auth/register', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/x-www-form-urlencoded',
	// 	},
	// 	body: JSON.stringify({
	// 		username,
	// 		password,
	// 		email,
	// 	}),
	// });

	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

	const urlencoded = new URLSearchParams();
	urlencoded.append('email', email);
	urlencoded.append('password', password);
	urlencoded.append('username', username);

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		// redirect: "follow"
	};

	const response = await fetch(process.env.API_ENDPOINT + '/api/v1/auth/register', requestOptions);
	const result = await response.json();
	// console.log(result);
	if (response.status !== 200) {
		// @ts-ignore
		throw new Error(result.errors || result.message);
	}
	return {
		message: 'Đăng ký thành công',
	};
}
