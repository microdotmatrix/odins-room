// @ts-nocheck
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';

const cache = new Map();

export const fetchAlbums = async ({ fetch, setHeaders }) => {
	const url = '/api/albums';

	if (cache.has(url)) {
		return cache.get(url);
	}

	const response = await fetch(url);
	
	if (!response) {
		throw error(500, 'Could not load albums');
	}

	const cacheControl = response.headers.cacheControl;

	if (cacheControl) {
		setHeaders({
			'Cache-Control': cacheControl
		});
	}
	
	const albums = await response.json();

	if (browser) {
		cache.set(url, albums);
	}

	return {
		albums: albums.map(
			(
				/** @type {{ title: any; coverPhotoBaseUrl: any; mediaItemsCount: any; id: any; }} */ album
			) => {
				return {
					...album,
					title: album.title,
					coverPhoto: album.coverPhotoBaseUrl,
					quantity: album.mediaItemsCount,
					id: album.id
				};
			}
		)
	};
};

export const fetchImages = async ({ fetch, setHeaders }, albumId) => {
	const url = `/api/images/${albumId}`;

	if (cache.has(url)) {
		return cache.get(url);
	}

	const response = await fetch(url);

	if (!response) {
		throw error(500, 'Could not load images');
	}

	const cacheControl = response.headers.cacheControl;

	if (cacheControl) {
		setHeaders({
			'Cache-Control': cacheControl
		});
	}

	const images = await response.json();

	if (browser) {
		cache.set(url, images);
	}

	return {
		images: images.map((image) => {
			return {
				...images,
				id: image.id,
				title: image.filename,
				src: image.baseUrl,
				width: image.mediaMetadata.width,
				height: image.mediaMetadata.height,
				createdAt: image.mediaMetadata?.creationTime,
				mimeType: image.mimeType,
				camera: image.mediaMetadata?.photo?.cameraMake
			};
		})
	};
};

export const fetchAlbumMeta = async ({ fetch }, albumId) => {
	const url = `/api/albums/${albumId}`;

	if (cache.has(url)) {
		return cache.get(url);
	}

	const response = await fetch(url);

	if (!response) {
		throw error(500, 'Could not load images');
	}

	const album = await response.json();

	if (browser) {
		cache.set(url, album);
	}

	return {
		...album,
		title: album.title,
		coverPhoto: album.coverPhotoBaseUrl,
		quantity: album.mediaItemsCount,
		id: album.id
	}
}