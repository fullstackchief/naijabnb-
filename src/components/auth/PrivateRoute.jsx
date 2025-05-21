import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!user) {
    // Redirect to login and save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute