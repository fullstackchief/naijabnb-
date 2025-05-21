import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Check for success message from registration
  React.useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message)
      // Clear the message from location state
      window.history.replaceState({}, document.title)
    }
  }, [location])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields')
      }
      
      const { error } = await signIn({ email, password })
      
      if (error) {
        if (error.message.includes('invalid_credentials')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.')
        }
        throw error
      }

      // Get the redirect path from location state or default to dashboard
      const from = location.state?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })
      
    } catch (err) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white"
      >
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-neutral-900 mb-3">
              Welcome Back
            </h1>
            <p className="text-neutral-600">
              Log in to access your NijaBnB account
            </p>
          </div>
          
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-success/10 border border-success/20 rounded-xl text-success text-sm"
            >
              {success}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl text-error text-sm"
            >
              {error}
              {error.includes('Invalid email or password') && (
                <div className="mt-2">
                  <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700 font-medium">
                    Forgot your password?
                  </Link>
                </div>
              )}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-neutral-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-11 w-full rounded-xl"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-neutral-700" htmlFor="password">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-neutral-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-11 w-full rounded-xl"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                Remember me
              </label>
            </div>
            
            <button
              type="submit"
              className={`btn btn-primary w-full py-3 rounded-xl text-base ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          
          <p className="mt-8 text-center text-sm text-neutral-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="hidden lg:block lg:w-1/2 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25"></div>
        <img 
          src="https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Login background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-lg text-white text-center">
            <h2 className="text-4xl font-display font-bold mb-4">
              Find Your Perfect Stay in Nigeria
            </h2>
            <p className="text-lg text-white/90">
              Discover unique accommodations and experiences across Nigeria's most beautiful destinations
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage