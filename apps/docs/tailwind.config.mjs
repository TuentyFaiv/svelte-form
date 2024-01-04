import starlight from "@astrojs/starlight-tailwind";

// Palettes
const accent = {
	// 50: "#def6ee",
	// 100: "#d3f2e8",
	200: "#c8efe2",
	300: "#a6e6d1",
	400: "#64d3ae",
	500: "#21C08B",
	600: "#1ead7d",
	700: "#199068",
	800: "#147353",
	900: "#105e44",
	950: "#0e5a3f",
};
// const accent = {
// 	// 50: "#e9dff3",
// 	// 100: "#e2d4f0",
// 	200: "#dbcaec",
// 	300: "#c5aae0",
// 	400: "#9a6ac9",
// 	500: "#6E2AB2",
// 	600: "#6326a0",
// 	700: "#532086",
// 	800: "#42196b",
// 	900: "#361557",
// 	950: "#33134f",
// };
const gray = {
	// 50: "#dedfe0",
	100: "#d3d4d6",
	200: "#c8c9cc",
	300: "#a7a9ad",
	400: "#64696f",
	500: "#222831",
	600: "#1f242c",
	700: "#1a1e25",
	800: "#14181d",
	900: "#111418",
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				accent,
				gray,
			}
		},
	},
	plugins: [
		starlight(),
	],
}
