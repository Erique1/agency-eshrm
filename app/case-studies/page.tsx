import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const caseStudies = [
  {
    id: "digital-transformation-hr",
    title: "Digital Transformation of HR Operations",
    client: "Leading Fintech Company",
    industry: "Financial Services",
    challenge:
      "Outdated HR processes causing inefficiencies and employee dissatisfaction in a rapidly growing fintech startup with 20+ employees across 5 countries.",
    solution:
      "Implemented a comprehensive HR digital transformation including automated workflows, self-service portals, and data-driven decision making tools.",
    results: [
      "40% reduction in HR administrative time",
      "85% employee satisfaction improvement",
      "60% faster onboarding process",
      "30% reduction in HR costs",
    ],
    testimonial:
      "ESHRM transformed our HR operations completely. We're now able to scale efficiently while maintaining excellent employee experience.",
    testimonialAuthor: "Sarah Chen, CHRO",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    services: ["Custom HR Solutions", "HR Policy Development"],
  },
  {
    id: "culture-transformation",
    title: "Culture Transformation Program",
    client: "Pan-African Manufacturing Corp",
    industry: "Manufacturing",
    challenge:
      "Siloed departments, low employee engagement, and resistance to change in a traditional manufacturing company with operations in 8 African countries.",
    solution:
      "Designed and implemented a comprehensive culture transformation program focusing on collaboration, innovation, and employee empowerment through structured change management.",
    results: [
      "35% increase in employee engagement",
      "50% reduction in turnover",
      "25% improvement in productivity",
      "Cross-functional collaboration improved by 60%",
    ],
    testimonial:
      "The cultural shift has been remarkable. Our teams now collaborate seamlessly, and innovation has become part of our DNA.",
    testimonialAuthor: "Michael Osei, CEO",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    services: ["Organizational Development", "Training & Workshops"],
  },
  {
    id: "leadership-development",
    title: "Leadership Development Initiative",
    client: "Regional Healthcare Network",
    industry: "Healthcare",
    challenge:
      "Leadership gaps and succession planning concerns in a growing healthcare organization with 15 facilities and 3,000+ employees.",
    solution:
      "Created a customized leadership development program including coaching, mentoring, and experiential learning for high-potential employees at all levels.",
    results: [
      "90% of participants promoted within 18 months",
      "Leadership readiness score improved by 65%",
      "Internal promotion rate increased to 75%",
      "Leadership bench strength doubled",
    ],
    testimonial:
      "Our leadership pipeline is now stronger than ever. The program has created a culture of continuous development and growth.",
    testimonialAuthor: "Dr. Amina Diallo, HR Director",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    services: ["Training & Workshops", "Performance Management"],
  },
  {
    id: "talent-strategy-retail",
    title: "Talent Acquisition Strategy Overhaul",
    client: "Retail Chain Expansion",
    industry: "Retail",
    challenge:
      "Difficulty attracting and retaining quality staff during rapid expansion from 50 to 200 stores across West Africa.",
    solution:
      "Developed a comprehensive talent acquisition strategy including employer branding, streamlined hiring processes, and robust onboarding programs.",
    results: [
      "Time-to-fill reduced by 45%",
      "Quality of hire improved by 40%",
      "First-year turnover reduced by 35%",
      "Employer brand recognition increased by 200%",
    ],
    testimonial:
      "ESHRM helped us build a talent engine that has fueled our expansion. We now attract top talent without the struggle.",
    testimonialAuthor: "Kwame Asante, VP Human Resources",
    image: "/images/afric.jpg",
    services: ["Talent Acquisition", "Training & Workshops"],
  },
  {
    id: "compliance-banking",
    title: "HR Compliance & Policy Modernization",
    client: "National Bank",
    industry: "Banking",
    challenge:
      "Outdated HR policies creating compliance risks and inconsistent practices across 120 branches and 5,000 employees.",
    solution:
      "Conducted comprehensive policy review, developed modern HR frameworks, and implemented systematic policy management across all locations.",
    results: [
      "100% regulatory compliance achieved",
      "Policy-related grievances reduced by 70%",
      "Manager decision consistency improved by 80%",
      "Audit findings reduced by 90%",
    ],
    testimonial:
      "The peace of mind from knowing we're fully compliant is invaluable. ESHRM's systematic approach transformed our HR governance.",
    testimonialAuthor: "Fatou Ba, Chief Compliance Officer",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    services: ["HR Policy Development", "Custom HR Solutions"],
  },
  {
    id: "performance-telecom",
    title: "Performance Management Transformation",
    client: "Telecom Operator",
    industry: "Telecommunications",
    challenge:
      "Ineffective performance management leading to unclear expectations, demotivated teams, and poor business results.",
    solution:
      "Designed and implemented a modern performance management system with clear KPIs, continuous feedback, and development-focused reviews.",
    results: [
      "Performance visibility improved by 100%",
      "Goal achievement rate increased by 45%",
      "Employee engagement up by 30%",
      "High performer retention improved by 50%",
    ],
    testimonial:
      "Our people now understand exactly what's expected and how they contribute to our success. The transformation has been significant.",
    testimonialAuthor: "Jean-Pierre Mukasa, Head of People",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    services: ["Performance Management", "Training & Workshops"],
  },
]

export const metadata = {
  title: "Case Studies | ESHRM - HR Consulting Success Stories",
  description:
    "Explore how ESHRM has helped organizations across Africa transform their HR functions and achieve measurable results.",
}

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted py-20 lg:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Our Impact
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                Real Results for <span className="text-primary">Real Organizations</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover how we've helped organizations across Africa transform their HR functions and achieve
                remarkable, measurable results.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Industries</div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="grid gap-12">
              {caseStudies.map((study, index) => (
                <Card key={study.id} className="overflow-hidden">
                  <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                    <div className={`aspect-video lg:aspect-auto ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <img
                        src={study.image || "/placeholder.svg"}
                        alt={study.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-8 lg:p-12">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge>{study.industry}</Badge>
                        {study.services.map((service) => (
                          <Badge key={service} variant="outline">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{study.title}</h2>
                      <p className="text-primary font-medium mb-4">{study.client}</p>

                      <div className="space-y-4 mb-6">
                        <div>
                          <h3 className="font-semibold mb-1">Challenge</h3>
                          <p className="text-sm text-muted-foreground">{study.challenge}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Solution</h3>
                          <p className="text-sm text-muted-foreground">{study.solution}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-semibold mb-2">Results</h3>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {study.results.map((result) => (
                            <div key={result} className="flex items-start gap-2 text-sm">
                              <span className="text-primary font-bold">•</span>
                              {result}
                            </div>
                          ))}
                        </div>
                      </div>

                      {study.testimonial && (
                        <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground mb-4">
                          "{study.testimonial}"
                          <footer className="mt-2 text-sm font-medium text-foreground not-italic">
                            — {study.testimonialAuthor}
                          </footer>
                        </blockquote>
                      )}

                      <Button asChild className="gap-2">
                        <Link href={`/case-studies/${study.id}`}>
                          Read Full Case Study
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Want Similar Results?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
              Let's discuss how we can help your organization achieve transformative HR outcomes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="gap-2">
                <Link href="/book-consultation">
                  Book a Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
