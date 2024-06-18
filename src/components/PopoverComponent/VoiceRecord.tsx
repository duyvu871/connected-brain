import React, { useEffect, useRef, useState } from 'react';
import { IoMicSharp } from 'react-icons/io5';
import { useToggle } from 'usehooks-ts';

interface VoiceRecordModalProps {
	setTextContent?: (text: string) => void;
};

type AudioState = {
	isRecording: boolean;
	audioBlob: Blob | null;
}

function VoiceRecord({ setTextContent }: VoiceRecordModalProps) {
	// const [isRecording, setIsRecording] = useState(false);
	const [audioBlob, setAudioBlob] = useState(null);
	const [currentVolume, setCurrentVolume] = useState(0);
	const [animationMic, setAnimationMic] = useState(0);

	const [isRecording, toggleRecordingState, setIsRecording] = useToggle(false);

	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);
	const animationMicRef = useRef<HTMLDivElement | null>(null);
	const animationFrameID = useRef<number | null>(null);
	useEffect(() => {

		return () => {
			if (mediaRecorderRef.current) {
				mediaRecorderRef.current.stop();
			}
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}
		};
	}, []);

	const SpeechToText = async (audioBlob: Blob) => {
		const formData = new FormData();
		formData.append('file', audioBlob);
		const response = await fetch('https://api.speechtext.ai/api/v1/speech-to-text', {
			method: 'POST',
			body: formData,
		});
		const data = await response.json();
		console.log(data);
		if (setTextContent) {
			setTextContent(data.text);
		}
	};

	const animateMic = () => {
		animationFrameID.current = window.requestAnimationFrame(animateMic);

		if (animationMicRef.current) {
			// console.log('currentVolume', currentVolume);
			animationMicRef.current.style.transform = `scale(${1 + currentVolume / 255})`;
		}
	};

	const stopAnimateMic = () => {
		if (animationFrameID.current) {
			window.cancelAnimationFrame(animationFrameID.current);
		}
	};

	const getAudioStream = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const audioTrack = stream.getAudioTracks()[0];

			// Khởi tạo AudioContext để phân tích âm thanh
			audioContextRef.current = new AudioContext();
			const source = audioContextRef.current.createMediaStreamSource(stream);

			// Tạo nút để theo dõi âm lượng
			const analyser = audioContextRef.current.createAnalyser();
			analyser.fftSize = 2048; // Chọn kích thước FFT
			source.connect(analyser);

			// Cập nhật mức âm lượng mỗi 100ms
			const intervalId = setInterval(() => {
				const dataArray = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteTimeDomainData(dataArray);
				const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
				if (animationMicRef.current) {
					// console.log('currentVolume', currentVolume);
					animationMicRef.current.style.transform = `scale(${1 + (average - 127) / 5})`;
				}
				setCurrentVolume(average); // Chuẩn hóa giá trị về [0, 1]
			}, 100);

			// Khởi tạo MediaRecorder để ghi âm
			mediaRecorderRef.current = new MediaRecorder(stream);
			mediaRecorderRef.current.ondataavailable = (event) => {
				setAudioBlob(event.data);
			};

			return () => {
				clearInterval(intervalId);
				if (mediaRecorderRef.current) {
					mediaRecorderRef.current.stop();
				}
				if (audioContextRef.current) {
					audioContextRef.current.close();
				}
			};
		} catch (error) {
			console.error('Lỗi khi lấy luồng âm thanh:', error);
		}
	};

	const handleStartRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.start();
			setIsRecording(true);
		}
	};

	const handleStopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
		}
	};

	const toggleRecording = () => {
		toggleRecordingState();
		console.log('isRecording', isRecording);
		if (isRecording) {
			handleStartRecording();
			getAudioStream();
		} else {
			stopAnimateMic();
			handleStopRecording();
		}
	};

	return (
		<div className={'flex flex-col justify-center items-center'}>
			<div
				className={'relative w-full h-20 flex justify-center items-center'}>
				<div
					className={'absolute z-[800] w-12 h-12 rounded-full translate-x-1/2 translate-y-1/2 transition-all bg-gray-600'}
					ref={animationMicRef}></div>
				<div
					className={'record-mic relative z-[801] w-10 h-10 rounded-full bg-gray-800 flex justify-center items-center cursor-pointer'}
					onClick={() => {
						// getAudioStream();
						toggleRecording();
					}}
				>
					<IoMicSharp className={'text-white'} size={24} />
				</div>
			</div>
			{/*<button onClick={handleStartRecording} disabled={isRecording} className={cn({*/}
			{/*	'text-red-500': isRecording,*/}
			{/*})}>*/}
			{/*	Bắt đầu ghi âm*/}
			{/*</button>*/}
			{/*<button onClick={handleStopRecording} disabled={!isRecording}>*/}
			{/*	Dừng ghi âm*/}
			{/*</button>*/}
			{/*<p>Mức âm lượng hiện tại: {currentVolume.toFixed(2)}</p>*/}
			{/*{audioBlob && (*/}
			{/*	<audio controls>*/}
			{/*		<source src={URL.createObjectURL(audioBlob)} type="audio/wav" />*/}
			{/*		Your browser does not support the audio element.*/}
			{/*	</audio>*/}
			{/*)}*/}
		</div>
	);
}

export default VoiceRecord;