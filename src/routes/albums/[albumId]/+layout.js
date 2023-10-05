import { fetchImages } from '$lib/api/query';

/** @type {import('./$types').LayoutLoad} */
export const load = async ({ fetch, params }) => {
	const { albumId } = params;

	return {
		images: await fetchImages({ fetch }, albumId)
	};
};
