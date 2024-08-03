import { Card, CardContent } from '@/components/ui/card';
import { Box } from '@mantine/core';
import { Button, Chip, Select, Selection, SelectItem } from '@nextui-org/react';
import { FC, useState } from 'react';
import SelectZone from '@/containers/Apps/ocr/components/starter/select-zone';
import { IoArrowForward } from 'react-icons/io5';
import DocPreUpload from '@/containers/Apps/ocr/components/starter/doc-pre-upload';

const languages = [
	{ key: 'en', textValue: 'English' },
	{ key: 'vi', textValue: 'Vietnamese' },
	{ key: 'ja', textValue: 'Japanese' },
	{ key: 'ko', textValue: 'Korean' },
	{ key: 'zh', textValue: 'Chinese' },
];

export type LanguageSelectProps = {
	label: string;
	defaultSelectedKeys?: string[];
	languages: { key: string; textValue: string }[];
	selectedKeys: Selection;
	onSelectionChange: (selectedKeys: Selection) => void;
};

export const LanguageSelect: FC<LanguageSelectProps> = (props) => {
	return (
		<Select
			label={props.label}
			defaultSelectedKeys={props.defaultSelectedKeys}
			labelPlacement={'outside-left'}
			radius={'lg'}
			className="max-w-md w-full dark"
			size={'sm'}
			selectedKeys={props.selectedKeys}
			onSelectionChange={props.onSelectionChange}
			classNames={{
				base: 'flex items-center',
				popoverContent: 'bg-gray-950/80 backdrop-blur',
				innerWrapper: 'py-1.5',
				mainWrapper: 'w-[150px]',
				// label: 'whitespace-nowrap text-white',
				label: ' whitespace-nowrap text-sm text-zinc-900',
				selectorIcon: 'relative',
			}}
			renderValue={(items) => {
				console.log('items', items);
				return (
					<div className={'flex flex-wrap gap-1'}>
						{items.map((item) => (
							<Chip key={`chip-lang-${item.key}`} className={'h-6'}>
								{item.textValue}
							</Chip>
						))}
					</div>
				);
			}}
		>
			{props.languages.map((lang) => (
				<SelectItem key={`${lang.key}`} className={'text-white'}>
					{lang.textValue}
				</SelectItem>
			))}
		</Select>
	);
};

export default function UploadCard(): JSX.Element {
	const [selectedSourceLang, setSelectedSourceLang] = useState<Selection>(new Set<string>(['en']));
	const [selectedOcrLang, setSelectedOcrLang] = useState<Selection>(new Set<string>(['en']));
	return (
		<Card className="bg-zinc-50 select-none py-5 rounded-2xl mx-5">
			<CardContent className={'flex flex-col gap-4 pb-0'}>
				<Box className={'flex flex-col sm:flex-row justify-center items-start gap-5'}>
					<Box className={'flex flex-col gap-4'}>
						<Box className={'flex gap-1 justify-center items-center'}>
							<LanguageSelect
								label="Source language"
								defaultSelectedKeys={['en']}
								languages={languages}
								selectedKeys={selectedSourceLang}
								onSelectionChange={setSelectedSourceLang} />
						</Box>

					</Box>
					<Box className={'flex flex-col gap-2'}>
						<Box className={'flex gap-1 justify-center items-center'}>
							<LanguageSelect
								label="OCR result"
								defaultSelectedKeys={['en']}
								languages={languages}
								selectedKeys={selectedOcrLang}
								onSelectionChange={setSelectedOcrLang} />
						</Box>
					</Box>
				</Box>
				<Box>
					<DocPreUpload />
				</Box>
				<Box className={'w-full flex justify-between items-center gap-5'}>
					<Box>
						<SelectZone />
					</Box>
					<Button
						className={'w-10 h-10 px-0 min-w-fit bg-transparent hover:bg-zinc-800 text-zinc-900 hover:text-zinc-100 transition-all'}>
						<IoArrowForward size={26} />
					</Button>
				</Box>
			</CardContent>
		</Card>
	);
}