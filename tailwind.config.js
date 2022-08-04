module.exports = {
	content: ['**/*.html'],
	theme: {
		fontFamily: {
			header: ['Impact', 'sans-serif'],
		},
		fontSize: {
			// The font-scaling system uses Modular Scale
			// Base is 16px with 1.125x scaling
			// Reference: https://www.modularscale.com/?16&px&1.125
			'-ms-1': '14px',
			'ms-0': '16px',
			'ms-1': '18px',
		},
	},
};
