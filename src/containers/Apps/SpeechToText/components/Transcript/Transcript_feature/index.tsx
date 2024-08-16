// import React from 'react';
// import { useAtom } from 'jotai/index';
// import { transcriptActiveFeature } from '@/containers/Apps/SpeechToText/states/transcript';

// const FeatureComponents = {
// 	Transcript: React.lazy(() => import('./transcript_list')),
// 	Notes: React.lazy(() => import('./transcript_note')),
// 	Speaker: React.lazy(() => import('./transcript_speaker')),
// };

// function TranscriptFeature() {
// 	const [selected, setSelected] = useAtom(transcriptActiveFeature);
// 	const SelectedComponent = FeatureComponents[selected];
// 	return (
// 		<React.Suspense fallback={<div></div>}>
// 			{selected && FeatureComponents[selected] && <SelectedComponent />}
// 		</React.Suspense>
// 	);
// }

// export default TranscriptFeature;
import React from 'react';
import { useAtom } from 'jotai';
import { transcriptActiveFeature } from '@/containers/Apps/SpeechToText/states/transcript';

// Define the components that might be selected dynamically
const FeatureComponents = {
	Transcript: React.lazy(() => import('./transcript_list')),
	Notes: React.lazy(() => import('./transcript_note')),
	Speaker: React.lazy(() => import('./transcript_speaker')),
};

function TranscriptFeature({ className }: { className?: string }) {
	const [selected] = useAtom(transcriptActiveFeature);
	const SelectedComponent = FeatureComponents[selected];

	return (
		<React.Suspense fallback={<div className={className}></div>}>
			{selected && SelectedComponent && (
				<div className={className}>
					<SelectedComponent />
				</div>
			)}
		</React.Suspense>
	);
}

export default TranscriptFeature;
