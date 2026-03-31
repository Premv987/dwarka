'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, ShoppingCart, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useStore } from '@/store/useStore'

export function Navbar() {
  const { cart, toggleCart } = useStore()
  const router = useRouter()

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold font-serif text-primary">Dwarka Veg Delight</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">Home</Link>
          <Link href="/menu" className="transition-colors hover:text-primary">Menu</Link>
          <Link href="/reserve" className="transition-colors hover:text-primary">Reservations</Link>
          <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => toggleCart()}>
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                  {cartItemsCount}
                </span>
              )}
            </div>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => router.push('/admin')}>
            <User className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger className="md:hidden flex items-center justify-center p-2 text-foreground hover:bg-surface rounded-md transition-colors">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-border">
              <div className="flex flex-col gap-6 mt-8 font-serif text-lg">
                <Link href="/" className="hover:text-primary">Home</Link>
                <Link href="/menu" className="hover:text-primary">Menu</Link>
                <Link href="/reserve" className="hover:text-primary">Table Reservation</Link>
                <Link href="/contact" className="hover:text-primary">Contact</Link>
                <Link href="/admin" className="hover:text-primary pt-6 border-t border-border">Admin Dashboard</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
