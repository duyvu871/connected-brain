import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import { extractProperties } from '@/helpers/extractProperties';
import { UserInterface } from 'types/user.type';
import { ObjectId, WithId } from 'mongodb';
// import { NotificationForAdmin } from '@/services/notification_for_admin';
import { checkValidFullName } from '@/utils/validate.utils';

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
	const client = await clientPromise;
	// console.log(credentials);
	const usersCollection = client.db(process.env.DB_NAME).collection('users');
	// console.log(usersCollection);
	const username = credentials?.username;
	const password = credentials?.password;
	const email = credentials?.email;
	const phone = credentials?.phone;

	if (!username || !password) {
		throw new Error('Invalid credentials');
	}

	const user = await usersCollection.findOne({
		// username: credentials.username,
		// phone: credentials.phone,
		email: credentials.email,
	}) as WithId<UserInterface>;
	// console.log(user)
	if (user) {
		throw new Error('Tài khoản đã tồn tại');
	}

	checkValidFullName(username, message => {
		if (message) throw new Error(message);
		return true;
	});

	const doc: WithId<UserInterface> = {
		_id: new ObjectId(),
		avatar: '',
		username,
		email: (email as string) || '',
		phone: phone as string,
		password: bcrypt.hashSync(password as string, 10),
		role: 'user',
		balance: 0,
		id_index: (await usersCollection.countDocuments()) + 1,
		virtualVolume: 0,
		address: '',
		transactions: [],
		actionHistory: [],
		bankingInfo: {
			bank: '',
			accountNumber: '',
			accountName: '',
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const insertUser = await usersCollection.insertOne(doc);

	if (!insertUser) {
		throw new Error('Insert user failed');
	}
	// const notification = new NotificationForAdmin();
	// await notification.sendNotificationToAdmin(
	// 	'create',
	// 	new Date(),
	// 	{
	// 		title: 'Tạo tài khoản',
	// 		desc: `Tạo tài khoản ${doc.fullName} thành công`,
	// 		content: `Tạo tài khoản ${doc.fullName} thành công`,
	// 	},
	// 	{
	// 		userId: doc._id.toString(),
	// 		referrerId: doc._id.toString(),
	// 	},
	// 	'user',
	// );
	return extractProperties(doc, ['id_index', 'username', 'role', 'balance', '_id']);
}
