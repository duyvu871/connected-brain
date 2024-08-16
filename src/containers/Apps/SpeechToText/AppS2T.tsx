'use client';
import React, { useLayoutEffect } from 'react';
import { Center, Flex } from '@mantine/core';
import TranscriptResultProgress from '@/containers/Apps/SpeechToText/components/Analytics/Progress';
import Duration from '@/containers/Apps/SpeechToText/components/Transcript/Transcript_spec/Duration';
import DynamicContentLoaded from '@/containers/Apps/SpeechToText/components/DynamicContentLoaded';
import { useAtom } from 'jotai';
import { audioFile, isSectionLoaded, sectionId } from '@/containers/Apps/SpeechToText/states/jotai';
import StarterScreen from '@/containers/Apps/SpeechToText/starter_screen';
import TranscriptSearch from '@/containers/Apps/SpeechToText/components/Transcript/transcript_search';
import TranscriptFeatureTab from '@/containers/Apps/SpeechToText/components/Transcript/Transcript_feature_tab';
import TranscriptWrapper from '@/containers/Apps/SpeechToText/components/Transcript/transcript_wrapper';
import { useTranscript } from '@/containers/Apps/SpeechToText/hooks/useSpeechToText';
import { transcript } from '@/containers/Apps/SpeechToText/states/transcript';
import TranscriptFeature from '@/containers/Apps/SpeechToText/components/Transcript/Transcript_feature';

interface AppS2TProps {}

function AppS2T({}: AppS2TProps) {
	const [isSectionLoad, _] = useAtom(isSectionLoaded);
	const [currentSection] = useAtom(sectionId);
	const [transcript_data, setTranscriptData] = useAtom(transcript);
	const [getC, setCurrentFile] = useAtom(audioFile);
	const { getTranscript, getTranscriptList } = useTranscript();

	useLayoutEffect(() => {
		if (currentSection) {
			(async () => {
				await getTranscriptList();
				// get transcript data if transcript data not have data
				if (!transcript_data) {
					const transcriptData = await getTranscript(currentSection);
					setTranscriptData(transcriptData);
					setCurrentFile({
						url: `${transcriptData.cloudPath}`,
						name: transcriptData.originName,
					});
					return;
				}
				// check if current section has local data
				if (!transcript_data.auditPath.includes(currentSection)) {
					const transcriptData = await getTranscript(currentSection);
					setTranscriptData(transcriptData);
					setCurrentFile({
						url: `${transcriptData.cloudPath}`,
						name: transcriptData.originName,
					});
					return;
				}
			})();
		}
	}, [currentSection]);
	return (
		<DynamicContentLoaded>
			<Center p={'md'} h={'100%'} className={'bg-zinc-900 rounded-[2rem]'}>
				<Flex
					direction={'row'}
					justify={'center'}
					align={'center'}
					h={'100%'}
					w={'100%'}
					className={'gap-5'}>
					<Flex
						direction={'column'}
						h={'100%'}
						justify={'center'}
						align={'center'}
						className={'rounded-[2rem] gap-5 flex-grow-[7]'}>
						{isSectionLoad ? (
							<Flex
								direction={'column'}
								justify={'center'}
								align={'center'}
								className={'flex-grow w-full h-full gap-5'}>
								<Flex
									className={'gap-5 h-fit w-full'}
									direction={'row'}
									justify={'center'}
									align={'center'}>
									<Center className={'flex-grow-[3] h-32 bg-zinc-800 rounded-2xl'}>
										<TranscriptResultProgress />
									</Center>
									<Center className={' flex-grow-[3] h-32 bg-zinc-800 rounded-2xl'}>
										<Duration />
									</Center>
									<Center className={' flex-grow-[3] h-32 bg-zinc-800 rounded-2xl'}>
										<Duration />
									</Center>
								</Flex>
								<Flex
									className={'gap-5 flex-grow w-full h-full'}
									direction={'row'}
									justify={'center'}
									align={'center'}>
									<Flex className={'w-full h-full bg-zinc-800 rounded-2xl '}>
										<TranscriptWrapper />
									</Flex>
								</Flex>
							</Flex>
						) : (
							<StarterScreen />
						)}
					</Flex>
					{isSectionLoad && (
						<Center w={'1/2'} h={'100%'} className={'max-w-md min-w-96 flex-grow-[3]'}>
							<Flex
								direction={'column'}
								justify={'start'}
								align={'center'}
								className={'flex-grow h-full bg-zinc-800 rounded-2xl p-5 gap-5 overflow-y-auto'}>
								<TranscriptSearch />
								<TranscriptFeatureTab />
								<TranscriptFeature className={'overflow-y-auto w-full h-full'} />
							</Flex>
						</Center>
					)}
				</Flex>
			</Center>
		</DynamicContentLoaded>
	);
}

export default AppS2T;
