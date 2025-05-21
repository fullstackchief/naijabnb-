import React from 'react'
import { format } from 'date-fns'
import { FaCheckCircle, FaDownload } from 'react-icons/fa'

function PaymentReceipt({ receipt, booking }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheckCircle size={32} />
        </div>
        <h2 className="text-xl font-semibold mb-1">Payment Successful</h2>
        <p className="text-neutral-600">Thank you for your booking!</p>
      </div>

      <div className="border-t border-b border-neutral-200 py-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-neutral-600">Receipt Number</span>
          <span className="font-medium">{receipt.receipt_number}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-neutral-600">Date</span>
          <span>{format(new Date(receipt.issued_at), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-600">Payment Status</span>
          <span className="px-2 py-1 bg-success/10 text-success rounded-full text-sm">
            Completed
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-neutral-600">Subtotal</span>
          <span>₦{receipt.subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-600">Service Fee</span>
          <span>₦{receipt.fees.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-600">Taxes</span>
          <span>₦{receipt.taxes.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-neutral-200 text-lg font-semibold">
          <span>Total</span>
          <span>₦{receipt.total.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-neutral-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium mb-2">Booking Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Check-in</span>
            <span>{format(new Date(booking.checkIn), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Check-out</span>
            <span>{format(new Date(booking.checkOut), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Guests</span>
            <span>{booking.guests}</span>
          </div>
        </div>
      </div>

      <button className="btn btn-outline w-full flex items-center justify-center">
        <FaDownload className="mr-2" />
        Download Receipt
      </button>
    </div>
  )
}

export default PaymentReceipt