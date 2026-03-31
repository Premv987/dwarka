'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { CalendarDays, Clock, Users, Flame } from "lucide-react"

export default function ReservePage() {
  const [guests, setGuests] = useState("2")
  const [isPartyHall, setIsPartyHall] = useState(false)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGuestChange = (val: string | null) => {
    if (!val) return
    setGuests(val)
    if (parseInt(val) >= 100) {
      setIsPartyHall(true)
    } else {
      setIsPartyHall(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          phone, 
          date, 
          time, 
          guests: parseInt(guests), 
          is_party_hall: isPartyHall 
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to submit reservation')
      }

      toast.success("Reservation Request Sent!", {
        description: "You will receive a WhatsApp confirmation shortly.",
        style: { background: '#1a3a2a', color: '#d4af37', border: '1px solid #d4af37' }
      })
      setName("")
      setPhone("")
      setDate("")
      setTime("")
      setGuests("2")
      setIsPartyHall(false)
    } catch (error: any) {
      toast.error(error.message || "Failed to submit reservation. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <div 
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      <div className="container relative z-10 max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-serif text-primary mb-6 drop-shadow-md">
            Reserve Your Experience
          </h1>
          <p className="text-lg text-foreground/90 mb-8 max-w-md">
            Whether an intimate dinner or a grand celebration, secure your table at Nallasopara&apos;s finest vegetarian destination.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary mt-1"><CalendarDays className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg text-foreground mb-1">Advance Booking</h4>
                <p className="text-muted-foreground text-sm">Book up to 30 days in advance for regular dining.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary mt-1"><Flame className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg text-foreground mb-1">Party Hall Available</h4>
                <p className="text-muted-foreground text-sm">Have a guest list of 100-200? Our AC Party Hall is perfectly suited for grand events.</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-surface/60 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-primary to-accent-green" />
          <CardHeader className="pb-6">
            <CardTitle className="font-serif text-2xl text-foreground">Book a Table</CardTitle>
            <CardDescription className="text-muted-foreground">Fill out the details below to request a reservation.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required value={name} onChange={e => setName(e.target.value)} className="bg-background/50 border-white/10 focus-visible:ring-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="bg-background/50 border-white/10 focus-visible:ring-primary" placeholder="+91" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    required 
                    min={new Date().toISOString().split("T")[0]} 
                    value={date} 
                    onChange={e => setDate(e.target.value)} 
                    className="bg-background/50 border-white/10 focus-visible:ring-primary cursor-pointer" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    required 
                    value={time} 
                    onChange={e => setTime(e.target.value)} 
                    className="bg-background/50 border-white/10 focus-visible:ring-primary cursor-pointer" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Number of Guests</Label>
                <Select value={guests} onValueChange={handleGuestChange}>
                  <SelectTrigger className="bg-background/50 border-white/10">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <SelectValue placeholder="Select guests" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-surface border-white/10 max-h-60">
                    {[2, 3, 4, 5, 6, 8, 10, 15, 20].map((num) => (
                      <SelectItem key={num} value={num.toString()}>{num} People</SelectItem>
                    ))}
                    <SelectItem value="50">50 People (Small Event)</SelectItem>
                    <SelectItem value="100">100 People (Party Hall)</SelectItem>
                    <SelectItem value="150">150 People (Party Hall)</SelectItem>
                    <SelectItem value="200">200 People (Party Hall)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isPartyHall && (
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-3">
                  <Flame className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/90">
                    You have selected a guest count suitable for our <strong className="text-primary">Party Hall</strong>. Our management team will call you to discuss catering and decorations.
                  </p>
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full h-12 mt-6 bg-gradient-to-r from-primary to-accent-green hover:opacity-90 text-lg">
                {isLoading ? "Processing..." : "Confirm Booking"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
