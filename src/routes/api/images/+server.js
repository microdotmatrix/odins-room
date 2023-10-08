import { error, json } from '@sveltejs/kit';
import { getAllMedia } from '$lib/api/google';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ fetch }) => {
	const response = await getAllMedia({ fetch });

	if (!response) {
		throw error(500, 'Could not load images');
	}

	return json(response);
};
