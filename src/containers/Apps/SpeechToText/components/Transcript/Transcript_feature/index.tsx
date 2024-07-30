import React from 'react';
import { useAtom } from 'jotai/index';
import { transcriptActiveFeature } from '@/containers/Apps/SpeechToText/states/transcript';

const FeatureComponents = {
	Transcript: React.lazy(() => import('./transcript_list')),
	Notes: React.lazy(() => import('./transcript_note')),
	Speaker: React.lazy(() => import('./transcript_speaker')),
};

function TranscriptFeature() {
	const [selected, setSelected] = useAtom(transcriptActiveFeature);
	const SelectedComponent = FeatureComponents[selected];
	return (
		<React.Suspense fallback={<div></div>}>
			{selected && FeatureComponents[selected] && <SelectedComponent />}
		</React.Suspense>
	);
}

export default TranscriptFeature;