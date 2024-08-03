import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button, Textarea } from '@nextui-org/react';
import { IoIosSend } from 'react-icons/io';

export default function DialogFeedback(): JSX.Element {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'bordered'}>Feedback</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-700 rounded-lg w-[calc(100%-40px)]">
				<DialogHeader>
					<DialogTitle>Send we your feedback</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Textarea
						spellCheck={'false'}
						autoComplete={'off'}
						autoCorrect={'off'}
						size={'lg'}
						placeholder="Your feedback"
						height={120}
						classNames={{
							input: 'h-[120px_!important] group-data-[has-value=true]:text-zinc-100',
							inputWrapper: 'bg-zinc-900 border-zinc-700 group[data-focus=true] group-data-[focus=true]:bg-zinc-800 group-data-[focus=true]:border-zinc-700 group-data-[hover=true]:bg-zinc-800 group-data-[hover=true]:border-zinc-700',
						}} />
				</div>
				<DialogFooter>
					<Button
						type="submit"
						endContent={<IoIosSend size={22} />}
						className={'w-full text-medium'}
					>Send</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}