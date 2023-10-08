import { fetchImages, fetchAlbumMeta } from '$lib/api/query';

/** @type {import('./$types').LayoutLoad} */
export const load = async ({ fetch, params, setHeaders }) => {
	const { albumId } = params;

	return {
		images: await fetchImages({ fetch, setHeaders }, albumId),
		meta: await fetchAlbumMeta({ fetch }, albumId),
		albumId: params.albumId
	};
};
