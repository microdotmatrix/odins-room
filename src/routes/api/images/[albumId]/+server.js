import { getMediaItems } from '$lib/api/google';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ fetch, params }) => {
	const { albumId } = params;

	const response = await getMediaItems({ fetch, albumId });

	if (!response) {
		throw error(500, 'Could not load album images');
	}

	return json(response);
};
