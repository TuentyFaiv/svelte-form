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
			"@components": "src/lib/ui/components/index.ts",
			"@stores": "src/lib/logic/stores/index.ts",
			"@typing/*": "src/lib/logic/typing/*",
			"@utils/*": "src/lib/logic/utils/*",
			// example code
			"@containers": "src/ui/containers/index.ts",
			"@schemas/*": "src/logic/schemas/*"
		}
	}
};

export default config;
