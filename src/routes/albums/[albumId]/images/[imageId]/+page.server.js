/** @type {import('./$types').PageServerLoad} */
export const load = async ({ parent, params, locals }) => {
  const { session } = await parent();
  let { data: comments, error } = await locals.supabase
  .from('photo_comments')
    .select('*')
    .eq('photo_id', params.imageId)

  if (error) {
    console.error(error);
    return new Error("could not load comments")
  }

  return {
    user: session?.user,
    comments: comments,
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, params, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const comment = formData.get('comment')?.toString();
    const userId = formData.get('user_id')?.toString();
    const { data, error } = await supabase.from('photo_comments').insert([
      { photo_id: params.imageId },
      { content: comment },
      { email: email },
      { user: userId }
    ]).select();
    if (error) {
      console.error(error);
      return {
        status: 500,
        body: {
          error: 'Could not save comment'
        }
      }
    }
    return {
      status: 200,
      body: {
        comment: data,
      }
    }
  }
}