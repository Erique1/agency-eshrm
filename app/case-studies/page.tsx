import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const caseStudies = [
  {
    id: "july-motion-hr-transformation",
    title: "HR Digital Transformation at July Motion",
    client: "July Motion Pvt Ltd - Mr Muponda",
    industry: "Manufacturing",
    challenge:
      "Traditional HR processes hindering growth and efficiency in Zimbabwe's manufacturing sector.",
    solution:
      "Implemented modern HR digital tools and streamlined processes tailored for the manufacturing industry.",
    results: [
      "45% reduction in HR administrative workload",
      "80% improvement in employee onboarding efficiency",
      "30% increase in staff retention rates",
    ],
    testimonial:
      "ESHRM's digital transformation has revolutionized our HR operations in Harare.",
    testimonialAuthor: "Mr Muponda, Director",
    image: "/images/digital.jpg",
    services: ["Custom HR Solutions", "Digital Transformation"],
  },
  {
    id: "strange-love-culture-transformation",
    title: "Culture Building at Strange Love Enterprises",
    client: "Strange Love Enterprises - Mr Taruvinga",
    industry: "Retail",
    challenge:
      "Building a cohesive company culture in Zimbabwe's competitive retail environment.",
    solution:
      "Developed comprehensive culture transformation program focusing on employee engagement and team collaboration.",
    results: [
      "40% boost in team engagement scores",
      "55% reduction in staff turnover",
      "25% improvement in workplace productivity",
    ],
    testimonial:
      "The culture transformation has created a more motivated and collaborative workforce.",
    testimonialAuthor: "Mr Taruvinga, Director",
    image: "/images/culture.jpg",
    services: ["Organizational Development", "Culture Transformation"],
  },
  {
    id: "montague-radiology-hr-excellence",
    title: "Healthcare HR Excellence at Montague Radiology",
    client: "Montague Radiology Centre - Dr Kamunda",
    industry: "Healthcare",
    challenge:
      "Ensuring HR excellence in Zimbabwe's healthcare sector while meeting regulatory standards.",
    solution:
      "Implemented comprehensive HR policies and practices specific to healthcare operations.",
    results: [
      "95% medical staff retention rate",
      "70% faster recruitment for specialized roles",
      "85% compliance with Zimbabwe healthcare regulations",
    ],
    testimonial:
      "ESHRM helped us maintain high standards in our HR practices.",
    testimonialAuthor: "Dr Kamunda, Director",
    image: "/images/leadership.jpg",
    services: ["Healthcare HR", "Compliance"],
  },
  {
    id: "brooklyn-bright-workforce-development",
    title: "Construction Workforce Development",
    client: "Brooklyn Bright Construction - Mr Manyemba",
    industry: "Construction",
    challenge:
      "Developing skilled workforce for Zimbabwe's growing construction industry.",
    solution:
      "Created targeted training and development programs for construction sector employees.",
    results: [
      "50% increase in skilled worker availability",
      "35% reduction in project timelines",
      "60% improvement in safety compliance",
    ],
    testimonial:
      "The workforce development program has significantly improved our project outcomes.",
    testimonialAuthor: "Mr Manyemba, Director",
    image: "/images/team.jpg",
    services: ["Workforce Development", "Training"],
  },
  {
    id: "lyndel-house-educational-hr",
    title: "Educational HR Management at Lyndel House",
    client: "Lyndel House College - Mr Masawi",
    industry: "Education",
    challenge:
      "Effective HR management in Zimbabwe's educational institutions.",
    solution:
      "Developed HR strategies tailored for educational environments and teacher retention.",
    results: [
      "90% teacher retention rate",
      "40% increase in student satisfaction",
      "75% improvement in administrative efficiency",
    ],
    testimonial:
      "ESHRM's HR solutions have enhanced our educational delivery.",
    testimonialAuthor: "Mr Masawi, Headmaster",
    image: "/images/afric.jpg",
    services: ["Educational HR", "Staff Development"],
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
