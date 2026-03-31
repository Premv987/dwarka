'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, ShoppingBag, Utensils, Users, TrendingUp } from "lucide-react"

// Mock data
const recentOrders = [
  { id: "ORD-1209", customer: "Rahul S.", amount: 850, status: "Preparing", time: "10 mins ago" },
  { id: "ORD-1210", customer: "Pooja M.", amount: 1240, status: "Delivered", time: "1 hour ago" },
  { id: "ORD-1211", customer: "Amit R.", amount: 450, status: "Out for Delivery", time: "25 mins ago" },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex h-screen bg-background pt-16 mt-[-64px]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-surface">
        <div className="p-6">
          <h2 className="text-xl font-serif text-primary font-bold">Admin Portal</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-surface-bright hover:text-foreground'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Overview
          </button>
          <button 
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-surface-bright hover:text-foreground'}`}
          >
            <ShoppingBag className="w-5 h-5" /> Orders
          </button>
          <button 
            onClick={() => setActiveTab("menu")}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'menu' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-surface-bright hover:text-foreground'}`}
          >
            <Utensils className="w-5 h-5" /> Menu CRUD
          </button>
          <button 
            onClick={() => setActiveTab("reservations")}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'reservations' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-surface-bright hover:text-foreground'}`}
          >
            <Users className="w-5 h-5" /> Reservations
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif text-foreground capitalize">{activeTab}</h1>
            <Badge variant="outline" className="text-primary border-primary">Admin Active</Badge>
          </div>

          <TabsContent value="overview" className="m-0 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-surface border-white/5">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Today&apos;s Revenue</CardTitle>
                  <TrendingUp className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-serif text-foreground">₹24,500</div>
                  <p className="text-xs text-primary mt-1">+12% from yesterday</p>
                </CardContent>
              </Card>
              <Card className="bg-surface border-white/5">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Orders</CardTitle>
                  <ShoppingBag className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-serif text-foreground">14</div>
                  <p className="text-xs text-muted-foreground mt-1">4 out for delivery</p>
                </CardContent>
              </Card>
              <Card className="bg-surface border-white/5">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Table Reservations</CardTitle>
                  <Users className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-serif text-foreground">8</div>
                  <p className="text-xs text-muted-foreground mt-1">2 Party Hall enquiries</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-surface border-white/5 col-span-2">
              <CardHeader>
                <CardTitle className="font-serif">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full">
                  <div className="space-y-4 pr-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-background border border-border">
                        <div className="flex gap-4 items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {order.customer.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.id} • {order.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">₹{order.amount}</p>
                          <Badge variant="outline" className={`mt-1 text-[10px] ${
                            order.status === 'Preparing' ? 'border-yellow-500 text-yellow-500' : 
                            order.status === 'Delivered' ? 'border-green-500 text-green-500' : 'border-blue-500 text-blue-500'
                          }`}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="m-0">
            <Card className="bg-surface border-white/5 py-20 text-center">
              <Utensils className="w-12 h-12 mx-auto text-primary opacity-50 mb-4" />
              <h3 className="text-2xl font-serif text-primary">Menu Management</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">This module connects to Supabase and Cloudinary. Use it to add, edit, or remove dishes, adjust prices, and toggle stock dynamically.</p>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  )
}
