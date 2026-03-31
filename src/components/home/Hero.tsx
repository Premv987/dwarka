'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function Hero() {
  const router = useRouter()
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat"
        style={{ backgroundAttachment: 'fixed' }}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
      </div>

      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary mb-6 drop-shadow-lg">
            Pure Veg Taste with<br />Premium Delight
          </h1>
          <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto mb-10 font-medium">
            Experience the culinary artistry of Dwarka Veg Delight. 
            An exclusive botanical estate for vegetarian dining in Nallasopara.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-gradient-to-r from-primary to-accent-green hover:opacity-90 transition-opacity" onClick={() => router.push('/order')}>
              Order Now
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-primary text-primary hover:bg-primary/10 transition-colors" onClick={() => router.push('/menu')}>
              View Menu
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
