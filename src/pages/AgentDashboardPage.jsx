import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { FaCalendarAlt, FaHome, FaUser, FaChartBar, FaWallet, FaCog, FaSignOutAlt, FaPlus, FaCheckCircle, FaTimesCircle, FaHourglass, FaMapMarkerAlt, FaBed, FaBath, FaUsers, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { agentsApi } from '../lib/supabase'

// Sample data
const agentStats = {
  totalCommission: 154000,
  pendingCommission: 35000,
  totalBookings: 12,
  conversionRate: 68,
  monthlyCommissions: [
    { month: 'Jan', amount: 15000 },
    { month: 'Feb', amount: 22000 },
    { month: 'Mar', amount: 28000 },
    { month: 'Apr', amount: 18000 },
    { month: 'May', amount: 35000 },
    { month: 'Jun', amount: 36000 },
    { month: 'Jul', amount: 0 },
    { month: 'Aug', amount: 0 },
    { month: 'Sep', amount: 0 },
    { month: 'Oct', amount: 0 },
    { month: 'Nov', amount: 0 },
    { month: 'Dec', amount: 0 }
  ]
}

// Sample bookings data
const bookings = [
  {
    id: 1,
    listingId: 1,
    listingTitle: 'Luxury Villa with Ocean View',
    location: 'Lagos, Nigeria',
    image: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    guestName: 'John Doe',
    guestImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    checkIn: new Date(Date.now() + 86400000 * 7),
    checkOut: new Date(Date.now() + 86400000 * 14),
    totalPrice: 245000,
    commission: 24500,
    status: 'confirmed',
    guests: 4
  },
  {
    id: 2,
    listingId: 2,
    listingTitle: 'Modern Apartment in City Center',
    location: 'Abuja, Nigeria',
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    guestName: 'Sarah Wilson',
    guestImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    checkIn: new Date(Date.now() - 86400000 * 3),
    checkOut: new Date(Date.now() + 86400000 * 4),
    totalPrice: 154000,
    commission: 15400,
    status: 'in-progress',
    guests: 2
  },
  {
    id: 3,
    listingId: 3,
    listingTitle: 'Beachfront Cottage',
    location: 'Port Harcourt, Nigeria',
    image: 'https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    guestName: 'Michael Brown',
    guestImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    checkIn: new Date(Date.now() + 86400000 * 20),
    checkOut: new Date(Date.now() + 86400000 * 25),
    totalPrice: 196000,
    commission: 19600,
    status: 'pending',
    guests: 3
  }
]

function AgentDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [commissionPeriod, setCommissionPeriod] = useState('monthly')
  const [bookingFilter, setBookingFilter] = useState('all')

  useEffect(() => {
    if (activeTab === 'listings') {
      fetchListings()
    }
  }, [activeTab])

  const fetchListings = async () => {
    try {
      setIsLoading(true)
      const data = await agentsApi.getListings()
      setListings(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'published':
      case 'confirmed':
        return 'bg-[#00C07E]/10 text-[#00C07E]'
      case 'draft':
      case 'pending':
        return 'bg-neutral-100 text-neutral-600'
      case 'in-progress':
        return 'bg-primary-100 text-primary-800'
      case 'completed':
        return 'bg-neutral-100 text-neutral-800'
      case 'archived':
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
                  src="https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Agent"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-semibold">Chioma Okonkwo</h2>
                <p className="text-neutral-500">Lagos, Nigeria</p>
                <p className="text-sm text-neutral-500 mt-1">Agent since March 2023</p>
                <div className="bg-[#00C07E]/10 text-[#00C07E] px-3 py-1 rounded-full text-xs font-medium mt-2">
                  Active Agent
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
                  onClick={() => setActiveTab('listings')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'listings' 
                      ? 'bg-[#00C07E]/10 text-[#00C07E]' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaHome className="mr-3" />
                  <span>My Listings</span>
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
                  onClick={() => setActiveTab('commission')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'commission' 
                      ? 'bg-[#00C07E]/10 text-[#00C07E]' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaWallet className="mr-3" />
                  <span>Commission</span>
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
                  <h1 className="text-2xl font-display font-bold">Agent Dashboard</h1>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <p className="text-neutral-600 mb-1">Total Commission</p>
                    <h3 className="text-2xl font-semibold mb-1">₦{agentStats.totalCommission.toLocaleString()}</h3>
                    <div className="flex items-center text-xs text-[#00C07E] font-medium">
                      <FaArrowUp className="mr-1" />
                      <span>15% from last month</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <p className="text-neutral-600 mb-1">Pending Commission</p>
                    <h3 className="text-2xl font-semibold mb-1">₦{agentStats.pendingCommission.toLocaleString()}</h3>
                    <p className="text-xs text-neutral-600">From {agentStats.totalBookings} bookings</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <p className="text-neutral-600 mb-1">Conversion Rate</p>
                    <h3 className="text-2xl font-semibold mb-1">{agentStats.conversionRate}%</h3>
                    <div className="flex items-center text-xs text-[#00C07E] font-medium">
                      <FaArrowUp className="mr-1" />
                      <span>5% from last month</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <p className="text-neutral-600 mb-1">Active Listings</p>
                    <h3 className="text-2xl font-semibold mb-1">8</h3>
                    <div className="flex items-center text-xs text-[#00C07E] font-medium">
                      <FaArrowUp className="mr-1" />
                      <span>2 new this month</span>
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
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Listing</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Dates</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Commission</th>
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
                              <div className="text-sm">{booking.listingTitle}</div>
                              <div className="text-xs text-neutral-500">{booking.location}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm">{format(booking.checkIn, 'MMM d')} - {format(booking.checkOut, 'MMM d')}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm font-medium">₦{booking.commission.toLocaleString()}</div>
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

                {/* Commission Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Commission History</h2>
                    <select
                      value={commissionPeriod}
                      onChange={(e) => setCommissionPeriod(e.target.value)}
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
                      {agentStats.monthlyCommissions.map((data, index) => (
                        <div key={data.month} className="flex-1">
                          <div 
                            className="bg-[#00C07E]/20 hover:bg-[#00C07E]/30 transition-colors rounded-t"
                            style={{ height: `${(data.amount / 40000) * 100}%` }}
                          ></div>
                          <div className="text-xs text-center mt-2">{data.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Listings Tab */}
            {activeTab === 'listings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-display font-bold">My Listings</h1>
                  <button className="btn btn-primary flex items-center">
                    <FaPlus className="mr-2" />
                    Add New Listing
                  </button>
                </div>

                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                        <div className="flex gap-4">
                          <div className="w-48 h-32 bg-neutral-200 rounded-lg"></div>
                          <div className="flex-1">
                            <div className="h-6 bg-neutral-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-neutral-200 rounded w-1/2 mb-4"></div>
                            <div className="space-y-2">
                              <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                              <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="bg-error/10 text-error p-4 rounded-lg">
                    {error}
                  </div>
                ) : listings.length > 0 ? (
                  <div className="space-y-4">
                    {listings.map(listing => (
                      <div key={listing.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-48 h-48 md:h-auto">
                            <img 
                              src={listing.listing_images?.[0]?.url || 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'} 
                              alt={listing.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-semibold mb-1">{listing.title}</h3>
                                <div className="flex items-center text-neutral-600 mb-2">
                                  <FaMapMarkerAlt className="mr-1" />
                                  <span>{listing.city}, {listing.state}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-neutral-600">
                                  <span className="flex items-center">
                                    <FaBed className="mr-1" />
                                    {listing.bedrooms} {listing.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                                  </span>
                                  <span className="flex items-center">
                                    <FaBath className="mr-1" />
                                    {listing.bathrooms} {listing.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                                  </span>
                                  <span className="flex items-center">
                                    <FaUsers className="mr-1" />
                                    Up to {listing.max_guests} guests
                                  </span>
                                </div>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(listing.status)}`}>
                                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {listing.listing_amenities?.map(amenity => (
                                <span 
                                  key={amenity.id}
                                  className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full"
                                >
                                  {amenity.name}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-semibold text-lg">₦{listing.price_per_night.toLocaleString()}</span>
                                <span className="text-neutral-600"> / night</span>
                              </div>
                              <div className="flex gap-2">
                                <button className="btn btn-sm btn-outline">Edit</button>
                                <button className="btn btn-sm btn-primary">View</button>
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
                    <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
                    <p className="text-neutral-600 mb-6">Start adding listings to grow your portfolio</p>
                    <button className="btn btn-primary">
                      Add Your First Listing
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
                            src={booking.image}
                            alt={booking.listingTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold mb-1">{booking.listingTitle}</h3>
                              <div className="flex items-center text-neutral-600 mb-2">
                                <FaMapMarkerAlt className="mr-1" />
                                <span>{booking.location}</span>
                              </div>
                              
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
                              <div className="text-sm text-[#00C07E]">
                                Commission: ₦{booking.commission.toLocaleString()}
                              </div>
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
                        ? 'Start promoting your listings to get bookings'
                        : `No ${bookingFilter} bookings at the moment`}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Commission Tab */}
            {activeTab === 'commission' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-display font-bold">Commission</h1>
                </div>

                {/* Commission Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <p className="text-neutral-600 mb-1">Total Earnings</p>
                    <h3 className="text-2xl font-semibold mb-1">₦{agentStats.totalCommission.toLocaleString()}</h3>
                    <div className="flex items-center text-xs text-[#00C07E] font-medium">
                      <FaArrowUp className="mr-1" />
                      <span>15% from last month</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <p className="text-neutral-600 mb-1">Pending Commission</p>
                    <h3 className="text-2xl font-semibold mb-1">₦{agentStats.pendingCommission.toLocaleString()}</h3>
                    <p className="text-xs text-neutral-600">From {agentStats.totalBookings} bookings</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <p className="text-neutral-600 mb-1">Commission Rate</p>
                    <h3 className="text-2xl font-semibold mb-1">10%</h3>
                    <p className="text-xs text-neutral-600">Standard rate</p>
                  </div>
                </div>

                {/* Commission History */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Commission History</h2>
                    <select
                      value={commissionPeriod}
                      onChange={(e) => setCommissionPeriod(e.target.value)}
                      className="text-sm border-none focus:ring-1 focus:ring-[#00C07E]"
                    >
                      <option value="weekly">This Week</option>
                      <option value="monthly">This Month</option>
                      <option value="yearly">This Year</option>
                    </select>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Booking</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Guest</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Dates</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Total Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Commission</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {bookings.map(booking => (
                          <tr key={booking.id}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-lg overflow-hidden mr-3">
                                  <img src={booking.image} alt={booking.listingTitle} className="h-full w-full object-cover" />
                                </div>
                                <div className="text-sm">{booking.listingTitle}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
                                  <img src={booking.guestImage} alt={booking.guestName} className="h-full w-full object-cover" />
                                </div>
                                <div className="text-sm">{booking.guestName}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm">
                                {format(booking.checkIn, 'MMM d')} - {format(booking.checkOut, 'MMM d')}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm">₦{booking.totalPrice.toLocaleString()}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm font-medium text-[#00C07E]">
                                ₦{booking.commission.toLocaleString()}
                              </div>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AgentDashboardPage