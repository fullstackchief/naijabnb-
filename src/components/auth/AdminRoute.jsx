import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function AdminRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  // Check if user is an admin
  const isAdmin = user?.user_metadata?.role === 'admin' || user?.user_metadata?.role === 'super_admin'

  if (!user || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default AdminRoute