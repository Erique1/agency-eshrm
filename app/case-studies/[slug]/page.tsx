import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, CheckCircle, Quote } from "lucide-react"

const caseStudies = {
  "digital-transformation-hr": {
    title: "Digital Transformation of HR Operations",
    client: "Leading Fintech Company",
    industry: "Financial Services",
    duration: "8 months",
    teamSize: "12 consultants",
    challenge:
      "A rapidly growing fintech startup with 500+ employees across 5 countries was struggling with outdated HR processes. Manual workflows, paper-based documentation, and fragmented systems were causing significant inefficiencies, compliance risks, and employee frustration. The HR team spent 70% of their time on administrative tasks, leaving little room for strategic initiatives.",
    solution:
      "We implemented a comprehensive HR digital transformation program that included: automated workflow systems for approvals and requests, cloud-based HRIS implementation, employee self-service portals, integrated performance and learning management systems, and advanced HR analytics dashboards. The solution was deployed in phases across all 5 countries with thorough change management support.",
    approach: [
      "Conducted comprehensive HR technology assessment and gap analysis",
      "Designed future-state HR technology architecture",
      "Selected and customized best-fit HRIS platform",
      "Developed custom integrations with existing systems",
      "Created and executed change management program",
      "Provided extensive training for HR team and employees",
      "Established ongoing support and optimization framework",
    ],
    results: [
      { metric: "40%", description: "Reduction in HR administrative time" },
      { metric: "85%", description: "Employee satisfaction improvement" },
      { metric: "60%", description: "Faster onboarding process" },
      { metric: "30%", description: "Reduction in HR operational costs" },
      { metric: "95%", description: "Self-service adoption rate" },
      { metric: "100%", description: "Data accuracy improvement" },
    ],
    testimonial:
      "ESHRM transformed our HR operations completely. We're now able to scale efficiently while maintaining excellent employee experience. The team was professional, knowledgeable, and truly committed to our success.",
    testimonialAuthor: "Sarah Chen",
    testimonialRole: "Chief Human Resources Officer",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    services: ["Custom HR Solutions", "HR Policy Development"],
  },
  "culture-transformation": {
    title: "Culture Transformation Program",
    client: "Pan-African Manufacturing Corp",
    industry: "Manufacturing",
    duration: "18 months",
    teamSize: "8 consultants",
    challenge:
      "A traditional manufacturing company with operations in 8 African countries faced significant cultural challenges. Siloed departments, hierarchical communication, low employee engagement (32%), and resistance to change were hampering growth and innovation. Turnover was at 25% annually, and productivity metrics were declining.",
    solution:
      "We designed and implemented a comprehensive culture transformation program focusing on collaboration, innovation, and employee empowerment. The program included leadership alignment workshops, cross-functional team initiatives, employee voice programs, recognition systems, and continuous communication strategies. We embedded change champions across all locations to sustain momentum.",
    approach: [
      "Conducted organization-wide culture assessment",
      "Aligned leadership team on desired culture attributes",
      "Designed culture transformation roadmap",
      "Implemented cross-functional collaboration initiatives",
      "Created employee recognition and rewards program",
      "Established continuous feedback mechanisms",
      "Trained change champions across all locations",
      "Developed metrics to track cultural progress",
    ],
    results: [
      { metric: "35%", description: "Increase in employee engagement" },
      { metric: "50%", description: "Reduction in turnover" },
      { metric: "25%", description: "Improvement in productivity" },
      { metric: "60%", description: "Increase in cross-functional collaboration" },
      { metric: "40%", description: "Improvement in innovation metrics" },
      { metric: "45%", description: "Increase in internal promotions" },
    ],
    testimonial:
      "The cultural shift has been remarkable. Our teams now collaborate seamlessly, and innovation has become part of our DNA. ESHRM guided us through a transformative journey that has positioned us for sustainable success.",
    testimonialAuthor: "Michael Osei",
    testimonialRole: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    services: ["Organizational Development", "Training & Workshops"],
  },
  "leadership-development": {
    title: "Leadership Development Initiative",
    client: "Regional Healthcare Network",
    industry: "Healthcare",
    duration: "12 months",
    teamSize: "6 consultants",
    challenge:
      "A growing healthcare organization with 15 facilities and 3,000+ employees faced critical leadership gaps. The organization lacked a robust succession pipeline, and external hiring for leadership positions was costly and often unsuccessful. Leadership readiness scores were low, and high-potential employees were leaving for better opportunities.",
    solution:
      "We created a customized leadership development program that included multi-level leadership academies, executive coaching for senior leaders, mentoring programs, action learning projects, and experiential learning opportunities. The program was designed to develop leaders at all levels while building a sustainable leadership pipeline.",
    approach: [
      "Assessed current leadership capabilities and gaps",
      "Identified high-potential talent across all levels",
      "Designed tiered leadership development curriculum",
      "Implemented executive coaching for senior leaders",
      "Created peer mentoring and learning cohorts",
      "Developed action learning projects tied to business challenges",
      "Established leadership competency framework",
      "Created succession planning process",
    ],
    results: [
      { metric: "90%", description: "Participants promoted within 18 months" },
      { metric: "65%", description: "Improvement in leadership readiness scores" },
      { metric: "75%", description: "Internal promotion rate achieved" },
      { metric: "2x", description: "Leadership bench strength" },
      { metric: "85%", description: "Participant satisfaction rate" },
      { metric: "40%", description: "Reduction in leadership turnover" },
    ],
    testimonial:
      "Our leadership pipeline is now stronger than ever. The program has created a culture of continuous development and growth. ESHRM's expertise in designing practical, impactful learning experiences made all the difference.",
    testimonialAuthor: "Dr. Amina Diallo",
    testimonialRole: "HR Director",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    services: ["Training & Workshops", "Performance Management"],
  },
}

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudies[slug as keyof typeof caseStudies]
  if (!study) return {}
  return {
    title: `${study.title} | ESHRM Case Study`,
    description: `Learn how ESHRM helped ${study.client} achieve transformative HR results.`,
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudies[slug as keyof typeof caseStudies]

  if (!study) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted py-20 lg:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="container relative mx-auto px-4">
            <Button asChild variant="ghost" className="mb-8 -ml-4">
              <Link href="/case-studies">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case Studies
              </Link>
            </Button>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{study.industry}</Badge>
              {study.services.map((service) => (
                <Badge key={service} variant="outline">
                  {service}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">{study.title}</h1>
            <p className="text-xl text-primary font-medium mb-6">{study.client}</p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Duration:</span>{" "}
                <span className="font-medium">{study.duration}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Team Size:</span>{" "}
                <span className="font-medium">{study.teamSize}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Industry:</span>{" "}
                <span className="font-medium">{study.industry}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Image */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="aspect-video overflow-hidden rounded-2xl">
              <img src={study.image || "/placeholder.svg"} alt={study.title} className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              {/* Challenge */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
              </div>

              {/* Solution */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
                <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
              </div>

              {/* Approach */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
                <div className="grid gap-3">
                  {study.approach.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">The Results</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {study.results.map((result) => (
                    <Card key={result.description}>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{result.metric}</div>
                        <div className="text-sm text-muted-foreground">{result.description}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <Card className="mb-12">
                <CardContent className="p-8">
                  <Quote className="h-10 w-10 text-primary/20 mb-4" />
                  <blockquote className="text-lg italic mb-4">"{study.testimonial}"</blockquote>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">{study.testimonialAuthor[0]}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{study.testimonialAuthor}</div>
                      <div className="text-sm text-muted-foreground">{study.testimonialRole}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Services */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Related Services</h2>
                <div className="flex flex-wrap gap-3">
                  {study.services.map((service) => (
                    <Button key={service} asChild variant="outline">
                      <Link href={`/services/${service.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}>
                        {service}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Achieve Similar Results?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
              Let's discuss how we can help your organization transform and succeed.
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
                <Link href="/case-studies">View More Case Studies</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
