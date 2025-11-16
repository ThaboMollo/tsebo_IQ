import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    // Handle the OAuth callback
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        // User successfully authenticated, redirect to dashboard
        navigate('/dashboard/candidate')
      } else {
        // No session found, redirect back to auth page
        navigate('/auth')
      }
    })
  }, [navigate])

  return (
    <div className="w-full h-screen flex items-center justify-center bg-neutralLight dark:bg-primaryNavy">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accentTeal mx-auto mb-4"></div>
        <p className="text-lg font-medium text-primaryNavy dark:text-white">
          Signing you in...
        </p>
      </div>
    </div>
  )
}
