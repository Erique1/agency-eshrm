"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Building, GraduationCap, FileText, BarChart3, Users, ClipboardList, ArrowRight } from "lucide-react"
import type { ContentBlock } from "@/lib/types"

interface ServicesContent {
  title?: ContentBlock
  subtitle?: ContentBlock
  description?: ContentBlock
}

const iconMap: Record<string, any> = {
  settings: Settings,
  building: Building,
  'graduation-cap': GraduationCap,
  'file-text': FileText,
  'bar-chart': BarChart3,
  users: Users,
  'clipboard-list': ClipboardList,
}

export function ServicesSection() {
  const [content, setContent] = useState<ServicesContent>({})
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Hardcoded services data for Vercel deployment
  const hardcodedServices = [
    {
      id: 1,
      title: "Custom HR Solutions",
      slug: "custom-hr-solutions",
      description: "Tailored HR strategies designed specifically for your organization's unique needs and culture.",
      long_description: "We develop comprehensive HR solutions that align with your business objectives, culture, and growth trajectory. Our team works closely with you to understand your challenges and create customized strategies that drive results.",
      icon: "settings",
      features: ["HR Strategy Development", "Process Optimization", "HR Technology Implementation", "Compliance Management"],
      published: true
    },
    {
      id: 2,
      title: "Organizational Development",
      slug: "organizational-development",
      description: "Transform your organization's structure, culture, and capabilities for sustainable growth.",
      long_description: "Our organizational development services help you build a high-performing organization. We focus on culture transformation, change management, and leadership development to drive sustainable growth.",
      icon: "building",
      features: ["Culture Transformation", "Change Management", "Leadership Development", "Team Building"],
      published: true
    },
    {
      id: 3,
      title: "Training & Workshops",
      slug: "training-workshops",
      description: "Empower your workforce with cutting-edge training programs and interactive workshops.",
      long_description: "We design and deliver impactful training programs that enhance skills, boost productivity, and foster professional growth. Our workshops are interactive, practical, and tailored to your industry.",
      icon: "graduation-cap",
      features: ["Leadership Training", "Skills Development", "Compliance Training", "Team Workshops"],
      published: true
    },
    {
      id: 4,
      title: "HR Policy Development",
      slug: "hr-policy-development",
      description: "Create robust HR policies that ensure compliance and support your organizational goals.",
      long_description: "We help you develop comprehensive HR policies that are compliant with local regulations, aligned with best practices, and supportive of your organizational culture and goals.",
      icon: "file-text",
      features: ["Policy Framework Design", "Employee Handbook Creation", "Compliance Review", "Policy Implementation"],
      published: true
    },
    {
      id: 5,
      title: "Performance Management",
      slug: "performance-management",
      description: "Implement effective performance systems that drive accountability and excellence.",
      long_description: "Our performance management solutions help you establish clear expectations, provide meaningful feedback, and create a culture of continuous improvement and accountability.",
      icon: "chart-bar",
      features: ["Performance Framework Design", "KPI Development", "360-Degree Feedback", "Performance Reviews"],
      published: true
    },
    {
      id: 6,
      title: "Talent Acquisition",
      slug: "talent-acquisition",
      description: "Attract, assess, and acquire top talent that drives your business forward.",
      long_description: "We help you build a strong talent pipeline through strategic recruitment, employer branding, and selection processes that identify candidates who will thrive in your organization.",
      icon: "users",
      features: ["Recruitment Strategy", "Employer Branding", "Assessment Centers", "Onboarding Programs"],
      published: true
    },
    {
      id: 7,
      title: "NSSA Registration & Returns",
      slug: "nssa-registration-returns",
      description: "Complete NSSA registration and ensure accurate, timely statutory returns for your organization.",
      long_description: "We handle all aspects of NSSA compliance including initial registration, monthly/quarterly returns, employee registration, and ensuring your organization remains fully compliant with Zimbabwe's social security requirements.",
      icon: "clipboard-list",
      features: ["NSSA Registration", "Monthly Returns", "Employee Registration", "Compliance Audits", "Statutory Reporting"],
      published: true
    }
  ]

  useEffect(() => {
    const fetchServicesContent = async () => {
      try {
        // Fetch section content
        const contentResponse = await fetch('/api/content?page=home&section=services')
        const contentData = await contentResponse.json()

        if (contentData.success && contentData.data.services) {
          const servicesBlocks = contentData.data.services
          const contentMap: ServicesContent = {}

          servicesBlocks.forEach((block: ContentBlock) => {
            contentMap[block.block_key as keyof ServicesContent] = block
          })

          setContent(contentMap)
        }

        // Use hardcoded services for Vercel deployment
        setServices(hardcodedServices)
      } catch (error) {
        console.error('Error fetching services content:', error)
        // Fallback to hardcoded services
        setServices(hardcodedServices)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServicesContent()
  }, [])

  // Default content as fallback
  const defaultContent = {
    title: { content: { text: "Our Services" } },
    subtitle: { content: { text: "Comprehensive HR Solutions for Every Challenge" } },
    description: {
      content: {
        text: "From strategy to implementation, we provide end-to-end HR consulting services that drive measurable results for your organization."
      }
    }
  }

  const servicesContent = { ...defaultContent, ...content }

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="h-6 bg-muted rounded-full w-32 mx-auto mb-4"></div>
            <div className="h-12 bg-muted rounded w-full mb-4"></div>
            <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-12 w-12 bg-muted rounded-lg mb-4"></div>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded w-24"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            {servicesContent.title?.content?.text || "Our Services"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
            {servicesContent.subtitle?.content?.text || "Comprehensive HR Solutions for Every Challenge"}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            {servicesContent.description?.content?.text ||
              "From strategy to implementation, we provide end-to-end HR consulting services that drive measurable results for your organization."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Settings
            return (
              <Card
                key={service.id}
                className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
