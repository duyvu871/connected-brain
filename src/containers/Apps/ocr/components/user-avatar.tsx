import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserAvatar(): JSX.Element {
	return (
		<Avatar className={'cursor-pointer h-9 w-9'}>
			<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className={'object-contain'} />
			<AvatarFallback>VN</AvatarFallback>
		</Avatar>
	);
}