export const createUrl = (
	/** @type {any} */ pathname,
	/** @type {{ toString: () => any; }} */ params
) => {
	const paramsString = params.toString();
	const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

	return `${pathname}${queryString}`;
};

/**
 * @param {string | number | Date} input
 */
export function formatDate(input) {
	const date = new Date(input);
	return date.toLocaleString('en-US', {
		dateStyle: 'short',
		timeStyle: 'short',
		timeZone: 'America/Chicago'
	});
}

// Artificially delay a function call to simulate a slow network connection.
export async function sleep(ms = 500) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// keep number counters within a range
/**
 * @param {number} value
 */
export function clampRange(value, min = 0, max = 1) {
	return value < min ? min : value > max ? max : value;
}

/**
 * @param {number} number
 * @param {number} min
 * @param {number} max
 */
export function clamp(number, min, max) {
	if (number < min) return min;
	if (number > max) return max;
	return number;
}

/**
 * @param {any[]} recs
 * @param {{ [x: string]: any; }} vals
 */
export function hasObject(recs, vals) {
	if (!recs) return false;

	return recs.some(function (/** @type {{ [x: string]: any; }} */ obj) {
		for (var x in obj) if (x in vals && obj[x] != vals[x]) return false;
		return true;
	});
}

/**
 * @param {any} str
 */
export function toSlug(str) {
	let s = str;
	if (!s) {
		return '';
	}
	s = s.toLowerCase().trim();
	s = s.replace(/ & /g, ' and ');
	s = s.replace(/[ ]+/g, '-');
	s = s.replace(/[-]+/g, '-');
	s = s.replace(/[^a-z0-9-]+/g, '');
	return s;
}

export const getRandomFloat = (/** @type {number} */ min, /** @type {number} */ max) =>
	Math.random() * (max - min) + min;
export const getRandomInt = (/** @type {number} */ min, /** @type {number} */ max) =>
	Math.floor(Math.random() * (max - min + 1) + min);
export const getRandomBool = () => Math.random() >= 0.5;
