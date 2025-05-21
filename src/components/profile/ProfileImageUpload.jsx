import React, { useState } from 'react'
import ImageUpload from '../uploads/ImageUpload'

function ProfileImageUpload() {
  const [error, setError] = useState('')

  const handleUpload = (files) => {
    // Handle the uploaded files
    console.log('Uploaded files:', files)
  }

  const handleError = (errorMessage) => {
    setError(errorMessage)
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
          {error}
        </div>
      )}

      <ImageUpload
        bucket="avatars"
        folder="profile"
        maxSize={2}
        maxFiles={1}
        accept="image/jpeg,image/png"
        onUpload={handleUpload}
        onError={handleError}
      />
    </div>
  )
}

export default ProfileImageUpload