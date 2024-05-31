import React from 'react';
import { Icons } from '@/components/icons';
import { LuClipboardList } from 'react-icons/lu';
import { useChatbot } from '@/contexts/ChatbotContext';
import { cn } from '@/lib/utils';

interface LaunchScreenProps {

};

const LaunchOption = [
	{
		title: 'Chủ đề đáng chú ý',
		icon: <LuClipboardList className={'text-white w-6 h-6'} />,
		prompt: 'Chủ đề đáng chú ý',
	},
	{
		title: 'Chủ đề đáng chú ý',
		icon: <LuClipboardList className={'text-white w-6 h-6'} />,
		prompt: 'Chủ đề đáng chú ý',
	},
	{
		title: 'Chủ đề đáng chú ý',
		icon: <LuClipboardList className={'text-white w-6 h-6'} />,
		prompt: 'Chủ đề đáng chú ý',
	},
	{
		title: 'Chủ đề đáng chú ý',
		icon: <LuClipboardList className={'text-white w-6 h-6'} />,
		prompt: 'Chủ đề đáng chú ý',
	},
];

function LaunchScreen({}: LaunchScreenProps) {
	const { setPromptText } = useChatbot();
	const handleSendMessage = (message: string) => {
		return () => setPromptText(message);
	};
	return (
		<div className={'w-full h-full flex justify-center items-center'}>
			<div className={'flex flex-col justify-center items-center gap-5'}>
				<div className={'w-full flex justify-center items-center my-10'}>
					<Icons.logo className={'w-28 h-28 text-blue-400 fill-blue-400'} />
				</div>
				<div className={'flex justify-center items-center text-3xl my-5'}>
					<span>Xin chào👋! Tôi có thể giúp gì cho bạn?</span>
				</div>
				<div className={'w-full flex justify-center items-center mx-auto'}>
					<div className={'flex gap-3 max-w-3xl flex-wrap'}>
						{LaunchOption.map((option, index) => (
							<div key={index}
									 className={cn(
										 'flex flex-col justify-between items-center gap-2 max-w-xs h-32 border border-gray-800 rounded-xl p-2 bg-gray-900',
										 'hover:bg-gray-800 transition-all duration-300 cursor-pointer',
									 )}
									 onClick={handleSendMessage(option.prompt)}
							>
								<div className={'text-white p-2'}>
									<span>{option.title}</span>
								</div>
								<div className={'h-fit w-full'}>{option.icon}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default LaunchScreen;