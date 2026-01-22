import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, CheckCircle, Quote } from "lucide-react"

const caseStudies = {
  "july-motion-hr-transformation": {
    title: "HR Digital Transformation at July Motion",
    client: "July Motion Pvt Ltd - Mr Mundopa",
    industry: "Manufacturing",
    duration: "6 months",
    teamSize: "4 consultants",
    challenge:
      "July Motion Pvt Ltd, a leading manufacturing company in Harare, was struggling with traditional HR processes that hindered their growth. Manual paperwork, inefficient onboarding, and administrative bottlenecks were impacting productivity and employee satisfaction in Zimbabwe's competitive manufacturing sector.",
    solution:
      "We implemented a comprehensive digital HR transformation tailored for Zimbabwe's manufacturing industry. This included automated HR workflows, digital employee records, streamlined recruitment processes, and performance management systems adapted to local business practices and compliance requirements.",
    approach: [
      "Assessed current HR processes and manufacturing industry needs",
      "Designed Zimbabwe-compliant digital HR systems",
      "Implemented automated onboarding and record-keeping",
      "Trained HR team on new digital tools",
      "Established ongoing support for system optimization",
    ],
    results: [
      { metric: "45%", description: "Reduction in HR administrative workload" },
      { metric: "80%", description: "Improvement in employee onboarding efficiency" },
      { metric: "30%", description: "Increase in staff retention rates" },
    ],
    testimonial:
      "ESHRM's digital transformation has revolutionized our HR operations in Harare. The team understood our manufacturing context perfectly and delivered solutions that work in Zimbabwe's business environment.",
    testimonialAuthor: "Mr Muponda",
    testimonialRole: "Director",
    image: "/images/digital.jpg",
    services: ["Custom HR Solutions", "Digital Transformation"],
  },
  "strange-love-culture-transformation": {
    title: "Culture Building at Strange Love Enterprises",
    client: "Strange Love Enterprises - Mr Taruvinga",
    industry: "Retail",
    duration: "9 months",
    teamSize: "3 consultants",
    challenge:
      "Strange Love Enterprises, a retail business in Zimbabwe, faced challenges in building a cohesive company culture. Low employee engagement, high turnover, and inconsistent workplace practices were affecting their retail operations and customer service quality.",
    solution:
      "We developed a comprehensive culture transformation program specifically designed for Zimbabwe's retail sector. This included employee engagement initiatives, team-building workshops, recognition programs, and leadership development tailored to retail business needs and local cultural context.",
    approach: [
      "Conducted retail sector culture assessment",
      "Designed culture transformation program for Zimbabwe retail",
      "Implemented employee engagement and recognition systems",
      "Provided leadership coaching for retail managers",
      "Established continuous feedback mechanisms",
    ],
    results: [
      { metric: "40%", description: "Boost in team engagement scores" },
      { metric: "55%", description: "Reduction in staff turnover" },
      { metric: "25%", description: "Improvement in workplace productivity" },
    ],
    testimonial:
      "The culture transformation has created a more motivated and collaborative workforce at Strange Love. ESHRM's understanding of Zimbabwe's retail environment made all the difference.",
    testimonialAuthor: "Mr Taruvinga",
    testimonialRole: "Director",
    image: "/images/culture.jpg",
    services: ["Organizational Development", "Culture Transformation"],
  },
  "montague-radiology-hr-excellence": {
    title: "Healthcare HR Excellence at Montague Radiology",
    client: "Montague Radiology Centre - Dr Kamunda",
    industry: "Healthcare",
    duration: "8 months",
    teamSize: "3 consultants",
    challenge:
      "Montague Radiology Centre needed to ensure HR excellence in Zimbabwe's healthcare sector while meeting regulatory standards. Challenges included medical staff retention, compliance with healthcare regulations, and maintaining high-quality patient care standards.",
    solution:
      "We implemented comprehensive HR policies and practices specifically for healthcare operations in Zimbabwe. This included medical staff retention strategies, compliance frameworks aligned with Zimbabwe's healthcare laws, and HR systems that support healthcare excellence.",
    approach: [
      "Assessed healthcare HR needs and regulatory requirements",
      "Developed healthcare-specific HR policies",
      "Implemented staff retention and development programs",
      "Established compliance monitoring systems",
      "Provided training on healthcare HR best practices",
    ],
    results: [
      { metric: "95%", description: "Medical staff retention rate" },
      { metric: "70%", description: "Faster recruitment for specialized roles" },
      { metric: "85%", description: "Compliance with Zimbabwe healthcare regulations" },
    ],
    testimonial:
      "ESHRM helped us maintain high standards in our HR practices while navigating Zimbabwe's healthcare regulatory environment. Their expertise was invaluable.",
    testimonialAuthor: "Dr Kamunda",
    testimonialRole: "Director",
    image: "/images/leadership.jpg",
    services: ["Healthcare HR", "Compliance"],
  },
  "brooklyn-bright-workforce-development": {
    title: "Construction Workforce Development",
    client: "Brooklyn Bright Construction - Mr Manyemba",
    industry: "Construction",
    duration: "10 months",
    teamSize: "4 consultants",
    challenge:
      "Brooklyn Bright Construction faced workforce development challenges in Zimbabwe's growing construction industry. Skills gaps, safety concerns, and project timeline delays were impacting their construction projects and profitability.",
    solution:
      "We created targeted training and development programs for Zimbabwe's construction sector. This included skills development workshops, safety training programs, leadership development for project managers, and workforce planning strategies adapted to local construction industry needs.",
    approach: [
      "Conducted construction industry skills assessment",
      "Designed sector-specific training programs",
      "Implemented safety and compliance training",
      "Developed leadership programs for construction managers",
      "Established ongoing workforce development framework",
    ],
    results: [
      { metric: "50%", description: "Increase in skilled worker availability" },
      { metric: "35%", description: "Reduction in project timelines" },
      { metric: "60%", description: "Improvement in safety compliance" },
    ],
    testimonial:
      "The workforce development program has significantly improved our project outcomes and safety standards. ESHRM delivered exactly what we needed for Zimbabwe's construction sector.",
    testimonialAuthor: "Mr Manyemba",
    testimonialRole: "Director",
    image: "/images/team.jpg",
    services: ["Workforce Development", "Training"],
  },
  "lyndel-house-educational-hr": {
    title: "Educational HR Management at Lyndel House",
    client: "Lyndel House College - Mr Masawi",
    industry: "Education",
    duration: "7 months",
    teamSize: "3 consultants",
    challenge:
      "Lyndel House College needed effective HR management in Zimbabwe's educational sector. Teacher retention, administrative efficiency, and maintaining educational excellence were key priorities in a competitive educational landscape.",
    solution:
      "We developed HR strategies tailored for educational environments and teacher retention in Zimbabwe. This included teacher development programs, administrative efficiency improvements, compliance with education sector regulations, and HR systems that support academic excellence.",
    approach: [
      "Assessed educational HR needs and challenges",
      "Designed teacher retention and development programs",
      "Implemented efficient administrative systems",
      "Established education sector compliance frameworks",
      "Provided HR training for educational administrators",
    ],
    results: [
      { metric: "90%", description: "Teacher retention rate" },
      { metric: "40%", description: "Increase in student satisfaction" },
      { metric: "75%", description: "Improvement in administrative efficiency" },
    ],
    testimonial:
      "ESHRM's HR solutions have enhanced our educational delivery and teacher satisfaction. Their understanding of Zimbabwe's education sector was crucial for our success.",
    testimonialAuthor: "Mr Masawi",
    testimonialRole: "Headmaster",
    image: "/images/afric.jpg",
    services: ["Educational HR", "Staff Development"],
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
