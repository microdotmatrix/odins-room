// @ts-nocheck
import { error } from '@sveltejs/kit';

export const fetchAlbums = async ({ fetch }) => {
	const response = await fetch(`/api/albums`);
	if (!response) {
		throw error(500, 'Could not load albums');
	}
	const albums = await response.json();
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

export const fetchImages = async ({ fetch }, albumId) => {
	const response = await fetch(`/api/albums/${albumId}`);

	if (!response) {
		throw error(500, 'Could not load images');
	}

	const images = await response.json();
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

export const fetchImageById = async ({ fetch }, imageId) => {
	const response = await fetch(`/api/images/${imageId}`);

	if (!response) {
		throw error(500, 'Could not load image');
	}

	const image = await response.json();
	return {
		image: {
			...image,
			id: image.id,
			title: image.filename,
			src: image.baseUrl,
			width: image.mediaMetadata.width,
			height: image.mediaMetadata.height,
			createdAt: image.createdAt,
			mimeType: image.mimeType,
			camera: image.camera
		}
	};
};
