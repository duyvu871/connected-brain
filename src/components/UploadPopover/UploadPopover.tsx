import React, { useEffect, useState } from 'react';
import { storage } from '@/firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { CircularProgress, Image } from '@nextui-org/react';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { useChatbot } from '@/contexts/ChatbotContext';
import useUID from '@/hooks/useUID';
import { useAuth } from '@/hooks/useAuth';

interface UploadPopoverProps {
}

function UploadPopover({}: UploadPopoverProps) {
	const { setContentMedia } = useChatbot();
	const [generateUID] = useUID();
	const { user } = useAuth();
	const { error, success, info } = useToast();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [processPercent, setProcessPercent] = useState<number>(0);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [isShowImage, setIsShowImage] = useState<boolean>(false);
	const [preview, setPreview] = useState<string | undefined>(undefined);
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined);
			return;
		}
		setSelectedFile(e.target.files[0]);
	};

	const updateOrCreateProduct = () => {
		if (!selectedFile) {
			return error('Vui lòng chọn ảnh');
		}
		const filename = generateUID();
		const storageRef = ref(storage, `images/${user._id}/${filename}`);
		const uploadTask = uploadBytesResumable(storageRef, selectedFile);
		uploadTask.on(
			'state_changed',
			snapshot => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProcessPercent(progress);
				console.log(processPercent);
				setIsUploading(true);
			},
			error => {
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(async res => {
					if (!res) return;
					setIsUploading(false);
					setContentMedia((prevContent) => [...prevContent, res]);
				});
			},
		);
	};

	useEffect(() => {
		if (!selectedFile) {
			setIsShowImage(false);
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);
		setIsShowImage(true);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	return (
		<div className={'flex flex-col justify-center items-center gap-4 relative p-4'}>
			<div
				className={cn(
					'relative bg-gray-200 max-h-72 overflow-hidden rounded-xl flex justify-center items-center cursor-pointer',
					isShowImage ? '' : 'hidden',
				)}
				onClick={() => {
				}}>
				<Image
					src={preview}
					width={400}
					height={400}
					alt={'preview'}
					className={'object-cover'}
					// classNames={{
					// 	wrapper: 'flex justify-center items-center',
					// }}
				/>
				<div
					className={cn(
						'absolute transition-all  h-full w-full flex justify-center items-center rounded-xl',
						isUploading ? 'z-[300] backdrop-filter ' : ' invisible',
					)}
					style={{
						backdropFilter: 'blur(5px)',
					}}>
					<CircularProgress
						aria-label="Loading..."
						size="lg"
						value={Number(processPercent.toFixed(0))}
						color="success"
						classNames={{
							value: 'text-gray-900',
						}}
						showValueLabel={true}
					/>
					{/*<CircularProgress color="success" aria-label="Loading..." />*/}
				</div>
			</div>
			<div className="flex flex-col items-center justify-center w-full">
				<div className="flex items-center justify-center w-full">
					<label htmlFor="dropzone-file"
								 className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<svg className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true"
									 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
											d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
							</svg>
							<p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
								drag and drop</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
						</div>
						<input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} accept={'image/*'} />
					</label>
				</div>
			</div>

			<button
				className={
					'flex justify-center items-center gap-1 bg-gray-200 text-gray-900 rounded-md px-4 py-2'
				}
				onClick={updateOrCreateProduct}
				disabled={isUploading}>
				{/*{isUploading ? <Spinner color={'white'} /> : ''}*/}
				Upload
			</button>
		</div>
	);
}

export default UploadPopover;
