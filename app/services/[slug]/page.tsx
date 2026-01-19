import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CheckCircle, Settings, Building, GraduationCap, FileText, BarChart3, Users, ClipboardList } from "lucide-react"

const services = {
  "custom-hr-solutions": {
    title: "Custom HR Solutions",
    icon: Settings,
    description: "Tailored HR strategies designed specifically for your organization's unique needs and culture.",
    longDescription:
      "We develop comprehensive HR solutions that align with your business objectives, culture, and growth trajectory. Our team works closely with you to understand your challenges and create customized strategies that drive measurable results.",
    features: [
      "HR Strategy Development & Alignment",
      "Process Optimization & Efficiency",
      "HR Technology Selection & Implementation",
      "Compliance Management & Risk Mitigation",
      "HR Metrics & Analytics",
      "Employee Experience Enhancement",
    ],
    benefits: [
      "Aligned HR practices with business goals",
      "Improved operational efficiency",
      "Reduced compliance risks",
      "Better employee engagement",
      "Data-driven decision making",
    ],
    process: [
      { step: "Assessment", description: "We analyze your current HR landscape, challenges, and opportunities." },
      { step: "Strategy", description: "We develop a customized HR roadmap aligned with your objectives." },
      { step: "Implementation", description: "We work alongside your team to implement solutions effectively." },
      { step: "Optimization", description: "We continuously monitor and refine for sustainable results." },
    ],
  },
  "organizational-development": {
    title: "Organizational Development",
    icon: Building,
    description: "Transform your organization's structure, culture, and capabilities for sustainable growth.",
    longDescription:
      "Our organizational development services help you build a high-performing organization. We focus on culture transformation, change management, and leadership development to drive sustainable growth and competitive advantage.",
    features: [
      "Culture Assessment & Transformation",
      "Change Management Programs",
      "Organization Design & Restructuring",
      "Team Effectiveness Interventions",
      "Employee Engagement Initiatives",
      "Succession Planning",
    ],
    benefits: [
      "Stronger organizational culture",
      "Improved change readiness",
      "Enhanced team collaboration",
      "Higher employee engagement",
      "Sustainable growth trajectory",
    ],
    process: [
      { step: "Diagnosis", description: "We assess your organization's culture, structure, and capabilities." },
      {
        step: "Design",
        description: "We create a transformation roadmap with clear milestones and outcomes.",
      },
      { step: "Deploy", description: "We implement initiatives with change management support." },
      { step: "Sustain", description: "We embed changes into your organization's DNA." },
    ],
  },
  "training-workshops": {
    title: "Training & Workshops",
    icon: GraduationCap,
    description: "Empower your workforce with cutting-edge training programs and interactive workshops.",
    longDescription:
      "We design and deliver impactful training programs that enhance skills, boost productivity, and foster professional growth. Our workshops are interactive, practical, and tailored to your industry and organizational needs.",
    features: [
      "Leadership Development Programs",
      "Management Skills Training",
      "Soft Skills & Communication",
      "Technical & Compliance Training",
      "Team Building Workshops",
      "Executive Coaching",
    ],
    benefits: [
      "Enhanced employee capabilities",
      "Improved leadership pipeline",
      "Better team dynamics",
      "Increased productivity",
      "Higher retention rates",
    ],
    process: [
      { step: "Needs Analysis", description: "We identify skill gaps and learning objectives." },
      { step: "Design", description: "We create customized curricula and materials." },
      { step: "Deliver", description: "We facilitate engaging, practical learning experiences." },
      { step: "Evaluate", description: "We measure impact and refine for continuous improvement." },
    ],
  },
  "hr-policy-development": {
    title: "HR Policy Development",
    icon: FileText,
    description: "Create robust HR policies that ensure compliance and support your organizational goals.",
    longDescription:
      "We help you develop comprehensive HR policies that are compliant with local regulations, aligned with best practices, and supportive of your organizational culture and goals. Our policies are clear, practical, and enforceable.",
    features: [
      "Policy Framework Design",
      "Employee Handbook Development",
      "Compliance Review & Updates",
      "Policy Implementation Support",
      "Manager Training on Policies",
      "Regular Policy Audits",
    ],
    benefits: [
      "Legal compliance assurance",
      "Consistent HR practices",
      "Clear employee expectations",
      "Reduced workplace disputes",
      "Protected organizational interests",
    ],
    process: [
      { step: "Review", description: "We assess existing policies and identify gaps." },
      { step: "Draft", description: "We develop clear, compliant, and practical policies." },
      { step: "Validate", description: "We ensure legal compliance and stakeholder alignment." },
      { step: "Implement", description: "We roll out policies with proper communication and training." },
    ],
  },
  "performance-management": {
    title: "Performance Management",
    icon: BarChart3,
    description: "Implement effective performance systems that drive accountability and excellence.",
    longDescription:
      "Our performance management solutions help you establish clear expectations, provide meaningful feedback, and create a culture of continuous improvement and accountability that drives business results.",
    features: [
      "Performance Framework Design",
      "KPI & OKR Development",
      "360-Degree Feedback Systems",
      "Performance Review Processes",
      "Goal Setting & Alignment",
      "Performance Improvement Plans",
    ],
    benefits: [
      "Clear performance expectations",
      "Aligned individual and organizational goals",
      "Continuous feedback culture",
      "Improved productivity",
      "Fair and objective evaluations",
    ],
    process: [
      { step: "Assess", description: "We evaluate your current performance management approach." },
      { step: "Design", description: "We create a tailored framework with clear metrics." },
      { step: "Deploy", description: "We implement systems and train managers." },
      { step: "Monitor", description: "We track effectiveness and optimize continuously." },
    ],
  },
  "talent-acquisition": {
    title: "Talent Acquisition",
    icon: Users,
    description: "Attract, assess, and acquire top talent that drives your business forward.",
    longDescription:
      "We help you build a strong talent pipeline through strategic recruitment, employer branding, and selection processes that identify candidates who will thrive in your organization and contribute to its success.",
    features: [
      "Recruitment Strategy Development",
      "Employer Brand Enhancement",
      "Assessment Center Design",
      "Interview Process Optimization",
      "Onboarding Program Design",
      "Talent Pipeline Building",
    ],
    benefits: [
      "Higher quality hires",
      "Reduced time-to-fill",
      "Improved employer brand",
      "Better cultural fit",
      "Lower turnover rates",
    ],
    process: [
      { step: "Analyze", description: "We understand your talent needs and challenges." },
      { step: "Strategize", description: "We develop a comprehensive talent acquisition plan." },
      { step: "Execute", description: "We implement recruitment processes and tools." },
      { step: "Refine", description: "We measure results and optimize continuously." },
    ],
  },
  "nssa-registration-returns": {
    title: "NSSA Registration & Returns",
    icon: ClipboardList,
    description: "Complete NSSA registration and ensure timely submission of all required returns and compliance documentation.",
    longDescription:
      "We handle all aspects of National Social Security Authority (NSSA) registration and compliance for your organization. Our experts ensure proper registration, accurate returns submission, and ongoing compliance with Zimbabwe's social security requirements, protecting both your employees and your business.",
    features: [
      "Complete NSSA Registration Process",
      "Monthly Returns Preparation & Submission",
      "Compliance Audits & Reviews",
      "Employee Registration Management",
      "Contribution Calculations & Verification",
      "Regulatory Updates & Guidance",
      "Documentation Management",
      "Penalty Avoidance Support",
    ],
    benefits: [
      "Full NSSA compliance assurance",
      "Avoidance of penalties and fines",
      "Proper employee social security coverage",
      "Accurate contribution records",
      "Peace of mind with regulatory compliance",
      "Expert handling of complex requirements",
      "Timely submission guarantees",
      "Ongoing compliance monitoring",
    ],
    process: [
      { step: "Assessment", description: "We evaluate your current NSSA status and compliance requirements." },
      { step: "Registration", description: "We complete the full NSSA registration process for your organization." },
      { step: "Setup", description: "We establish systems for ongoing returns preparation and submission." },
      { step: "Compliance", description: "We ensure all submissions are accurate, timely, and compliant." },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services[slug as keyof typeof services]
  if (!service) return {}
  return {
    title: `${service.title} | ESHRM Services`,
    description: service.description,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services[slug as keyof typeof services]

  if (!service) {
    notFound()
  }

  const Icon = service.icon

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted py-20 lg:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">{service.title}</h1>
              <p className="text-lg text-muted-foreground">{service.longDescription}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/book-consultation">
                    Book a Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">What We Offer</h2>
                <p className="text-muted-foreground mb-8">
                  Our {service.title.toLowerCase()} services are comprehensive and tailored to your specific needs.
                </p>
                <div className="grid gap-4">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Key Benefits</h2>
                <p className="text-muted-foreground mb-8">
                  Partner with us to achieve measurable outcomes that drive business value.
                </p>
                <div className="grid gap-4">
                  {service.benefits.map((benefit) => (
                    <Card key={benefit}>
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                        <span>{benefit}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 lg:py-28 bg-muted">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Approach</h2>
              <p className="text-lg text-muted-foreground">
                A structured methodology that delivers consistent, high-quality results.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((item, index) => (
                <Card key={item.step} className="relative">
                  <CardContent className="p-6">
                    <div className="mb-4 text-4xl font-bold text-primary/20">0{index + 1}</div>
                    <h3 className="mb-2 text-xl font-bold">{item.step}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Explore Other Services</h2>
              <p className="text-muted-foreground">Discover our full range of HR consulting services.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(services)
                .filter(([key]) => key !== slug)
                .map(([key, s]) => (
                  <Button key={key} asChild variant="outline">
                    <Link href={`/services/${key}`}>{s.title}</Link>
                  </Button>
                ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Get Started?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
              Schedule a consultation to discuss how our {service.title.toLowerCase()} can help your organization.
            </p>
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="/book-consultation">
                Book a Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
