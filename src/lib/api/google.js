// @ts-nocheck
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REFRESH_TOKEN
} from '$env/static/private';

export const getGoogleApiToken = async ({ fetch }) => {
	const tokenResult = await fetch('https://www.googleapis.com/oauth2/v4/token', {
		method: 'POST',
		body: JSON.stringify({
			client_id: GOOGLE_CLIENT_ID,
			client_secret: GOOGLE_CLIENT_SECRET,
			refresh_token: GOOGLE_REFRESH_TOKEN,
			grant_type: 'refresh_token'
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const tokenData = await tokenResult.json();
	console.log(tokenData);
	
	return `Bearer ${tokenData['access_token']}`;
};

export const getGoogleAlbums = async ({ fetch }, pageToken) => {
	const result = await fetch(`https://photoslibrary.googleapis.com/v1/albums/?pageSize=50&pageToken=${pageToken}`);
	return result.json();
};

export const getGoogleAlbum = async ({ fetch }, albumId) => {
	const result = await fetch(`https://photoslibrary.googleapis.com/v1/albums/${albumId}`);
	return result.json();
};

export const getGoogleMediaItems = async ({ fetch }, pageSize, pageToken) => {
	const result = await fetch(
		`https://photoslibrary.googleapis.com/v1/mediaItems/?pageSize=${pageSize}&pageToken=${pageToken}`);
	return result.json();
};

export const getGoogleMediaItem = async ({ fetch }, mediaItemId) => {
	const result = await fetch(`https://photoslibrary.googleapis.com/v1/mediaItems/${mediaItemId}`);
	return result.json();
};

export const getGoogleMediaItemsAlbum = async ({ fetch }, albumId, pageToken) => {
	const result = await fetch(`https://photoslibrary.googleapis.com/v1/mediaItems:search`, {
		method: 'POST',
		body: JSON.stringify({
			albumId,
			pageToken
		})
	});
	return result.json();
};

export const getAlbum = async ({ fetch, albumId }) => {
	const album = await getGoogleAlbum({ fetch }, albumId);

	if (!album) {
		throw new Error(500, 'Unable to get album');
	}

	return album;
};

export const getAlbums = async ({ fetch }) => {
	let nextPageToken = '';
	let albums = [];

	do {
		const data = await getGoogleAlbums({ fetch }, nextPageToken);
		if (data.albums) {
			albums = [...albums, ...data.albums];
		}
		nextPageToken = data.nextPageToken;
	} while (nextPageToken);

	if (!albums) {
		throw new Error(500, 'Unable to get albums');
	}

	return albums;
};

export const getMediaItems = async ({ fetch, albumId }) => {
	let mediaItems = [];
	let nextPageToken = '';

	do {
		const data = await getGoogleMediaItemsAlbum({ fetch }, albumId, nextPageToken);

		if (data.mediaItems) {
			mediaItems = [...mediaItems, ...data.mediaItems];
		}

		nextPageToken = data.nextPageToken;
	} while (nextPageToken);

	if (!mediaItems) {
		throw new Error(500, 'Unable to get media items');
	}

	return mediaItems;
};

export const getAllMedia = async ({ fetch }) => {
	let mediaItems = [];
	let nextPageToken = '';

	do {
		const data = await getGoogleMediaItems({ fetch }, nextPageToken);

		if (data.mediaItems) {
			mediaItems = [...mediaItems, ...data.mediaItems];
		}

		nextPageToken = data.nextPageToken;
	} while (nextPageToken);

	if (!mediaItems) {
		throw new Error(500, 'Unable to get media items');
	}

	return mediaItems;
};

export const getImage = async ({ fetch, photoId }) => {
	const image = await getGoogleMediaItem({ fetch }, photoId);

	if (!image) {
		throw new Error(500, 'Unable to get image');
	}

	return image;
};
