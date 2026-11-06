import { HeroSection } from "@/components/home/hero"
import { Navbar } from "@/components/home/navbar"

export default function Page() {
  return (
    <div className="dark bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  )
}
