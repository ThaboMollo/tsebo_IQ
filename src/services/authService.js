import { supabase } from '../lib/supabase'

/**
 * Sign in with Google OAuth
 * Redirects to Google login and returns to /auth/callback
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })

  if (error) throw error
  return data
}
