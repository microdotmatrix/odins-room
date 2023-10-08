import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';


/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ url, locals: { getSession }}) => {
	if (!dev) {
		return { analyticsId: env.VERCEL_ANALYTICS_ID };
	}
	
	return {
		pathname: url.pathname,
		session: await getSession(),
	};
}
