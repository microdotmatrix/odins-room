/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
  return {
    imageId: params.imageId,
  }
}