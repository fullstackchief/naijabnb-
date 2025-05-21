import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error)
        return
      }
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id)
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      // Handle specific auth events
      if (event === 'SIGNED_IN') {
        // Fetch additional user data if needed
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (!error && profile) {
            setUser(prev => ({ ...prev, profile }))
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async ({ email, password, ...data }) => {
    try {
      // First check if user exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single()

      if (existingUser) {
        throw new Error('An account with this email already exists. Please log in instead.')
      }

      // Proceed with signup
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: data.fullName,
            user_type: data.userType || 'guest'
          }
        }
      })
      
      if (signUpError) throw signUpError

      // Create profile record
      if (authData?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              full_name: data.fullName,
              phone: data.phone,
              user_type: data.userType || 'guest'
            }
          ])
          .single()

        if (profileError) {
          console.error('Error creating profile:', profileError)
          // Delete the auth user if profile creation fails
          await supabase.auth.admin.deleteUser(authData.user.id)
          throw new Error('Failed to create user profile')
        }
      }

      return authData
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  }

  const signIn = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.')
        }
        throw error
      }

      // Fetch user profile
      if (data?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (!profileError && profile) {
          setUser(prev => ({ ...prev, profile }))
        }
      }

      return data
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Clear user and session state
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession()
      if (error) throw error
      
      setSession(session)
      setUser(session?.user ?? null)
      return session
    } catch (error) {
      console.error('Session refresh error:', error)
      throw error
    }
  }

  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    signOut,
    refreshSession
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}