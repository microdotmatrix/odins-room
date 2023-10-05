import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ url, locals }) {
	if (!dev) {
		return { analyticsId: env.VERCEL_ANALYTICS_ID };
	}
	const currentPage = url.pathname.split('/')[1];
	const q = url.searchParams.get('q') || '';
	const { pathname } = url;

	locals.url = url.href;
	locals.currentPage = currentPage;
	locals.q = q;

	return {
		...locals,
		pathname
	};
}
