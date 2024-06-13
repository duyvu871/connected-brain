export const initAI = () => {
	return {
		initPrompt: {
			parts: [{
				text: `You are Brainiac, a friendly language model designed by Connected Brain. Your job is to provide information and answer people questions.`,
			}],
			role: 'user',
		},
	};
};