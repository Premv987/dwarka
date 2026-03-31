import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, MessageCircle, Clock, ExternalLink } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-primary mb-4">Get in Touch</h1>
          <p className="text-muted-foreground w-full max-w-2xl mx-auto">
            We&apos;d love to hear from you. Reach out for reservations, party hall bookings, or just an amazing meal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <Card className="bg-surface/50 backdrop-blur-md border border-primary/20 hover:border-primary/50 transition-colors">
              <CardContent className="p-8 flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-foreground mb-2">Our Location</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Dwarka Veg Delight<br />
                    Shop No. 12, Golden Leaf Complex,<br />
                    Nallasopara West, Station Road,<br />
                    Mumbai, Maharashtra - 401203
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-surface/50 backdrop-blur-md border border-primary/20">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-foreground font-medium">Timings</h3>
                  <p className="text-muted-foreground text-sm">Monday - Sunday<br />9:00 AM – 11:00 PM</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/50 backdrop-blur-md border border-primary/20">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <h3 className="font-serif text-foreground font-medium mb-1">Direct Ordering</h3>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
                    <MessageCircle className="w-4 h-4" /> WhatsApp Order
                  </Button>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 gap-2">
                    <Phone className="w-4 h-4" /> Click to Call
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-surface/50 backdrop-blur-md border border-primary/20">
              <CardContent className="p-6">
                 <h3 className="font-serif text-lg text-foreground mb-4">Order via Partners</h3>
                 <div className="flex gap-4 flex-col sm:flex-row">
                    <Button variant="outline" className="flex-1 border-white/10 hover:border-red-500 hover:text-red-500 justify-between items-center group">
                      Zomato 
                      <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    </Button>
                    <Button variant="outline" className="flex-1 border-white/10 hover:border-orange-500 hover:text-orange-500 justify-between items-center group">
                      Swiggy
                      <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    </Button>
                 </div>
              </CardContent>
            </Card>
          </div>

          <div className="h-[600px] rounded-3xl overflow-hidden border border-primary/20 shadow-2xl relative">
            {/* Embedded Google Maps Placeholder */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3763.502901968817!2d72.81223961536768!3d19.41738598689408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9bdc436b7fd%3A0xe54e17e3be9f6fb6!2sNalasopara%20West%2C%20Nala%20Sopara%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              className="absolute inset-0 grayscale contrast-125 dark:opacity-80 mix-blend-luminosity"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none bg-primary mix-blend-overlay opacity-20" />
          </div>
        </div>
      </div>
    </div>
  )
}
