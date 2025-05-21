import React from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold mb-4">Something went wrong</h2>
            <p className="text-neutral-600 mb-6">We're sorry for the inconvenience. Please try again.</p>
            <div className="space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Refresh Page
              </button>
              <Link to="/" className="btn btn-outline">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary