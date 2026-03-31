import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret'

    // Generate signature locally to verify against the one sent by Razorpay
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex')

    if (generated_signature === razorpay_signature) {
      // Payment is verified
      return NextResponse.json({ verified: true, message: 'Payment verified successfully' }, { status: 200 })
    } else {
      // Signature mismatch
      return NextResponse.json({ verified: false, error: 'Invalid Payment Signature' }, { status: 400 })
    }
  } catch (error: unknown) {
    console.error('Error verifying Razorpay payment:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
