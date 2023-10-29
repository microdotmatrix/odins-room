// @ts-nocheck
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
} from '$env/static/private';

/**
 * Function for fetching a bearer token from Google's OAuth API 
 * to authenticate requests scoped to the Google Photos API endpoints 
 * we will be using to fetch album and image data.
 */
export const getGoogleApiToken = async ({ fetch }) => {
	const tokenResult = await fetch('https://www.googleapis.com/oauth2/v4/token', {
		method: 'POST',
		body: JSON.stringify({
			client_id: GOOGLE_CLIENT_ID,
			client_secret: GOOGLE_CLIENT_SECRET,
			refresh_token: '1//04K20hX9VdsfoCgYIARAAGAQSNwF-L9IrUzrXx9uh-cdkCrIl3Q6Wx-0fgiAwIUDGN--uAB96FNFR3ujNiByzKMoamscl-G4J6JY',
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

/**
 * Function for fetching album data from the Google Photos API
 */
export const getGoogleAlbums = async ({ fetch }, pageToken) => {
	const result = await fetch(`https://photoslibrary.googleapis.com/v1/albums/?pageSize=50&pageToken=${pageToken}`);
	return result.json();
};

/**
 * Function for fetching album data for a specific album using the album ID.
 */
export const getGoogleAlbum = async ({ fetch }, albumId) => {
	const result = await fetch(`https://photoslibrary.googleapis.com/v1/albums/${albumId}`);
	return result.json();
};

/**
 * Function for fetching all photos from the Google Photos API.
 */
export const getGoogleMediaItems = async ({ fetch }, pageSize, pageToken) => {
	const result = await fetch(
		`https://photoslibrary.googleapis.com/v1/mediaItems/?pageSize=${pageSize}&pageToken=${pageToken}`);
	return result.json();
};

/**
 * Function for fetching a specific photo using the media item ID.
 */
export const getGoogleMediaItem = async ({ fetch }, mediaItemId) => {
	const result = await fetch(`https://photoslibrary.googleapis.com/v1/mediaItems/${mediaItemId}`);
	return result.json();
};

/**
 * Function for fetching all photos from a specific album using the album ID.
 */
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

/**
 * Fetch function to get album data in the server-side API route
 */
export const getAlbum = async ({ fetch, albumId }) => {
	const album = await getGoogleAlbum({ fetch }, albumId);

	if (!album) {
		throw new Error(500, 'Unable to get album');
	}

	return album;
};

/**
 * Fetch function to get all albums in the server-side API route
 */
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

/** 
 * Fetch function to get all media items from an album in the server-side API route
 */
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

/**
 * Fetch function to get all media items in the server-side API route
 */
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

/**
 * Fetch function to get a specific image using the media item ID in the server-side API route
 */
export const getImage = async ({ fetch, photoId }) => {
	const image = await getGoogleMediaItem({ fetch }, photoId);

	if (!image) {
		throw new Error(500, 'Unable to get image');
	}

	return image;
};
