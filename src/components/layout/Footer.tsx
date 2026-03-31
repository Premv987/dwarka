import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-serif text-xl font-bold text-primary mb-4">Dwarka Veg Delight</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pure Veg Taste with Premium Delight. Bringing authentic flavors to Nallasopara.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/menu" className="hover:text-primary transition-colors">Our Menu</Link></li>
            <li><Link href="/reserve" className="hover:text-primary transition-colors">Book a Table</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Nallasopara West, Mumbai</li>
            <li>Phone: +91 98765 43210</li>
            <li>Email: hello@dwarkaveg.com</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-foreground">Opening Hours</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Monday - Sunday</li>
            <li>9:00 AM - 11:00 PM</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-10 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Dwarka Veg Delight. All rights reserved.
      </div>
    </footer>
  )
}
