import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { FaCalendarAlt, FaHome, FaUser, FaChartBar, FaWallet, FaCog, FaSignOutAlt, FaPlus, FaCheckCircle, FaTimesCircle, FaHourglass, FaMapMarkerAlt, FaBed, FaBath, FaUsers, FaArrowUp, FaArrowDown, FaStar, FaCommentAlt } from 'react-icons/fa'
import { hostsApi } from '../lib/supabase'

// Sample data - in a real app, this would come from the API
const hostStats = {
  totalEarnings: 542000,
  pendingPayouts: 125000,
  totalBookings: 23,
  occupancyRate: 72,
  monthlyEarnings: [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 52000 },
    { month: 'Mar', amount: 68000 },
    { month: 'Apr', amount: 78000 },
    { month: 'May', amount: 95000 },
    { month: 'Jun', amount: 88000 },
    { month: 'Jul', amount: 116000 },
    { month: 'Aug', amount: 0 },
    { month: 'Sep', amount: 0 },
    { month: 'Oct', amount: 0 },
    { month: 'Nov', amount: 0 },
    { month: 'Dec', amount: 0 }
  ]
}

// Sample properties data
const properties = [
  {
    id: 1,
    title: 'Modern Apartment in Lekki',
    location: 'Lekki, Lagos',
    price: 25000,
    image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'active',
    rating: 4.85,
    reviewCount: 27,
    bookingRate: 78,
    views: 342,
    created: '2023-02-15',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Pool']
  },
  {
    id: 2,
    title: 'Cozy Cottage near the Beach',
    location: 'Port Harcourt, Rivers',
    price: 18000,
    image: 'https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'active',
    rating: 4.92,
    reviewCount: 15,
    bookingRate: 85,
    views: 214,
    created: '2023-05-21',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Kitchen', 'Beach Access']
  },
  {
    id: 3,
    title: 'Spacious Villa with Pool',
    location: 'Victoria Island, Lagos',
    price: 45000,
    image: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'draft',
    rating: 0,
    reviewCount: 0,
    bookingRate: 0,
    views: 0,
    created: '2023-08-10',
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ['WiFi', 'Kitchen', 'Pool', 'Gym', 'Garden']
  }
]

// Sample bookings data
const bookings = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: 'Modern Apartment in Lekki',
    propertyImage: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    guestName: 'Chioma Eze',
    guestImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    checkIn: new Date(Date.now() + 86400000 * 7), // 7 days from now
    checkOut: new Date(Date.now() + 86400000 * 14), // 14 days from now
    guests: 2,
    totalPrice: 175000,
    status: 'confirmed',
    bookedAt: new Date(Date.now() - 86400000 * 10) // 10 days ago
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: 'Cozy Cottage near the Beach',
    propertyImage: 'https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    guestName: 'Ade Johnson',
    guestImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    checkIn: new Date(Date.now() - 86400000 * 5), // 5 days ago
    checkOut: new Date(Date.now() + 86400000 * 2), // 2 days from now
    guests: 4,
    totalPrice: 126000,
    status: 'in-progress',
    bookedAt: new Date(Date.now() - 86400000 * 30) // 30 days ago
  },
  {
    id: 3,
    propertyId: 1,
    propertyTitle: 'Modern Apartment in Lekki',
    propertyImage: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    guestName: 'Michael Okafor',
    guestImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    checkIn: new Date(Date.now() + 86400000 * 20), // 20 days from now
    checkOut: new Date(Date.now() + 86400000 * 25), // 25 days from now
    guests: 1,
    totalPrice: 125000,
    status: 'pending',
    bookedAt: new Date(Date.now() - 86400000 * 2) // 2 days ago
  }
]

// Sample reviews data
const reviews = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: 'Modern Apartment in Lekki',
    propertyImage: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    guestName: 'Sarah Wilson',
    guestImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    comment: 'Amazing place! Very clean and modern. The host was super helpful and responsive.',
    createdAt: new Date(Date.now() - 86400000 * 5) // 5 days ago
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: 'Cozy Cottage near the Beach',
    propertyImage: 'https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    guestName: 'John Doe',
    guestImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4,
    comment: 'Great location and beautiful views. Could use some minor updates but overall a good stay.',
    createdAt: new Date(Date.now() - 86400000 * 10) // 10 days ago
  }
]

function HostDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hostData, setHostData] = useState({
    properties: [],
    bookings: [],
    reviews: []
  })
  const [bookingFilter, setBookingFilter] = useState('all')
  const [earningsPeriod, setEarningsPeriod] = useState('monthly')

  useEffect(() => {
    fetchHostData()
  }, [])

  const fetchHostData = async () => {
    try {
      setIsLoading(true)
      const [properties, bookings, reviews] = await Promise.all([
        hostsApi.getProperties(),
        hostsApi.getBookings(),
        hostsApi.getReviews()
      ])
      setHostData({ properties, bookings, reviews })
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
      case 'confirmed':
        return 'bg-[#00C07E]/10 text-[#00C07E]'
      case 'draft':
      case 'pending':
        return 'bg-neutral-100 text-neutral-600'
      case 'in-progress':
        return 'bg-primary-100 text-primary-800'
      case 'completed':
        return 'bg-neutral-100 text-neutral-800'
      case 'cancelled':
        return 'bg-error-100 text-error-800'
      default:
        return 'bg-neutral-100 text-neutral-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="text-[#00C07E]" />
      case 'completed':
        return <FaCheckCircle className="text-neutral-500" />
      case 'pending':
        return <FaHourglass className="text-neutral-500" />
      case 'in-progress':
        return <FaHourglass className="text-primary-500" />
      case 'cancelled':
        return <FaTimesCircle className="text-error-500" />
      default:
        return null
    }
  }

  const filteredBookings = bookings.filter(booking => {
    if (bookingFilter === 'all') return true
    return booking.status === bookingFilter
  })

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
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Host"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-semibold">Tunde Adebayo</h2>
                <p className="text-neutral-500">Lagos, Nigeria</p>
                <p className="text-sm text-neutral-500 mt-1">Host since February 2023</p>
                <div className="bg-[#00C07E]/10 text-[#00C07E] px-3 py-1 rounded-full text-xs font-medium mt-2">
                  Superhost
                </div>
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('dashboard')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'dashboard' 
                      ? 'bg-[#00C07E]/10 text-[#00C07E]' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaChartBar className="mr-3" />
                  <span>Dashboard</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('properties')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'properties' 
                      ? 'bg-[#00C07E]/10 text-[#00C07E]' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaHome className="mr-3" />
                  <span>My Properties</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('bookings')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'bookings' 
                      ? 'bg-[#00C07E]/10 text-[#00C07E]' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaCalendarAlt className="mr-3" />
                  <span>Bookings</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('earnings')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'earnings' 
                      ? 'bg-[#00C07E]/10 text-[#00C07E]' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaWallet className="mr-3" />
                  <span>Earnings</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('reviews')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'reviews' 
                      ? 'bg-[#00C07E]/10 text-[#00C07E]' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaStar className="mr-3" />
                  <span>Reviews</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('messages')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'messages' 
                      ? 'bg-[#00C07E]/10 text-[#00C07E]' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaCommentAlt className="mr-3" />
                  <span>Messages</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('profile')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-[#00C07E]/10 text-[#00C07E]' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaUser className="mr-3" />
                  <span>Profile</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('settings')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-[#00C07E]/10 text-[#00C07E]' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaCog className="mr-3" />
                  <span>Settings</span>
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
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-display font-bold">Host Dashboard</h1>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <p className="text-neutral-600 mb-1">Total Earnings</p>
                    <h3 className="text-2xl font-semibold mb-1">₦{hostStats.totalEarnings.toLocaleString()}</h3>
                    <div className="flex items-center text-xs text-[#00C07E] font-medium">
                      <FaArrowUp className="mr-1" />
                      <span>12% from last month</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <p className="text-neutral-600 mb-1">Active Properties</p>
                    <h3 className="text-2xl font-semibold mb-1">{properties.filter(p => p.status === 'active').length}</h3>
                    <p className="text-xs text-neutral-600">of {properties.length} total</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <p className="text-neutral-600 mb-1">Pending Bookings</p>
                    <h3 className="text-2xl font-semibold mb-1">{bookings.filter(b => b.status === 'pending').length}</h3>
                    <p className="text-xs text-accent-600 font-medium">Need your attention</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <p className="text-neutral-600 mb-1">Occupancy Rate</p>
                    <h3 className="text-2xl font-semibold mb-1">{hostStats.occupancyRate}%</h3>
                    <div className="flex items-center text-xs text-[#00C07E] font-medium">
                      <FaArrowUp className="mr-1" />
                      <span>8% from last month</span>
                    </div>
                  </div>
                </div>
                
                {/* Recent Bookings */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Recent Bookings</h2>
                    <button 
                      onClick={() => setActiveTab('bookings')}
                      className="text-sm text-[#00C07E] hover:text-[#00A06E]"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Guest</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Property</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Dates</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {bookings.slice(0, 3).map(booking => (
                          <tr key={booking.id}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
                                  <img src={booking.guestImage} alt={booking.guestName} className="h-full w-full object-cover" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium">{booking.guestName}</div>
                                  <div className="text-xs text-neutral-500">{booking.guests} guest{booking.guests !== 1 ? 's' : ''}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm">{booking.propertyTitle}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm">{format(booking.checkIn, 'MMM d')} - {format(booking.checkOut, 'MMM d')}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm font-medium">₦{booking.totalPrice.toLocaleString()}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                                <span className="mr-1">{getStatusIcon(booking.status)}</span>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('-', ' ')}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Properties Summary */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Your Properties</h2>
                    <button 
                      onClick={() => setActiveTab('properties')}
                      className="text-sm text-[#00C07E] hover:text-[#00A06E]"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {properties.slice(0, 2).map(property => (
                      <div key={property.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                        <div className="flex">
                          <div className="w-1/3">
                            <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
                          </div>
                          <div className="w-2/3 p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-sm font-medium">{property.title}</h3>
                              <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(property.status)}`}>
                                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                              </div>
                            </div>
                            <p className="text-xs text-neutral-500 mb-2">{property.location}</p>
                            <div className="text-sm mb-2">₦{property.price.toLocaleString()} / night</div>
                            <div className="flex justify-between items-center text-xs text-neutral-500">
                              <span>{property.status === 'active' ? `${property.rating} (${property.reviewCount} reviews)` : 'No reviews yet'}</span>
                              <span>{property.views} views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border border-dashed border-neutral-300 rounded-lg flex items-center justify-center p-6 text-center">
                      <div>
                        <div className="w-12 h-12 rounded-full bg-[#00C07E]/10 flex items-center justify-center mx-auto mb-3">
                          <FaPlus className="text-[#00C07E]" />
                        </div>
                        <p className="font-medium mb-1">Add a New Property</p>
                        <p className="text-sm text-neutral-500 mb-3">List your property and start earning</p>
                        <button className="btn btn-sm btn-primary">
                          Create Listing
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-display font-bold">My Properties</h1>
                  <button className="btn btn-primary flex items-center">
                    <FaPlus className="mr-2" />
                    Add New Property
                  </button>
                </div>
                
                {properties.length > 0 ? (
                  <div className="space-y-6">
                    {properties.map(property => (
                      <div key={property.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          {/* Property Image */}
                          <div className="md:w-1/3 lg:w-1/4">
                            <img 
                              src={property.image} 
                              alt={property.title}
                              className="w-full h-48 md:h-full object-cover"
                            />
                          </div>
                          
                          {/* Property Details */}
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
                                <p className="text-neutral-600 mb-3">{property.location}</p>
                                <div className="flex items-center text-sm mb-3">
                                  <span className="font-medium mr-6">₦{property.price.toLocaleString()} / night</span>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(property.status)}`}>
                                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex">
                                <button className="btn btn-sm btn-outline mr-2">
                                  Edit
                                </button>
                                <button className="btn btn-sm btn-primary">
                                  View
                                </button>
                              </div>
                            </div>
                            
                            {/* Property Features */}
                            <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
                              <span className="flex items-center">
                                <FaBed className="mr-1" />
                                {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                              </span>
                              <span className="flex items-center">
                                <FaBath className="mr-1" />
                                {property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                              </span>
                              <span className="flex items-center">
                                <FaUsers className="mr-1" />
                                Up to {property.maxGuests} guests
                              </span>
                            </div>
                            
                            {/* Amenities */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {property.amenities.map((amenity, index) => (
                                <span 
                                  key={index}
                                  className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                            
                            {/* Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-neutral-200 pt-4">
                              <div>
                                <p className="text-xs text-neutral-500 mb-1">Rating</p>
                                <p className="font-medium">
                                  {property.status === 'active' ? `${property.rating} of 5` : 'N/A'} 
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-neutral-500 mb-1">Reviews</p>
                                <p className="font-medium">{property.reviewCount}</p>
                              </div>
                              <div>
                                <p className="text-xs text-neutral-500 mb-1">Booking Rate</p>
                                <p className="font-medium">{property.bookingRate}%</p>
                              </div>
                              <div>
                                <p className="text-xs text-neutral-500 mb-1">Views</p>
                                <p className="font-medium">{property.views}</p>
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
                      <FaHome className="text-neutral-400" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No properties yet</h3>
                    <p className="text-neutral-600 mb-6">Add your property and start hosting guests</p>
                    <button className="btn btn-primary">
                      Create Your First Listing
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-display font-bold mb-4">Bookings</h1>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBookingFilter('all')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        bookingFilter === 'all'
                          ? 'bg-[#00C07E] text-white'
                          : 'bg-white text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setBookingFilter('pending')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        bookingFilter === 'pending'
                          ? 'bg-[#00C07E] text-white'
                          : 'bg-white text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setBookingFilter('confirmed')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        bookingFilter === 'confirmed'
                          ? 'bg-[#00C07E] text-white'
                          : 'bg-white text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      Confirmed
                    </button>
                    <button
                      onClick={() => setBookingFilter('completed')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        bookingFilter === 'completed'
                          ? 'bg-[#00C07E] text-white'
                          : 'bg-white text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      Completed
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredBookings.map(booking => (
                    <div key={booking.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-48 md:h-auto">
                          <img 
                            src={booking.propertyImage}
                            alt={booking.propertyTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold mb-1">{booking.propertyTitle}</h3>
                              
                              <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
                                <div className="flex items-center">
                                  <FaCalendarAlt className="mr-2 text-[#00C07E]" />
                                  <span>
                                    {format(booking.checkIn, 'MMM d, yyyy')} - {format(booking.checkOut, 'MMM d, yyyy')}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <FaUsers className="mr-2 text-[#00C07E]" />
                                  <span>{booking.guests} guest{booking.guests !== 1 ? 's' : ''}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <img 
                                  src={booking.guestImage}
                                  alt={booking.guestName}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="text-sm font-medium">{booking.guestName}</span>
                              </div>
                            </div>
                            
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                              <span className="mr-1">{getStatusIcon(booking.status)}</span>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('-', ' ')}
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-end">
                            <div>
                              <div className="text-sm text-neutral-600 mb-1">Total Price</div>
                              <div className="text-lg font-semibold">₦{booking.totalPrice.toLocaleString()}</div>
                            </div>
                            
                            <div className="flex gap-2">
                              <button className="btn btn-sm btn-outline">Message Guest</button>
                              <button className="btn btn-sm btn-primary">View Details</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredBookings.length === 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCalendarAlt className="text-neutral-400" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                    <p className="text-neutral-600">
                      {bookingFilter === 'all' 
                        ? 'Start promoting your properties to get bookings'
                        : `No ${bookingFilter} bookings at the moment`}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Earnings Tab */}
            {activeTab === 'earnings' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-display font-bold">Earnings</h1>
                </div>

                {/* Earnings Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <p className="text-neutral-600 mb-1">Total Earnings</p>
                    <h3 className="text-2xl font-semibold mb-1">₦{hostStats.totalEarnings.toLocaleString()}</h3>
                    <div className="flex items-center text-xs text-[#00C07E] font-medium">
                      <FaArrowUp className="mr-1" />
                      <span>15% from last month</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <p className="text-neutral-600 mb-1">Pending Payouts</p>
                    <h3 className="text-2xl font-semibold mb-1">₦{hostStats.pendingPayouts.toLocaleString()}</h3>
                    <p className="text-xs text-neutral-600">From {hostStats.totalBookings} bookings</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <p className="text-neutral-600 mb-1">Average Daily Rate</p>
                    <h3 className="text-2xl font-semibold mb-1">₦{(hostStats.totalEarnings / 30).toLocaleString()}</h3>
                    <p className="text-xs text-neutral-600">Last 30 days</p>
                  </div>
                </div>

                {/* Earnings Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Earnings History</h2>
                    <select
                      value={earningsPeriod}
                      onChange={(e) => setEarningsPeriod(e.target.value)}
                      className="text-sm border-none focus:ring-1 focus:ring-[#00C07E]"
                    >
                      <option value="weekly">This Week</option>
                      <option value="monthly">This Month</option>
                      <option value="yearly">This Year</option>
                    </select>
                  </div>
                  
                  <div className="h-64">
                    {/* Chart would go here - using a placeholder for now */}
                    <div className="h-full flex items-end gap-2">
                      {hostStats.monthlyEarnings.map((data, index) => (
                        <div key={data.month} className="flex-1">
                          <div 
                            className="bg-[#00C07E]/20 hover:bg-[#00C07E]/30 transition-colors rounded-t"
                            style={{ height: `${(data.amount / 120000) * 100}%` }}
                          ></div>
                          <div className="text-xs text-center mt-2">{data.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-display font-bold">Reviews</h1>
                </div>

                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <img 
                            src={review.guestImage}
                            alt={review.guestName}
                            className="w-10 h-10 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h3 className="font-semibold">{review.guestName}</h3>
                            <p className="text-sm text-neutral-500">
                              {format(review.createdAt, 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i}
                              className={i < review.rating ? 'text-[#00C07E]' : 'text-neutral-200'}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                          <img 
                            src={review.propertyImage}
                            alt={review.propertyTitle}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <span>{review.propertyTitle}</span>
                        </div>
                        <p className="text-neutral-700">{review.comment}</p>
                      </div>

                      <div className="flex justify-end">
                        <button className="btn btn-sm btn-outline">
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}

                  {reviews.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaStar className="text-neutral-400" size={24} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                      <p className="text-neutral-600">
                        Reviews from your guests will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HostDashboardPage