const APIs = {
	signIn: '/api/auth/sign-in',
	signUp: '/api/v1/auth/sign-up',
	chatbot: {
		createSection: '/api/v1/feature/chatbot/create-new-section',
		updateSection: '/api/v1/feature/chatbot/update-section',
	},
	speechToText: {
		endpoint: 'http://14.225.218.92:3001',
		uploadAudio: '/api/v1/feature/s2t/upload',
		getTranscript: '/api/v1/feature/s2t/transcript/get',
		getTranscriptList: '/api/v1/feature/s2t/transcript/list',
	},
};

const routeList = {
	features: '/features',
	home: '/',
	login: '/auth/method?type=login',
	register: '/auth/method?type=register',
	profile: '/profile',
	editProfile: '/profile/edit',
	// Features routes
	OCR: '/features/ocr',
	textToSpeech: '/features/text-to-speech',
	realtime: '/features/realtime',
	// Pricing routes
	pricing: '/pricing',
	about: '/about',
	contact: '/contact',
	terms: '/terms',
	privacy: '/privacy',
	cookies: '/cookies',
};

export { APIs, routeList };