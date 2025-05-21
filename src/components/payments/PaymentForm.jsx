import React, { useState } from 'react'
import { FaCreditCard, FaLock } from 'react-icons/fa'
import PaystackButton from './PaystackButton'
import { paystackApi } from '../../lib/paystack'
import { useAuth } from '../../contexts/AuthContext'

function PaymentForm({ booking, onPaymentComplete }) {
  const { user } = useAuth()
  const [selectedMethod, setSelectedMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  const handlePaymentSuccess = async (response) => {
    setIsProcessing(true)
    setError('')

    try {
      // Verify transaction
      const verification = await paystackApi.verifyTransaction(response.reference)
      
      if (verification.data.status === 'success') {
        // Process booking payment
        await paystackApi.processBookingPayment(booking.id, {
          ...verification.data,
          payment_method_id: null // Add payment method if saved
        })
        
        onPaymentComplete()
      } else {
        setError('Payment verification failed')
      }
    } catch (err) {
      setError(err.message || 'Payment processing failed')
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePaymentClose = () => {
    setError('Payment was cancelled')
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Payment Details</h2>
        <div className="flex items-center text-sm text-neutral-600">
          <FaLock className="mr-2" />
          <span>Secure Payment</span>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Payment Method
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className={`p-4 border rounded-lg flex items-center justify-center transition-colors ${
              selectedMethod === 'card'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-neutral-300 hover:border-neutral-400'
            }`}
            onClick={() => setSelectedMethod('card')}
          >
            <FaCreditCard className="mr-2" />
            <span>Card Payment</span>
          </button>
          <button
            type="button"
            className={`p-4 border rounded-lg flex items-center justify-center transition-colors ${
              selectedMethod === 'bank'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-neutral-300 hover:border-neutral-400'
            }`}
            onClick={() => setSelectedMethod('bank')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
              <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
              <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
              <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
            </svg>
            <span>Bank Transfer</span>
          </button>
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-6">
        <div className="flex justify-between items-center mb-4 text-sm">
          <span className="text-neutral-600">Subtotal</span>
          <span>₦{booking?.totalPrice?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-sm">
          <span className="text-neutral-600">Service Fee</span>
          <span>₦{(booking?.totalPrice * 0.1)?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-sm">
          <span className="text-neutral-600">Tax</span>
          <span>₦{(booking?.totalPrice * 0.05)?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mb-6 text-lg font-semibold">
          <span>Total</span>
          <span>₦{(booking?.totalPrice * 1.15)?.toLocaleString()}</span>
        </div>

        {selectedMethod === 'card' ? (
          <PaystackButton
            amount={booking?.totalPrice * 1.15}
            email={user?.email}
            metadata={{
              booking_id: booking?.id,
              custom_fields: [
                {
                  display_name: "Booking Reference",
                  variable_name: "booking_ref",
                  value: booking?.id
                }
              ]
            }}
            onSuccess={handlePaymentSuccess}
            onClose={handlePaymentClose}
            className={`btn btn-primary w-full ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </PaystackButton>
        ) : (
          <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
            <h3 className="font-medium mb-2">Bank Transfer Details</h3>
            <div className="space-y-2 text-sm text-neutral-600">
              <p>Bank: First Bank Nigeria</p>
              <p>Account Name: NijaBnB Limited</p>
              <p>Account Number: 0123456789</p>
              <p className="text-xs mt-4">
                Please use your booking reference as payment reference
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentForm