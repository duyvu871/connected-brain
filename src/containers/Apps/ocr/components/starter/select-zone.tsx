import React from 'react';
import { useAtom } from 'jotai/index';
import { starterAssetsPreUpload } from '@/containers/Apps/ocr/states/starter';
import { useToast } from '@/hooks/useToast';

const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'application/pdf'];

export default function SelectZone(): React.ReactNode {
	const { error } = useToast();
	const [file, setFile] = useAtom(starterAssetsPreUpload);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const fileExtension = file.name.split('.').pop()?.toLowerCase();
			const isValidFileType = allowedFileTypes.includes(file.type);
			if (isValidFileType) {
				setFile(file);
			} else {
				error('Invalid file type. Please select a correct file.');
				e.target.value = ''; // Clear the input
			}
		} else {
			setFile(null);
		}
	};

	return (
		<div className="flex items-center justify-center w-full">
			<label htmlFor="dropzone-file"
						 className="flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-zinc-700 bg-zinc-800 group transition-all">
				<div className="flex items-center justify-center gap-1 px-2 py-1 h-10">
					<svg className="w-5 h-5 group-hover:text-zinc-100 transition-all text-gray-500 dark:text-gray-400"
							 aria-hidden="true"
							 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
									d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
					</svg>
					<p className={'group-hover:text-zinc-100 transition-all '}>Image</p>
				</div>
				<input
					id="dropzone-file"
					type="file"
					className="hidden"
					accept=".png, .jpeg, .jpg, .gif, .pdf, image/*, application/pdf"
					onChange={handleFileChange}
				/>
			</label>
		</div>
	);
}