import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { FaUsers, FaHome, FaChartBar, FaTicketAlt, FaMoneyBill, FaCog, FaSignOutAlt, FaBell, FaUserShield, FaExclamationTriangle } from 'react-icons/fa'

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Sample admin stats
  const stats = {
    totalUsers: 1245,
    totalListings: 358,
    totalBookings: 892,
    totalRevenue: 15420000,
    pendingVerifications: 12,
    openDisputes: 5,
    supportTickets: 8,
    userGrowth: 15, // percentage
    bookingGrowth: 22, // percentage
    revenueGrowth: 18 // percentage
  }

  // Sample recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: 2,
      type: 'listing_created',
      user: {
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
      },
      listing: {
        title: 'Luxury Villa in Lekki',
        price: 45000
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
    },
    {
      id: 3,
      type: 'booking_completed',
      user: {
        name: 'Michael Brown',
        email: 'michael@example.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
      },
      booking: {
        listingTitle: 'Beachfront Apartment',
        amount: 125000
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    }
  ]

  // Sample pending verifications
  const pendingVerifications = [
    {
      id: 1,
      type: 'host',
      user: {
        name: 'Emma Thompson',
        email: 'emma@example.com',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
      },
      documents: ['id_card.pdf', 'utility_bill.pdf'],
      submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    },
    {
      id: 2,
      type: 'agent',
      user: {
        name: 'David Wilson',
        email: 'david@example.com',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
      },
      documents: ['license.pdf', 'certificate.pdf'],
      submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
    }
  ]

  // Sample support tickets
  const supportTickets = [
    {
      id: 1,
      subject: 'Payment Issue',
      user: {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
      },
      status: 'open',
      priority: 'high',
      createdAt: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: 2,
      subject: 'Booking Cancellation',
      user: {
        name: 'Bob Wilson',
        email: 'bob@example.com',
        avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg'
      },
      status: 'in_progress',
      priority: 'medium',
      createdAt: new Date(Date.now() - 1000 * 60 * 60)
    }
  ]

  // Sample disputes
  const disputes = [
    {
      id: 1,
      booking: {
        id: 'BK123',
        title: 'Luxury Villa Stay',
        amount: 250000
      },
      user: {
        name: 'Carol Davis',
        email: 'carol@example.com',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
      },
      reason: 'Incorrect charges',
      status: 'opened',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
    },
    {
      id: 2,
      booking: {
        id: 'BK124',
        title: 'City Apartment Stay',
        amount: 180000
      },
      user: {
        name: 'Dan Brown',
        email: 'dan@example.com',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg'
      },
      reason: 'Service not received',
      status: 'under_review',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48)
    }
  ]

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'open':
        return 'bg-accent-100 text-accent-800'
      case 'in_progress':
        return 'bg-primary-100 text-primary-800'
      case 'resolved':
        return 'bg-success/10 text-success'
      case 'opened':
        return 'bg-error/10 text-error'
      case 'under_review':
        return 'bg-warning/10 text-warning'
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
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                  alt="Admin"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-semibold">Admin User</h2>
                <p className="text-neutral-500">Super Admin</p>
                <div className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium mt-2">
                  Active
                </div>
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('dashboard')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'dashboard' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaChartBar className="mr-3" />
                  <span>Dashboard</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('users')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'users' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaUsers className="mr-3" />
                  <span>Users</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('listings')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'listings' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaHome className="mr-3" />
                  <span>Listings</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('verifications')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'verifications' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaUserShield className="mr-3" />
                  <span>Verifications</span>
                  {stats.pendingVerifications > 0 && (
                    <span className="ml-auto bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-xs">
                      {stats.pendingVerifications}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={() => setActiveTab('support')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'support' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaTicketAlt className="mr-3" />
                  <span>Support</span>
                  {stats.supportTickets > 0 && (
                    <span className="ml-auto bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full text-xs">
                      {stats.supportTickets}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={() => setActiveTab('disputes')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'disputes' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaExclamationTriangle className="mr-3" />
                  <span>Disputes</span>
                  {stats.openDisputes > 0 && (
                    <span className="ml-auto bg-error/10 text-error px-2 py-0.5 rounded-full text-xs">
                      {stats.openDisputes}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={() => setActiveTab('revenue')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'revenue' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FaMoneyBill className="mr-3" />
                  <span>Revenue</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('settings')} 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-primary-50 text-primary-700' 
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
                  <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FaUsers className="text-primary-500" size={24} />
                      </div>
                      <div className="flex items-center text-success text-sm font-medium">
                        <span>+{stats.userGrowth}%</span>
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5L19 12L12 19M5 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-1">{stats.totalUsers.toLocaleString()}</h3>
                    <p className="text-neutral-600">Total Users</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                        <FaHome className="text-accent-500" size={24} />
                      </div>
                      <div className="flex items-center text-success text-sm font-medium">
                        <span>+{stats.bookingGrowth}%</span>
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5L19 12L12 19M5 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-1">{stats.totalListings.toLocaleString()}</h3>
                    <p className="text-neutral-600">Total Listings</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                        <FaMoneyBill className="text-success" size={24} />
                      </div>
                      <div className="flex items-center text-success text-sm font-medium">
                        <span>+{stats.revenueGrowth}%</span>
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5L19 12L12 19M5 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-1">₦{stats.totalRevenue.toLocaleString()}</h3>
                    <p className="text-neutral-600">Total Revenue</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                        <FaTicketAlt className="text-warning" size={24} />
                      </div>
                      <div className="flex items-center text-warning text-sm font-medium">
                        <span>{stats.supportTickets} Open</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-1">{stats.totalBookings.toLocaleString()}</h3>
                    <p className="text-neutral-600">Total Bookings</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Recent Activity</h2>
                    <button className="text-sm text-primary-600 hover:text-primary-700">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="flex items-start">
                        <img 
                          src={activity.user.avatar}
                          alt={activity.user.name}
                          className="w-10 h-10 rounded-full object-cover mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{activity.user.name}</p>
                              <p className="text-sm text-neutral-600">
                                {activity.type === 'user_registration' && 'Registered a new account'}
                                {activity.type === 'listing_created' && (
                                  <>
                                    Created a new listing: <span className="font-medium">{activity.listing.title}</span>
                                  </>
                                )}
                                {activity.type === 'booking_completed' && (
                                  <>
                                    Completed booking for <span className="font-medium">{activity.booking.listingTitle}</span>
                                  </>
                                )}
                              </p>
                            </div>
                            <span className="text-sm text-neutral-500">
                              {format(activity.timestamp, 'MMM d, h:mm a')}
                            </span>
                          </div>
                          {activity.type === 'listing_created' && (
                            <p className="text-sm text-success mt-1">
                              ₦{activity.listing.price.toLocaleString()} / night
                            </p>
                          )}
                          {activity.type === 'booking_completed' && (
                            <p className="text-sm text-success mt-1">
                              ₦{activity.booking.amount.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Verifications */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Pending Verifications</h2>
                    <button className="text-sm text-primary-600 hover:text-primary-700">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {pendingVerifications.map(verification => (
                      <div key={verification.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                        <div className="flex items-center">
                          <img 
                            src={verification.user.avatar}
                            alt={verification.user.name}
                            className="w-10 h-10 rounded-full object-cover mr-4"
                          />
                          <div>
                            <p className="font-medium">{verification.user.name}</p>
                            <p className="text-sm text-neutral-600">
                              {verification.type === 'host' ? 'Host Verification' : 'Agent Verification'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="btn btn-sm btn-outline text-error hover:bg-error/5">
                            Reject
                          </button>
                          <button className="btn btn-sm btn-primary">
                            Approve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Support Tickets */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Support Tickets</h2>
                    <button className="text-sm text-primary-600 hover:text-primary-700">
                      View All
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">User</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Subject</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Priority</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Created</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {supportTickets.map(ticket => (
                          <tr key={ticket.id}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <img 
                                  src={ticket.user.avatar}
                                  alt={ticket.user.name}
                                  className="w-8 h-8 rounded-full object-cover mr-3"
                                />
                                <div>
                                  <div className="font-medium">{ticket.user.name}</div>
                                  <div className="text-sm text-neutral-500">{ticket.user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">{ticket.subject}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(ticket.status)}`}>
                                {ticket.status.replace('_', ' ').charAt(0).toUpperCase() + ticket.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                ticket.priority === 'high' 
                                  ? 'bg-error/10 text-error'
                                  : ticket.priority === 'medium'
                                    ? 'bg-warning/10 text-warning'
                                    : 'bg-neutral-100 text-neutral-800'
                              }`}>
                                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-neutral-500">
                              {format(ticket.createdAt, 'MMM d, h:mm a')}
                            </td>
                            <td className="px-4 py-3">
                              <button className="btn btn-sm btn-primary">
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Disputes Tab */}
            {activeTab === 'disputes' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-display font-bold">Payment Disputes</h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <select className="input border-none focus:ring-1">
                          <option value="">All Statuses</option>
                          <option value="opened">Opened</option>
                          <option value="under_review">Under Review</option>
                          <option value="resolved">Resolved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <select className="input border-none focus:ring-1">
                          <option value="">Sort By</option>
                          <option value="newest">Newest First</option>
                          <option value="oldest">Oldest First</option>
                          <option value="amount_high">Amount: High to Low</option>
                          <option value="amount_low">Amount: Low to High</option>
                        </select>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search disputes..."
                          className="input pl-10"
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      {disputes.map(dispute => (
                        <div key={dispute.id} className="border border-neutral-200 rounded-lg p-6">
                          <div className="flex flex-wrap gap-6 justify-between">
                            <div className="flex items-start gap-4">
                              <img 
                                src={dispute.user.avatar}
                                alt={dispute.user.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <h3 className="font-semibold mb-1">{dispute.user.name}</h3>
                                <p className="text-sm text-neutral-600">{dispute.user.email}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(dispute.status)}`}>
                                    {dispute.status.replace('_', ' ').charAt(0).toUpperCase() + dispute.status.slice(1)}
                                  </span>
                                  <span className="text-sm text-neutral-500">
                                    {format(dispute.createdAt, 'MMM d, yyyy')}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-neutral-600 mb-1">Booking Reference</p>
                              <p className="font-medium mb-2">{dispute.booking.id}</p>
                              <p className="text-sm text-neutral-600 mb-1">Amount</p>
                              <p className="font-medium">₦{dispute.booking.amount.toLocaleString()}</p>
                            </div>

                            <div className="flex-1 min-w-[300px]">
                              <p className="text-sm text-neutral-600 mb-1">Reason for Dispute</p>
                              <p className="text-neutral-800">{dispute.reason}</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <button className="btn btn-sm btn-outline text-error hover:bg-error/5">
                                Reject
                              </button>
                              <button className="btn btn-sm btn-primary">
                                Review
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    
                    </div>
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

export default AdminDashboardPage