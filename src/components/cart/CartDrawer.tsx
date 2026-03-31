'use client'

import { useStore } from "@/store/useStore"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function CartDrawer() {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart } = useStore()
  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)
  const router = useRouter()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryCharge = subtotal > 499 ? 0 : 50
  const gst = subtotal * 0.05
  const total = subtotal + deliveryCharge + gst - discount

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'WELCOME50' && subtotal >= 500) {
      setDiscount(50)
    } else {
      setDiscount(0)
    }
  }

  const handleCheckout = () => {
    toggleCart(false)
    router.push('/order')
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-md bg-background border-l border-primary/20 flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-primary/10">
          <SheetTitle className="font-serif flex items-center gap-2 text-2xl text-primary">
            <ShoppingBag className="w-6 h-6" /> Your Order
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
            <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg">Your cart is empty.</p>
            <Button onClick={() => toggleCart(false)} variant="outline" className="mt-4 text-primary border-primary">
              Continue Browsing
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-surface border border-white/5 hover:border-primary/20 transition-colors">
                    {item.image && (
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-foreground text-sm line-clamp-2 leading-tight">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors ml-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-primary">₹{item.price}</span>
                        <div className="flex items-center gap-2 bg-background rounded-md border border-border px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-muted-foreground hover:text-white transition-colors" disabled={item.quantity <= 1}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-muted-foreground hover:text-white transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-2">
                <Input 
                  placeholder="Coupon code (e.g. WELCOME50)" 
                  value={coupon} 
                  onChange={(e) => setCoupon(e.target.value)}
                  className="bg-surface border-border focus-visible:ring-primary"
                />
                <Button onClick={handleApplyCoupon} variant="outline" className="text-primary border-primary shrink-0">
                  Apply
                </Button>
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-primary/20 bg-surface/50 backdrop-blur-md">
              <div className="space-y-3 text-sm text-foreground/80 mb-6 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-foreground">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="text-foreground">{deliveryCharge === 0 ? <span className="text-primary">Free</span> : `₹${deliveryCharge.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="text-foreground">₹{gst.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-4 text-lg font-bold">
                  <span className="text-foreground">Total to pay</span>
                  <span className="text-primary font-serif">₹{total.toFixed(2)}</span>
                </div>
              </div>
              <Button onClick={handleCheckout} className="w-full bg-gradient-to-r from-primary to-accent-green hover:opacity-90 py-6 text-lg">
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
