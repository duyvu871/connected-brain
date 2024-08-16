import React from 'react';
import { useAtom } from 'jotai';
import { transcriptSearch } from '@/containers/Apps/SpeechToText/states/transcript';
import { useDebouncedValue } from '@mantine/hooks';
import { SearchIcon } from '@nextui-org/shared-icons';
import { Input } from '@nextui-org/input';

interface TranscriptSearchProps {}

function TranscriptSearch({}: TranscriptSearchProps) {
	const [search, setSearch] = useAtom(transcriptSearch);
	const [debounced, cancel] = useDebouncedValue(search, 1000);
	const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	return (
		// <Box>
		<Input
			autoComplete={'off'}
			autoCorrect={'off'}
			spellCheck={'false'}
			onChange={updateSearch}
			placeholder='Type to search...'
			isClearable
			radius='lg'
			size={'md'}
			className=' max-w-sm '
			classNames={{
				input: 'bg-zinc-700 text-white/90 dark:bg-zinc-700 dark:text-white/90 rounded-full',
				inputWrapper:
					'rounded-2xl bg-zinc-700 dark:bg-zinc-700 group-data-[focus=true]:bg-zinc-700 dark:group-data-[focus=true]:bg-zinc-700',
			}}
			startContent={
				<SearchIcon className='text-black/50 mb-0.5 mx-1 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 ' />
			}
		/>
		// </Box>
	);
}

export default TranscriptSearch;
