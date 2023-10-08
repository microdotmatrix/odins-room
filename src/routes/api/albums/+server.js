import { getAlbums } from '$lib/api/google';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ fetch }) => {
	const response = await getAlbums({ fetch });
	if (!response) {
		throw error(404, 'Albums not found');
	}
	return json(response);
};
