import { error, json } from '@sveltejs/kit';
import { getGoogleApiToken, getAllMedia } from '$lib/api/google';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ fetch }) => {
	const bearerToken = await getGoogleApiToken({ fetch });
	if (!bearerToken) {
		throw error(500, 'Could not get bearer token');
	}

	const response = await getAllMedia({ fetch, bearerToken });

	if (!response) {
		throw error(500, 'Could not load images');
	}

	return json(response);
};
