import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaHome, FaCalendarAlt, FaCreditCard, FaUserCircle, FaShieldAlt, FaQuestionCircle } from 'react-icons/fa'

const categories = [
  {
    id: 'getting-started',
    icon: FaHome,
    title: 'Getting Started',
    description: 'New to NijaBnB? Learn the basics here.'
  },
  {
    id: 'bookings',
    icon: FaCalendarAlt,
    title: 'Bookings & Reservations',
    description: 'Everything about booking stays and managing reservations.'
  },
  {
    id: 'payments',
    icon: FaCreditCard,
    title: 'Payments & Pricing',
    description: 'Learn about payments, pricing, and refunds.'
  },
  {
    id: 'account',
    icon: FaUserCircle,
    title: 'Account & Profile',
    description: 'Manage your account settings and profile.'
  },
  {
    id: 'safety',
    icon: FaShieldAlt,
    title: 'Trust & Safety',
    description: 'Stay safe and secure while using NijaBnB.'
  },
  {
    id: 'hosting',
    icon: FaHome,
    title: 'Hosting Guide',
    description: 'Everything you need to know about hosting.'
  }
]

const popularArticles = [
  {
    id: 1,
    title: 'How to book your first stay',
    category: 'getting-started',
    views: 1234
  },
  {
    id: 2,
    title: 'Cancellation policies explained',
    category: 'bookings',
    views: 987
  },
  {
    id: 3,
    title: 'Payment methods we accept',
    category: 'payments',
    views: 856
  },
  {
    id: 4,
    title: 'Verifying your account',
    category: 'account',
    views: 743
  },
  {
    id: 5,
    title: 'Safety tips for guests',
    category: 'safety',
    views: 652
  }
]

function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-neutral-50 pt-24 pb-16"
    >
      {/* Hero Section */}
      <div className="bg-primary-500 py-12 mb-8">
        <div className="container max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            How can we help you?
          </h1>
          <p className="text-primary-50 text-lg mb-8">
            Search our help center or browse categories below
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <FaSearch className="text-neutral-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
        </div>
      </div>

      <div className="container">
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`bg-white rounded-xl shadow-sm p-6 text-left transition-colors hover:bg-primary-50 ${
                selectedCategory === category.id ? 'ring-2 ring-primary-500' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <category.icon className="text-primary-500 text-2xl mb-4" />
              <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
              <p className="text-neutral-600">{category.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-display font-semibold mb-6">Popular Articles</h2>
          <div className="grid gap-6">
            {popularArticles.map(article => (
              <motion.button
                key={article.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-neutral-50 transition-colors text-left w-full"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center">
                  <FaQuestionCircle className="text-primary-500 mr-4" />
                  <div>
                    <h3 className="font-medium mb-1">{article.title}</h3>
                    <p className="text-sm text-neutral-500">
                      {categories.find(c => c.id === article.category)?.title}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-neutral-500">{article.views} views</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-display font-semibold mb-4">Still need help?</h2>
          <p className="text-neutral-600 mb-6">
            Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn btn-primary">
              Contact Support
            </button>
            <button className="btn btn-outline">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HelpCenterPage