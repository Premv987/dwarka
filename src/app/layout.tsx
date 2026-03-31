import type { Metadata } from 'next'
import { Noto_Serif, Manrope } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/sonner'
import { CartDrawer } from '@/components/cart/CartDrawer'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dwarka Veg Delight | Premium Vegetarian Restaurant',
  description: 'Pure Veg Taste with Premium Delight. Authentic Indian and global vegetarian cuisine in Nallasopara.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${notoSerif.variable} ${manrope.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans bg-background text-foreground">
        <Navbar />
        <CartDrawer />
        <main className="flex-1 relative">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
