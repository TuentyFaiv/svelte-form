import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	package: {
		emitTypes: true
	},
	kit: {
		adapter: adapter(),
		alias: {
			"@stores": "src/logic/stores/index.ts",
			"@typing/*": "src/logic/typing/*",
			"@schemas/*": "src/logic/schemas/*",
			"@utils/*": "src/logic/utils/*",
			"@components": "src/ui/components/index.ts",
			"@containers": "src/ui/containers/index.ts",
		}
	}
};

export default config;
