
import { GOOGLE_BEARER_TOKEN } from '$env/static/private';
import { db } from '$lib/server/db';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';

export const handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: db.url,
		supabaseKey: db.key,
		event
	})

	/**
	 * Start Supabase authentication session and assign it to
	 * event locals so we can access it in our routes
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession()
		return session
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range'
		}
	})
}

/** @type {import("@sveltejs/kit").HandleFetch} */
export async function handleFetch({ request, fetch }) {
	/**
	 * To make it easier to authenticate requests to the Google Photos API
	 * instead of passing the bearer token with every request, we can use SvelteKit's
	 * handleFetch hook to add the token to any fetch request made to the API endpoint url
	 */
	const bearerToken = GOOGLE_BEARER_TOKEN;
	
	if (request.url.startsWith('https://photoslibrary.googleapis.com/')) {
		request.headers.set('Authorization', bearerToken)
		console.log('token fetched', Date.now());
	}
	
	return fetch(request);
}