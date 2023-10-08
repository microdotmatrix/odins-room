/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
  // @ts-ignore
  return {
    imageId: params.imageId,
  }
}