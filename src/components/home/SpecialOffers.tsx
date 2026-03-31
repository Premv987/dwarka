'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Clock, CalendarCheck } from "lucide-react"
import Image from "next/image"

export function SpecialOffers() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 45, seconds: 30 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="container px-4 mx-auto space-y-12 relative z-10">
        
        {/* Special Offer Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary-foreground border border-primary/20 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative"
        >
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-[url('https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800')] bg-cover mix-blend-overlay hidden md:block" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Limited Time</span>
              <h3 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Free Dessert on Orders Above ₹599</h3>
              <p className="text-muted-foreground w-full md:max-w-md">Enjoy a complimentary Gulab Jamun or Ice Cream when you order premium vegetarian delights online.</p>
            </div>
            
            <div className="flex flex-col items-center gap-4 bg-background/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 text-primary">
                <Clock className="w-5 h-5" />
                <span className="font-semibold text-sm">Offer ends in</span>
              </div>
              <div className="flex gap-4 text-center">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold font-serif">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-xs text-muted-foreground uppercase">Hours</span>
                </div>
                <span className="text-3xl font-bold text-primary/50">:</span>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold font-serif">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-xs text-muted-foreground uppercase">Mins</span>
                </div>
                <span className="text-3xl font-bold text-primary/50">:</span>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold font-serif">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-xs text-muted-foreground uppercase">Secs</span>
                </div>
              </div>
              <Button className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                Claim Offer
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Party Hall Teaser */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden h-80 flex items-center shadow-lg"
        >
          <Image 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop" 
            alt="Premium Party Hall" 
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          
          <div className="relative z-10 p-8 md:p-16 max-w-2xl">
            <h3 className="text-3xl md:text-5xl font-serif text-primary mb-4 drop-shadow">Host Your Grand Events</h3>
            <p className="text-lg text-white/90 mb-8 font-medium">
              Celebrate weddings, birthdays, and corporate events in our luxurious AC Party Hall with premium vegetarian catering. Capacity: 100-200 guests.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              <CalendarCheck className="w-4 h-4" /> Book Hall Now
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
