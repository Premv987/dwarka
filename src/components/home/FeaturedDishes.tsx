'use client'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { motion } from "framer-motion"

const featuredDishes = [
  {
    id: 1,
    name: "Paneer Tikka Masala",
    price: "₹349",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
    desc: "Cottage cheese cubes marinated in spices and yogurt, grilled and simmered in a rich tomato gravy."
  },
  {
    id: 2,
    name: "Masala Dosa",
    price: "₹149",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=800",
    desc: "Crispy rice crepe filled with spiced potato curry, served with sambar and chutneys."
  },
  {
    id: 3,
    name: "Cheese Pav Bhaji",
    price: "₹189",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800",
    desc: "Spicy mixed vegetable mash topped with melting cheese, served with buttered bread rolls."
  },
  {
    id: 4,
    name: "Veg Biryani",
    price: "₹299",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    desc: "Aromatic basmati rice cooked with mixed vegetables, saffron, and traditional whole spices."
  }
]

export function FeaturedDishes() {
  return (
    <section className="py-20 bg-background/95">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">Chef&apos;s Signatures</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Discover the culinary masterpieces crafted with authentic spices and pure ingredients.</p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {featuredDishes.map((dish, index) => (
              <CarouselItem key={dish.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/40 backdrop-blur-xl border-primary/20 overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                    <CardContent className="p-0">
                      <div className="relative h-64 w-full overflow-hidden">
                        {/* Using img tag to avoid next/image domain config errors for pure prototypes */}
                        <img 
                          src={dish.image} 
                          alt={dish.name}
                          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-serif text-xl font-bold text-foreground">{dish.name}</h3>
                          <span className="text-primary font-bold">{dish.price}</span>
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2">{dish.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="border-primary/50 text-primary hover:bg-primary/20" />
            <CarouselNext className="border-primary/50 text-primary hover:bg-primary/20" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
