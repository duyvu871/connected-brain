module.exports = {
	apps: [{
		name: 'app1',
		script: 'PORT=3000&&npx next start',
		watch: '.',
		env_production: {
			NODE_ENV: 'production',
		},
	}],
};