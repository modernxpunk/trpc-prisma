/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				sm: "2rem",
				lg: "4rem",
				xl: "5rem",
				"2xl": "6rem",
			},
		},
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		keyframes: {
			appearence: {
				"0%": { transform: "scale(0.8)", opacity: 0 },
				"100%": { transform: "scale(1)", opacity: 1 },
			},
		},
		animation: {
			appear: "appearence 0.2s linear",
		},
		extend: {
			fontFamily: {
				sans: ["var(--font-roboto)", ...fontFamily.sans],
				title: ["var(--font-montserrat)", ...fontFamily.serif],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
