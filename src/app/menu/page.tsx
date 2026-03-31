'use client'

import { useState } from 'react'
import { menuData, menuCategories, Category, MenuItem } from '@/data/menu'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useStore } from '@/store/useStore'
import { Search, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [jainOnly, setJainOnly] = useState(false)
  
  const addToCart = useStore((state) => state.addToCart)

  const handleAddToCart = (item: MenuItem) => {
    addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image })
    toast.success(`${item.name} added to cart`, {
      style: { background: '#1a3a2a', color: '#d4af37', border: '1px solid #d4af37' }
    })
  }

  const filteredMenu = menuData.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesJain = jainOnly ? item.isJainAvailable : true
    return matchesCategory && matchesSearch && matchesJain
  })

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Our Premium Menu</h1>
          <p className="text-muted-foreground w-full max-w-2xl mx-auto">Explore our wide variety of strictly vegetarian delights prepared with absolute purity.</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for dishes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-surface text-foreground placeholder:text-muted-foreground border-primary/20 rounded-xl focus-visible:ring-primary"
            />
          </div>
          
          <div className="flex items-center gap-3 bg-surface p-2 rounded-xl border border-primary/10">
            <span className="text-sm font-medium text-foreground px-2">Jain Options</span>
            <Button 
              variant={jainOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setJainOnly(!jainOnly)}
              className={`rounded-lg ${jainOnly ? 'bg-primary text-primary-foreground' : 'text-muted-foreground border-primary/20 hover:text-primary hover:border-primary'}`}
            >
              {jainOnly ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </div>

        {/* Categories Tab Row */}
        <ScrollArea className="w-full whitespace-nowrap mb-10 pb-4">
          <div className="flex w-max space-x-2">
            <Button
              variant={activeCategory === 'All' ? 'default' : 'outline'}
              className={`rounded-full px-6 ${activeCategory === 'All' ? 'bg-primary text-primary-foreground' : 'text-foreground border-primary/20 hover:text-primary'}`}
              onClick={() => setActiveCategory('All')}
            >
              All
            </Button>
            {menuCategories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                className={`rounded-full px-6 transition-all ${activeCategory === cat ? 'bg-primary text-primary-foreground' : 'text-foreground border-primary/20 hover:text-primary hover:bg-primary/5'}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible hover:visible" />
        </ScrollArea>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full bg-card/40 backdrop-blur-md border border-white/5 hover:border-primary/40 hover:shadow-xl transition-all group overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-2">
                        {item.isBestseller && (
                          <Badge className="bg-primary/90 text-primary-foreground hover:bg-primary border-none shadow-sm backdrop-blur-md">
                            Bestseller
                          </Badge>
                        )}
                        {item.isJainAvailable && (
                          <Badge variant="outline" className="bg-background/80 text-primary border-primary backdrop-blur-md cursor-help" title="Jain Option Available">
                            Jain
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-serif text-xl font-bold text-foreground leading-tight">{item.name}</h3>
                          <span className="font-bold text-primary whitespace-nowrap ml-2">₹{item.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                      </div>
                      
                      <Button 
                        onClick={() => handleAddToCart(item)}
                        className="w-full mt-6 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors group-hover:shadow-md"
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-serif text-foreground">No dishes found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
