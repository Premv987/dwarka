'use client'

import { useStore } from "@/store/useStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { CheckCircle2, ChevronLeft, MapPin } from "lucide-react"
import { useState } from "react"

export default function OrderPage() {
  const { cart, clearCart } = useStore()
  const router = useRouter()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("online")

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen container mx-auto flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-serif text-primary mb-4">Your Cart is Empty</h2>
        <Button onClick={() => router.push('/menu')} variant="outline" className="border-primary text-primary">
          Browse Menu
        </Button>
      </div>
    )
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryCharge = subtotal > 499 ? 0 : 50
  const gst = subtotal * 0.05
  const total = subtotal + deliveryCharge + gst

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()

    if (paymentMethod === 'cod') {
      setOrderPlaced(true)
      clearCart()
      return
    }

    const res = await loadRazorpay()
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?")
      return
    }

    try {
      const req = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, notes: { customer: 'test' } })
      })
      const data = await req.json()

      if (!req.ok) {
        console.error("Payment API Error:", data)
        alert(`Payment Initialization Failed: ${data.error || 'Server Error'}\n\nDid you restart the dev server after adding .env keys?`)
        return
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'dummy',
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Dwarka Veg Delight",
        description: "Premium Vegetarian Cuisine",
        order_id: data.order.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (response: any) {
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }
          const verify = await fetch('/api/razorpay/verify', {
            method: 'POST',
            body: JSON.stringify(verifyData),
          })
          if (verify.ok) {
            setOrderPlaced(true)
            clearCart()
          } else {
             alert('Payment verification failed!')
          }
        },
        prefill: {
          name: "Guest",
          contact: "9999999999"
        },
        theme: {
          color: "#1a3a2a"
        }
      }
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const paymentObject = new (window as any).Razorpay(options)
      paymentObject.open()

    } catch (err) {
      console.error(err)
      alert("Error initiating payment")
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] container mx-auto flex flex-col items-center justify-center p-4 text-center">
        <CheckCircle2 className="w-20 h-20 text-primary mb-6 animate-pulse" />
        <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Order Placed Successfully!</h1>
        <p className="text-muted-foreground w-full max-w-lg mx-auto mb-8">
          Thank you for choosing Dwarka Veg Delight. Your order is being prepared and will be delivered shortly.
        </p>
        <div className="bg-surface p-6 rounded-2xl border border-primary/20 w-full max-w-sm mb-8">
          <p className="text-sm text-foreground mb-2">Order ID: <span className="font-bold font-mono text-primary">DWD-{Math.floor(Math.random() * 9000000)}</span></p>
          <p className="text-sm text-foreground">Estimated Delivery: <span className="font-bold">35 mins</span></p>
        </div>
        <Button onClick={() => router.push('/')} className="bg-primary px-8">
          Back to Home
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <button onClick={() => router.back()} className="flex items-center text-primary mb-6 hover:underline">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-surface border-white/10 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-xl">
                  <MapPin className="w-5 h-5 text-primary" /> Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form id="checkout-form" onSubmit={handleCheckout} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" required className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" required className="bg-background border-border" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Complete Address</Label>
                    <Input id="address" required className="bg-background border-border" placeholder="Flat No, Wing, Building Name, Landmark" />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-surface border-white/10 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="online" onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-3 bg-background p-4 rounded-xl border border-border">
                    <RadioGroupItem value="online" id="online" className="text-primary border-primary" />
                    <Label htmlFor="online" className="cursor-pointer flex-1 font-medium text-base">Pay Online (Razorpay)</Label>
                  </div>
                  <div className="flex items-center space-x-3 bg-background p-4 rounded-xl border border-border">
                    <RadioGroupItem value="cod" id="cod" className="text-primary border-primary" />
                    <Label htmlFor="cod" className="cursor-pointer flex-1 font-medium text-base">Cash on Delivery (COD)</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-surface/50 backdrop-blur-md border-primary/20 sticky top-24">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 max-h-[30vh] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start text-sm border-b border-border pb-4">
                      <div>
                        <span className="font-medium text-foreground">{item.name}</span>
                        <div className="text-muted-foreground mt-1 text-xs">Qty: {item.quantity}</div>
                      </div>
                      <span className="font-bold text-primary">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-foreground font-medium">{deliveryCharge === 0 ? <span className="text-primary">Free</span> : `₹${deliveryCharge.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (5%)</span>
                    <span className="text-foreground font-medium">₹{gst.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-serif font-bold text-primary">₹{total.toFixed(2)}</span>
                  </div>
                  <Button type="submit" form="checkout-form" className="w-full bg-gradient-to-r from-primary to-accent-green text-primary-foreground py-6 text-lg hover:opacity-90">
                    {paymentMethod === 'online' ? 'Pay Securely' : 'Place Order'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
