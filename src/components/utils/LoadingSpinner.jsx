import React from 'react'

function LoadingSpinner({ size = 'default', light = false }) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    default: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  }

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        animate-spin rounded-full 
        ${light ? 'border-white/20 border-t-white' : 'border-neutral-200 border-t-primary-500'}
      `}
    />
  )
}

export default LoadingSpinner