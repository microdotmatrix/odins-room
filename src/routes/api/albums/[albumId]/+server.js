import { getMediaItems, getAlbum, getGoogleApiToken } from '$lib/api/google';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ fetch, params }) => {
	const { albumId } = params;

	const bearerToken = await getGoogleApiToken({ fetch });
	const response = await getMediaItems({ fetch, bearerToken, albumId });

	if (!response) {
		throw error(500, 'Could not load album images');
	}

	return json(response);
};
