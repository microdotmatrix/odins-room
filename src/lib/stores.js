import { writable } from "svelte/store";

export const gridRows = writable(4);

/**
 * Store for the number of images to display per page.
 */
export const limit = writable(12);