import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { FaCalendarAlt, FaHeart, FaUser, FaCommentAlt, FaCreditCard, FaBell, FaSignOutAlt } from 'react-icons/fa'

// Sample booking data - in a real app, this would come from an API
const bookings = [
  {
    id: 1,
    listingId: 1,
    listingTitle: 'Luxury Villa with Ocean View',
    location: 'Lagos, Nigeria',
    image: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    checkIn: new Date(Date.now() + 86400000 * 15), // 15 days from now
    checkOut: new Date(Date.now() + 86400000 * 22), // 22 days from now
    totalPrice: 245000,
    status: 'confirmed',
    guests: 4
  },
  {
    id: 2,
    listingId: 4,
    listingTitle: 'Beachfront Cottage',
    location: 'Port Harcourt, Nigeria',
    image: 'https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    checkIn: new Date(Date.now() - 86400000 * 10), // 10 days ago
    checkOut: new Date(Date.now() - 86400000 * 3), // 3 days ago
    totalPrice: 196000,
    status: 'completed',
    guests: 2
  },
  {
    id: 3,
    listingId: 6,
    listingTitle: 'Penthouse with City Skyline View',
    location: 'Lagos, Nigeria',
    image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    checkIn: new Date(Date.now() + 86400000 * 45), // 45 days from now
    checkOut: new Date(Date.now() + 86400000 * 52), // 52 days from now
    totalPrice: 294000,
    status: 'pending',
    guests: 3
  }
]

// Sample favorites data
const favorites = [
  {
    id: 1,
    listingId: 5,
    title: 'Mountain View Retreat',
    location: 'Jos, Nigeria',
    price: 15000,
    image: 'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    listingId: 2,
    title: 'Modern Apartment in City Center',
    location: 'Abuja, Nigeria',
    price: 22000,
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    listingId: 10,
    title: 'Beach House with Private Access',
    location: 'Lagos, Nigeria',
    price: 38000,
    image: 'https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
]

// Sample profile data
const profile = {
  name: 'Oluwaseun Johnson',
  email: 'oluwaseun.j@example.com',
  phone: '+234 803 456 7890',
  avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  joined: 'January 2023',
  location: 'Lagos, Nigeria'
}

function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState('bookings')

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-primary-100 text-primary-800'
      case 'completed':
        return 'bg-neutral-100 text-neutral-800'
      case 'pending':
        return 'bg-accent-100 text-accent-800'
      case 'cancelled':
        return 'bg-error-100 text-error-800'
      default:
        return 'bg-neutral-100 text-neutral-800'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-neutral-50 pt-24 pb-16"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <img 
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p className="text-neutral-500">{profile.location}</p>
                <p className="text-sm text-neutral-500 mt-1">Member since {profile.joined}</p>
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('bookings')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'bookings' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaCalendarAlt className="mr-3" />
                  <span>My Bookings</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('favorites')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'favorites' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaHeart className="mr-3" />
                  <span>Saved Stays</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('profile')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaUser className="mr-3" />
                  <span>Profile Settings</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('messages')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'messages' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaCommentAlt className="mr-3" />
                  <span>Messages</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('payments')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'payments' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaCreditCard className="mr-3" />
                  <span>Payment Methods</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('notifications')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'notifications' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaBell className="mr-3" />
                  <span>Notifications</span>
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <button className="flex items-center text-neutral-700 hover:text-error w-full">
                <FaSignOutAlt className="mr-3" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-display font-bold">My Bookings</h1>
                  <button className="btn btn-outline">
                    Book a New Stay
                  </button>
                </div>
                
                {bookings.length > 0 ? (
                  <div className="space-y-6">
                    {bookings.map(booking => (
                      <div key={booking.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          {/* Listing Image */}
                          <div className="md:w-1/3">
                            <img 
                              src={booking.image} 
                              alt={booking.listingTitle}
                              className="w-full h-48 md:h-full object-cover"
                            />
                          </div>
                          
                          {/* Booking Details */}
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-semibold mb-1">{booking.listingTitle}</h3>
                                <p className="text-neutral-600 mb-2">{booking.location}</p>
                                <div className="flex items-center text-sm text-neutral-600 mb-4">
                                  <FaCalendarAlt className="mr-2 text-primary-500" />
                                  <span>
                                    {format(booking.checkIn, 'MMM d, yyyy')} — {format(booking.checkOut, 'MMM d, yyyy')}
                                  </span>
                                </div>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap justify-between items-end">
                              <div>
                                <p className="text-sm text-neutral-600">
                                  {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
                                </p>
                                <p className="font-semibold mt-1">
                                  Total: ₦{booking.totalPrice.toLocaleString()}
                                </p>
                              </div>
                              
                              <div className="flex gap-3 mt-4 md:mt-0">
                                {booking.status === 'completed' && (
                                  <button className="btn btn-sm btn-outline">
                                    Write a Review
                                  </button>
                                )}
                                <button className="btn btn-sm btn-primary">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCalendarAlt className="text-neutral-400" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                    <p className="text-neutral-600 mb-6">Your booking history will appear here once you book a stay</p>
                    <button className="btn btn-primary">
                      Find a Place to Stay
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-display font-bold">Saved Stays</h1>
                </div>
                
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favorites.map(favorite => (
                      <div key={favorite.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="relative">
                          <img 
                            src={favorite.image} 
                            alt={favorite.title}
                            className="w-full h-48 object-cover"
                          />
                          <button className="absolute top-3 right-3 bg-white p-2 rounded-full text-error">
                            <FaHeart />
                          </button>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold mb-1">{favorite.title}</h3>
                          <p className="text-neutral-600 mb-2">{favorite.location}</p>
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-semibold">₦{favorite.price.toLocaleString()}</span>
                              <span className="text-neutral-600"> / night</span>
                            </div>
                            <button className="btn btn-sm btn-primary">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaHeart className="text-neutral-400" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No saved stays yet</h3>
                    <p className="text-neutral-600 mb-6">Save properties you like by clicking the heart icon</p>
                    <button className="btn btn-primary">
                      Explore Stays
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-display font-bold">Profile Settings</h1>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={profile.name}
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue={profile.email}
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue={profile.phone}
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          defaultValue={profile.location}
                          className="input"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Profile Photo
                      </label>
                      <div className="flex items-center">
                        <img 
                          src={profile.avatar}
                          alt={profile.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <button type="button" className="btn btn-sm btn-outline mb-2 w-full">
                            Change Photo
                          </button>
                          <button type="button" className="btn btn-sm text-error bg-transparent hover:bg-error/5 w-full">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                  <h2 className="text-lg font-semibold mb-4">Password</h2>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="input"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="input"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="input"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <button type="submit" className="btn btn-primary">
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default UserDashboardPage