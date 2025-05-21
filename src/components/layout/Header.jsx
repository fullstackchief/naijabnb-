import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaSearch, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-white shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-display font-bold"
          >
            <span className="text-[#00C07E]">Nija</span>
            <span className="text-primary-500">BnB</span>
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/listings" 
            className={`font-medium transition-colors hover:text-primary-500 ${
              isScrolled || !isHomePage ? 'text-neutral-800' : 'text-white'
            }`}
          >
            Explore
          </Link>
          <Link 
            to="/host/dashboard" 
            className={`font-medium transition-colors hover:text-primary-500 ${
              isScrolled || !isHomePage ? 'text-neutral-800' : 'text-white'
            }`}
          >
            Become a Host
          </Link>
          <Link 
            to="/agent/dashboard" 
            className={`font-medium transition-colors hover:text-[#00C07E] ${
              isScrolled || !isHomePage ? 'text-neutral-800' : 'text-white'
            }`}
          >
            Become an Agent
          </Link>
          <Link 
            to="/login" 
            className={`font-medium transition-colors hover:text-primary-500 ${
              isScrolled || !isHomePage ? 'text-neutral-800' : 'text-white'
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              isScrolled || !isHomePage
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-white text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-full ${
            isScrolled || !isHomePage
              ? 'text-neutral-800 hover:bg-neutral-100'
              : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t border-neutral-200"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/listings"
              className="py-2 px-4 text-neutral-800 hover:bg-neutral-50 rounded-md"
            >
              Explore
            </Link>
            <Link
              to="/host/dashboard"
              className="py-2 px-4 text-neutral-800 hover:bg-neutral-50 rounded-md"
            >
              Become a Host
            </Link>
            <Link
              to="/agent/dashboard"
              className="py-2 px-4 text-neutral-800 hover:bg-neutral-50 rounded-md"
            >
              Become an Agent
            </Link>
            <Link
              to="/login"
              className="py-2 px-4 text-neutral-800 hover:bg-neutral-50 rounded-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-primary-500 text-white py-2 px-4 rounded-full text-center hover:bg-primary-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header