/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
  return {
    albumId: params.albumId
  }
}