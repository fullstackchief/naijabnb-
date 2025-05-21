import React, { useState } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

function DisputeForm({ booking, onSubmit }) {
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Here you would submit the dispute to your backend
      await onSubmit({ reason, details })
    } catch (err) {
      setError('Failed to submit dispute. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <FaExclamationTriangle className="text-warning mr-3" size={24} />
        <h2 className="text-xl font-semibold">Open Payment Dispute</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Reason for Dispute
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="input"
            required
          >
            <option value="">Select a reason</option>
            <option value="double_charge">Double Charge</option>
            <option value="service_not_received">Service Not Received</option>
            <option value="incorrect_amount">Incorrect Amount</option>
            <option value="unauthorized">Unauthorized Transaction</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Dispute Details
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="input min-h-[120px]"
            placeholder="Please provide detailed information about your dispute..."
            required
          />
        </div>

        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-warning mb-2">Important Notice</h3>
          <p className="text-sm text-neutral-600">
            Before submitting a dispute, we recommend contacting the host or our support team first.
            Disputes should only be opened for serious payment-related issues.
          </p>
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Dispute'}
        </button>
      </form>
    </div>
  )
}

export default DisputeForm