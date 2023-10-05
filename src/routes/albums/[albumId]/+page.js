/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
  return {
    albumId: params.albumId
  }
}