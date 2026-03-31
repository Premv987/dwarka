import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { v4 as uuidv4 } from 'uuid'

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret',
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, currency = 'INR', notes } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    // Razorpay expects amount in paise (multiply by 100)
    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `rcpt_${uuidv4()}`.substring(0, 39),
      notes: notes || {},
    }

    const order = await razorpay.orders.create(options)
    
    return NextResponse.json({ order }, { status: 200 })
  } catch (error: unknown) {
    console.error('Error creating Razorpay order:', error)
    
    // Razorpay puts the actual error details inside error.error nested object
    const e = error as { message?: string, error?: { description?: string } }
    const razorpayError = e?.error?.description || e?.message || 'Internal Server Error'

    return NextResponse.json(
      { error: razorpayError },
      { status: 500 }
    )
  }
}
