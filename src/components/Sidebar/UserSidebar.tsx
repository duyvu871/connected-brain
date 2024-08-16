import { ActionIcon, Group, rem, Text, Tooltip } from '@mantine/core';
// import { IconBulb, IconCheckbox, IconPlus, IconSearch, IconUser } from 'react-icons';
// import { UserButton } from '../UserButton/UserButton';
import classes from './NavbarSearch.module.css';
import Image from 'next/image';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { TbCheckbox } from 'react-icons/tb';
import { LuPlus as IconPlus, LuUser } from 'react-icons/lu';
import { Input } from '@/components/ui/input';
import { IoIosSearch as IconSearch } from 'react-icons/io';
import { GoArrowRight } from 'react-icons/go';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type UserSidebarProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const links = [
	{ icon: HiOutlineLightBulb, label: 'Activity', notifications: 3 },
	{ icon: TbCheckbox, label: 'Tasks', notifications: 4 },
	{ icon: LuUser, label: 'Contacts' },
];

const collections = [
	{ emoji: '👍', label: 'Sales' },
	{ emoji: '🚚', label: 'Deliveries' },
	{ emoji: '💸', label: 'Discounts' },
	{ emoji: '💰', label: 'Profits' },
	{ emoji: '✨', label: 'Reports' },
	{ emoji: '🛒', label: 'Orders' },
	{ emoji: '📅', label: 'Events' },
	{ emoji: '🙈', label: 'Debts' },
	{ emoji: '💁‍♀️', label: 'Customers' },
];

const UserButton = ({
	username,
	email,
	avatar,
	setCollapse = () => {},
}: {
	username: string;
	email: string;
	avatar: string;
	setCollapse?: (value: boolean) => void;
}) => (
	<div className={'flex justify-between items-center'}>
		<div className={'flex justify-start items-center gap-2'}>
			<div className={''}>
				<Image
					src={avatar}
					width={40}
					height={40}
					alt='User avatar'
					unoptimized
					className={'rounded-full'}
				/>
			</div>
			<div>
				<Text size='sm' className={'font-bold'}>
					{username}
				</Text>
				<Text size='xs'>{email}</Text>
			</div>
		</div>
		<div onClick={() => setCollapse(false)}>
			<GoArrowRight size={24} className={'hover:text-gray-100 cursor-pointer'} />
		</div>
	</div>
);
export default function UserSidebar({ isOpen, setIsOpen }: UserSidebarProps) {
	const mainLinks = links.map(link => (
		<div key={link.label} className={'flex justify-between items-center'}>
			<div className={classes.mainLinkInner}>
				<link.icon size={20} className={classes.mainLinkIcon} stroke={'gray'} />
				<span className={'text-sm'}>{link.label}</span>
			</div>
			{link.notifications && (
				<div
					className={
						'w-4 h-4 rounded-full bg-blue-400 text-white text-xs flex place-content-center'
					}>
					{link.notifications}
				</div>
			)}
		</div>
	));

	const collectionLinks = collections.map(collection => (
		<a
			href='#'
			onClick={event => event.preventDefault()}
			key={collection.label}
			className={classes.collectionLink}>
			<span style={{ marginRight: rem(9), fontSize: rem(16) }}>{collection.emoji}</span>{' '}
			{collection.label}
		</a>
	));

	return (
		<div className={''}>
			{/*<div className={'fixed z-[90] w-[100vw] h-[100vh] bg-gray-600/10 '}></div>*/}
			<motion.nav
				className={cn(
					'fixed z-[100] top-0 right-0 bg-[--background-hero] h-full max-w-xl w-fit flex flex-col gap-2 border-l-[1px] border-gray-800 pl-1',
				)}
				initial={{ x: '100%' }}
				animate={{ x: isOpen ? 0 : '100%', transition: { duration: 0.3 } }}>
				<div className={'px-5 py-3 h-16 border-b-[1px] border-gray-800'}>
					<UserButton
						username={'user_xlsx'}
						avatar={'https://i.pinimg.com/736x/9d/82/7e/9d827e19b4db093e0ac867cb3493a8be.jpg'}
						email={'example.com'}
						setCollapse={setIsOpen}
					/>
				</div>

				<div className={'px-2'}>
					<Input
						placeholder='Search'
						className={'bg-gray-800/50 border-0 rounded-xl w-full px-2'}
						classNames={{
							input: 'text-gray-100 h-5',
							wrapper: 'h-fit py-0',
						}}
						startIcon={
							<div
								className={
									'p-1 bg-gray-600 rounded-lg content-center my-2 mr-2 cursor-pointer hover:opacity-80 transition-all'
								}>
								<IconSearch className={'text-lg'} />
							</div>
						}
					/>
				</div>

				<div className={'w-full p-2'}>
					<div className={'flex flex-col justify-between gap-3'}>{mainLinks}</div>
				</div>

				<div className={classes.section}>
					<Group className={classes.collectionsHeader} justify='space-between'>
						<Text size='xs' fw={500} c='dimmed'>
							Collections
						</Text>
						<Tooltip label='Create collection' withArrow position='right'>
							<ActionIcon variant='default' size={18}>
								<IconPlus style={{ width: rem(12), height: rem(12) }} stroke={'1.5'} />
							</ActionIcon>
						</Tooltip>
					</Group>
					<div className={classes.collections}>{collectionLinks}</div>
				</div>
			</motion.nav>
		</div>
	);
}
