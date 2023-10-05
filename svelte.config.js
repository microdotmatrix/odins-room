import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter({
      runtime: 'nodejs18.x',
    }),
		alias: {
			$components: 'src/components',
			$lib: 'src/lib',
			$routes: 'src/routes',
			$styles: 'src/styles',
			$utils: 'src/utils',
		}
	}
};

export default config;
