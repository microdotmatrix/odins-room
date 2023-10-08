// @ts-nocheck
import { db } from '$lib/api/db'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'

/** @type {import('./$types').LayoutLoad} */
export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

	const supabase = createSupabaseLoadClient({
		supabaseUrl: db.url,
		supabaseKey: db.key,
		event: { fetch },
		serverSession: data.session
	})

	const {
		data: { session }
	} = await supabase.auth.getSession()

	return { supabase, session }
}