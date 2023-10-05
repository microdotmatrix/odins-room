/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		container: {
			center: true,
			padding: {
				default: '0',
				lg: 'var(--size-fluid-1)',
				'2xl': 'var(--size-fluid-3)'
			},
			screens: {
				'2xl': '1440px',
				'3xl': '1600px',
				'4xl': '1920px'
			}
		},
		extend: {}
	},
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "dracula", "business"],
    darkTheme: "dark",
  }
};

module.exports = config;
