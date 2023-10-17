import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from "$env/static/public"

/**
 * A basic object containing values for connecting to the Supabase database,
 * the values being public environment variables
 * 
 * @typedef {Object} DbConfig
 */
export const db = {
  url: PUBLIC_SUPABASE_URL,
  key: PUBLIC_SUPABASE_KEY
}