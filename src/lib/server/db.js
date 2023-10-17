import { SUPABASE_URL, SUPABASE_KEY } from "$env/static/private"

/**
 * A basic object containing values for connecting to the Supabase database,
 * the values being private environment variables, passed here into the
 * lib/server sub-directory - which can only be accessed by server-side functions.
 * 
 * @typedef {Object} DbConfig
 */
export const db = {
  url: SUPABASE_URL,
  key: SUPABASE_KEY
}