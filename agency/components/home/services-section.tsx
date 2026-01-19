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

        // Fetch actual services from database
        const servicesResponse = await fetch('/api/services?published=true')
        const servicesData = await servicesResponse.json()

        if (servicesData.success) {
          setServices(servicesData.data) // Show all published services
        }
      } catch (error) {
        console.error('Error fetching services content:', error)
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
