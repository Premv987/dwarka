'use client'

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const bestsellers = [
  { id: 1, name: "Veg Tawa Pulao", price: "₹220", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Special Pav Bhaji", price: "₹200", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Paneer Chilli", price: "₹280", image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Hakka Noodles", price: "₹250", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800" },
]

export function Bestsellers() {
  return (
    <section className="py-20 bg-surface">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">Our Bestsellers</h2>
            <p className="text-muted-foreground max-w-lg">The most loved dishes by our patrons in Nallasopara, prepared fresh every day.</p>
          </div>
          <Button variant="outline" className="hidden md:flex mt-6 md:mt-0 text-primary border-primary hover:bg-primary/20">
            View Full Menu
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden bg-card/50 backdrop-blur-md border border-white/5 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary border border-primary/20">
                      Bestseller
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-foreground mb-1">{item.name}</h3>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-bold text-primary text-xl">{item.price}</span>
                      <Button size="sm" className="bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border-transparent">
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-8 md:hidden text-primary border-primary">
          View Full Menu
        </Button>
      </div>
    </section>
  )
}
