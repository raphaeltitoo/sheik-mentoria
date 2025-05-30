import Header from "@/components/landing/header"
import HeroSection from "@/components/landing/hero-section"
import FeaturesSection from "@/components/landing/features-section"
import Footer from "@/components/landing/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
