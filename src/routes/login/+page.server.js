import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();

		if (!email) {
			return fail(400, {
				signinWithPassword: {
					error: 'Please enter your email',
					values: {
						email
					}
				}
			});
		}

		if (!password) {
			return fail(400, {
				signinWithPassword: {
					error: 'Please enter your password',
					values: {
						email
					}
				}
			});
		}

		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					signinWithPassword: {
						error: 'Invalid credentials.',
						values: {
							email
						}
					}
				});
			}
			return fail(500, {
				signinWithPassword: {
					error: 'Server error. Try again later.',
					values: {
						email
					}
				}
			});
		}

		throw redirect(303, '/albums');
	}
};