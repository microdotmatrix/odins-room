import { getAlbums, getGoogleApiToken } from '$lib/api/google';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ fetch }) => {
	const bearerToken = await getGoogleApiToken({ fetch });
	const response = await getAlbums({ fetch, bearerToken });
	if (!response) {
		throw error(404, 'Albums not found');
	}
	return json(response);
};
