import { getGoogleApiToken } from '$lib/api/google';
import { db } from '$lib/server/db';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';

export const handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: db.url,
		supabaseKey: db.key,
		event
	})

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession()
		return session
	}

	return resolve(event, {
		/**
		 * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
		 *
		 * https://github.com/sveltejs/kit/issues/8061
		 */
		filterSerializedResponseHeaders(name) {
			return name === 'content-range'
		}
	})
}

/** @type {import("@sveltejs/kit").HandleFetch} */
export async function handleFetch({ request, fetch }) {
	const bearerToken = await getGoogleApiToken({ fetch });
	
	if (request.url.startsWith('https://photoslibrary.googleapis.com/')) {
		request.headers.set('Authorization', bearerToken)
		console.log('token fetched', Date.now());
		return fetch(request);
	}

	return fetch(request);
}