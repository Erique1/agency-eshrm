import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section"
import { ProcessSection } from "@/components/home/process-section"
import { CaseStudiesSection } from "@/components/home/case-studies-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { ClientsCarousel } from "@/components/home/clients-carousel"
import { MissionSection } from "@/components/home/mission-section"
import { FAQSection } from "@/components/home/faq-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <ProcessSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <ClientsCarousel />
        <MissionSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
