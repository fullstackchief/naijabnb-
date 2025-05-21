import React from 'react'
import { usePaystackPayment } from 'react-paystack'

function PaystackButton({ 
  amount, 
  email, 
  metadata,
  onSuccess,
  onClose,
  children,
  className = "btn btn-primary w-full",
  disabled = false
}) {
  const config = {
    reference: `ref_${Date.now()}`,
    email,
    amount: amount * 100, // Convert to kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    metadata
  }

  const initializePayment = usePaystackPayment(config)

  const handlePayment = () => {
    initializePayment(
      (response) => {
        // Payment successful
        onSuccess(response)
      },
      () => {
        // Payment cancelled
        onClose?.()
      }
    )
  }

  return (
    <button 
      type="button"
      onClick={handlePayment}
      className={className}
      disabled={disabled}
      aria-label="Make payment"
    >
      {children}
    </button>
  )
}

export default PaystackButton