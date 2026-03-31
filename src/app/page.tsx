import { Hero } from "@/components/home/Hero"
import { FeaturedDishes } from "@/components/home/FeaturedDishes"
import { Bestsellers } from "@/components/home/Bestsellers"
import { SpecialOffers } from "@/components/home/SpecialOffers"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDishes />
      <Bestsellers />
      <SpecialOffers />
    </>
  )
}
