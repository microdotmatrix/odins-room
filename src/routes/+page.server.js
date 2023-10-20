import { fetchAlbums } from "$lib/api/query";

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch, setHeaders }) => {
  return {
    albums: await fetchAlbums({ fetch, setHeaders }),
  }
}