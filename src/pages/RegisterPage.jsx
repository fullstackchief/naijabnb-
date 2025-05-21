import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    userType: 'guest'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleUserTypeChange = (type) => {
    setFormData({
      ...formData,
      userType: type
    })
  }

  const nextStep = () => {
    if (step === 1) {
      // Validate step 1
      if (!formData.fullName || !formData.email) {
        setError('Please fill in all required fields')
        return
      }
      setError('')
      setStep(2)
    }
  }

  const prevStep = () => {
    setStep(1)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Validate form
    if (!formData.password) {
      setError('Please enter a password')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (!formData.agreeTerms) {
      setError('You must agree to the Terms and Privacy Policy')
      return
    }
    
    setIsLoading(true)
    
    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        userType: formData.userType
      })
      
      // Redirect to login after successful registration
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please log in to continue.' 
        }
      })
    } catch (err) {
      if (err.message.includes('user_already_exists') || err.message.includes('User already registered')) {
        setError('An account with this email already exists. Please log in instead.')
      } else {
        setError(err.message || 'Failed to create account')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50"
    >
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-neutral-600">
            Join NijaBnB to discover amazing stays across Nigeria
          </p>
        </motion.div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm"
          >
            {error}
            {error.includes('already exists') && (
              <div className="mt-2">
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Click here to log in
                </Link>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Step 1: User Type & Basic Info */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                I want to:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                    formData.userType === 'guest'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-neutral-300 hover:border-neutral-400'
                  }`}
                  onClick={() => handleUserTypeChange('guest')}
                >
                  <FaUser size={24} className="mb-2" />
                  <span className="font-medium">Find a place to stay</span>
                </button>
                <button
                  type="button"
                  className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                    formData.userType === 'host'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-neutral-300 hover:border-neutral-400'
                  }`}
                  onClick={() => handleUserTypeChange('host')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mb-2">
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
                  <span className="font-medium">Become a host</span>
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-neutral-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-neutral-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="phone">
                Phone Number (optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-neutral-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>
            
            <button
              type="button"
              onClick={nextStep}
              className="btn btn-primary w-full"
            >
              Continue
            </button>
          </motion.div>
        )}
        
        {/* Step 2: Password & Agreement */}
        {step === 2 && (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
          >
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-neutral-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="Create a strong password"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                Password must be at least 6 characters long
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-neutral-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeTerms" className="text-neutral-700">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary-600 hover:text-primary-700">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                className={`btn btn-primary ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
              
              <button
                type="button"
                onClick={prevStep}
                className="btn btn-outline"
              >
                Back
              </button>
            </div>
          </motion.form>
        )}
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-8 text-center text-sm text-neutral-600"
        >
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
            Log in
          </Link>
        </motion.p>
      </div>
    </motion.div>
  )
}

export default RegisterPage