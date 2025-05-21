import React, { useState } from 'react'
import DocumentUpload from '../uploads/DocumentUpload'

function VerificationDocumentUpload() {
  const [error, setError] = useState('')

  const handleUpload = (files) => {
    // Handle the uploaded files
    console.log('Uploaded documents:', files)
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

      <DocumentUpload
        bucket="verifications"
        folder="documents"
        maxSize={5}
        maxFiles={1}
        accept=".pdf,.jpg,.png"
        onUpload={handleUpload}
        onError={handleError}
      />
    </div>
  )
}

export default VerificationDocumentUpload