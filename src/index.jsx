import { useState, useEffect } from 'react'
import { FaSearch, FaMapMarkerAlt, FaStar, FaHeart } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function HomePage() {
  const [featuredListings, setFeaturedListings] = useState([])

  // Sample data for now - we'll connect to Supabase later
  useEffect(() => {
    setFeaturedListings([
      {
        id: 1,
        title: "Beautiful Villa in Victoria Island",
        location: "Victoria Island, Lagos",
        price: 25000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500"
      },
      {
        id: 2,
        title: "Cozy Apartment in Ikoyi",
        location: "Ikoyi, Lagos",
        price: 18000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500"
      },
      {
        id: 3,
        title: "Modern House in Abuja",
        location: "Maitama, Abuja",
        price: 30000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500"
      }
    ])
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-600">NaijaBnB</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/listings" className="text-gray-700 hover:text-green-600">Browse Stays</a>
              <a href="/host-dashboard" className="text-gray-700 hover:text-green-600">Host</a>
              <a href="/login" className="text-gray-700 hover:text-green-600">Login</a>
              <a href="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Sign Up</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Find Amazing Stays in Nigeria
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover unique accommodations across Lagos, Abuja, and beyond
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Where do you want to stay?"
                  className="w-full px-4 py-3 text-gray-700 border-none focus:outline-none"
                />
              </div>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                <FaSearch />
                <span>Search</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Stays</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <motion.div
                key={listing.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-3 right-3 text-white hover:text-red-500">
                    <FaHeart size={20} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-1" />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{listing.rating}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-green-600">₦{listing.price.toLocaleString()}</span>
                      <span className="text-gray-500 text-sm">/night</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Host Your Property?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of hosts earning extra income on NaijaBnB
          </p>
          
            href="/host-dashboard"
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Hosting Today
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">NaijaBnB</h3>
              <p className="text-gray-400">
                Nigeria's premier home-sharing platform
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NaijaBnB. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
