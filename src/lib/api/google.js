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

export const getGoogleAlbums = async ({ fetch }, bearerToken, pageToken) => {
	const result = await fetch(
		`https://photoslibrary.googleapis.com/v1/albums/?pageSize=50&pageToken=${pageToken}`,
		{
			method: 'GET',
			headers: {
				Authorization: bearerToken
			}
		}
	);
	return result.json();
};

export const getGoogleAlbum = async ({ fetch }, bearerToken, albumId) => {
	const result = await fetch(`https://photoslibrary.googleapis.com/v1/albums/${albumId}`, {
		method: 'GET',
		headers: {
			Authorization: bearerToken
		}
	});
	return result.json();
};

export const getGoogleMediaItems = async ({ fetch }, bearerToken, pageSize, pageToken) => {
	const result = await fetch(
		`https://photoslibrary.googleapis.com/v1/mediaItems/?pageSize=${pageSize}&pageToken=${pageToken}`,
		{
			method: 'GET',
			headers: {
				Authorization: bearerToken
			}
		}
	);
	return result.json();
};

export const getGoogleMediaItem = async ({ fetch }, bearerToken, mediaItemId) => {
	const result = await fetch(`https://photoslibrary.googleapis.com/v1/mediaItems/${mediaItemId}`, {
		method: 'GET',
		headers: {
			Authorization: bearerToken
		}
	});
	return result.json();
};

export const getGoogleMediaItemsAlbum = async ({ fetch }, bearerToken, albumId, pageToken) => {
	const result = await fetch(`https://photoslibrary.googleapis.com/v1/mediaItems:search`, {
		method: 'POST',
		body: JSON.stringify({
			albumId,
			pageToken
		}),
		headers: {
			Authorization: bearerToken
		}
	});
	return result.json();
};

export const getAlbum = async ({ fetch, bearerToken, albumId }) => {
	const album = await getGoogleAlbum({ fetch }, bearerToken, albumId);

	if (!album) {
		throw new Error(500, 'Unable to get album');
	}

	return album;
};

export const getAlbums = async ({ fetch, bearerToken }) => {
	let nextPageToken = '';
	let albums = [];

	do {
		const data = await getGoogleAlbums({ fetch }, bearerToken, nextPageToken);
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

export const getMediaItems = async ({ fetch, bearerToken, albumId }) => {
	let mediaItems = [];
	let nextPageToken = '';

	do {
		const data = await getGoogleMediaItemsAlbum({ fetch }, bearerToken, albumId, nextPageToken);

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

export const getAllMedia = async ({ fetch, bearerToken }) => {
	let mediaItems = [];
	let nextPageToken = '';

	do {
		const data = await getGoogleMediaItems({ fetch }, bearerToken, nextPageToken);

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

export const getImage = async ({ fetch, bearerToken, photoId }) => {
	const image = await getGoogleMediaItem({ fetch }, bearerToken, photoId);

	if (!image) {
		throw new Error(500, 'Unable to get image');
	}

	return image;
};
