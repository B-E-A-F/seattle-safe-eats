import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: ['black']
	},
	theme: {
		extend: {}
	},
	plugins: [daisyui]
};
