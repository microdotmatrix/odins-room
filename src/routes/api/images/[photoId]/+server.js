import { error, json } from '@sveltejs/kit';
import { getGoogleApiToken, getImage } from '$lib/api/google';

/** @type {import('./$types').RequestHandler} */

export const GET = async ({ fetch, params }) => {
	const bearerToken = await getGoogleApiToken({ fetch });
	if (!bearerToken) {
		throw error(500, 'Invalid or undefined bearer token');
	}

	const { photoId } = params;
	const response = await getImage({ fetch, bearerToken, photoId });

	if (!response) {
		throw error(500, 'Could not load images');
	}

	return json(response);
};
