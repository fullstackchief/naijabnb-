import { supabase } from './supabase'

export const paystackApi = {
  // Verify transaction
  verifyTransaction: async (reference) => {
    const { data: { session } } = await supabase.auth.getSession()
    
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-paystack`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`
      },
      body: JSON.stringify({ reference })
    })

    if (!response.ok) {
      throw new Error('Failed to verify transaction')
    }

    return response.json()
  },

  // Process booking payment
  processBookingPayment: async (bookingId, transactionData) => {
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert([{
        booking_id: bookingId,
        amount: transactionData.amount / 100, // Convert from kobo to naira
        status: transactionData.status,
        payment_method_id: transactionData.payment_method_id,
        reference: transactionData.reference
      }])
      .select()
      .single()

    if (transactionError) throw transactionError

    // Update booking payment status
    const { error: bookingError } = await supabase
      .from('bookings')
      .update({ 
        payment_status: transactionData.status === 'success' ? 'captured' : 'failed',
        status: transactionData.status === 'success' ? 'confirmed' : 'pending'
      })
      .eq('id', bookingId)

    if (bookingError) throw bookingError

    // Create receipt if payment successful
    if (transactionData.status === 'success') {
      const { data: booking } = await supabase
        .from('bookings')
        .select('total_price')
        .eq('id', bookingId)
        .single()

      const { error: receiptError } = await supabase
        .from('payment_receipts')
        .insert([{
          transaction_id: transaction.id,
          booking_id: bookingId,
          receipt_number: `RCP-${Date.now()}`,
          subtotal: booking.total_price,
          taxes: Math.round(booking.total_price * 0.05),
          fees: Math.round(booking.total_price * 0.1),
          total: Math.round(booking.total_price * 1.15)
        }])

      if (receiptError) throw receiptError
    }

    return transaction
  }
}