import { browser } from '$app/environment';
import { persisted } from 'svelte-local-storage-store';

/**
 * @typedef {{ preference: 'light' | 'dark' | 'system', current: 'light' | 'dark' }} Theme
 */

/**
 * Use the persisted store from Svelte-Local-Storage-Store to set
 * the user's theme preference in their browser's local storage so
 * that it persists between sessions and visits.
 *  @type {import('svelte/store').Writable<Theme>} 
 */
export const theme = persisted('svelte:theme', {
	preference: 'system',
	current: browser
		? window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
		: 'light'
});

theme.subscribe(($theme) => {
	if (!browser) return;
	/**
	 * Check the rendered HTML element for the data-theme attribute and remove it,
	 * then add the attribute with the current theme.
	 */
	document.documentElement.removeAttribute('data-theme');
	document.documentElement.setAttribute('data-theme', $theme.current);
});
