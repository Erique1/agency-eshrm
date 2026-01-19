"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Building, GraduationCap, FileText, BarChart3, Users, ClipboardList, ArrowRight } from "lucide-react"

const iconMap: Record<string, any> = {
  settings: Settings,
  building: Building,
  'graduation-cap': GraduationCap,
  'file-text': FileText,
  'bar-chart': BarChart3,
  users: Users,
  'clipboard-list': ClipboardList,
}

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services?published=true')
        const data = await response.json()

        if (data.success) {
          setServices(data.data)
        }
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-20 lg:py-28">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-2xl text-center mb-16">
                <div className="h-6 bg-muted rounded-full w-32 mx-auto mb-4"></div>
                <div className="h-12 bg-muted rounded w-full mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(7)].map((_, i) => (
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
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted py-20 lg:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Our Services
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-balance">
                Comprehensive HR Solutions for Every Challenge
              </h1>
              <p className="text-lg text-muted-foreground">
                From strategy to implementation, we provide end-to-end HR consulting services that drive measurable results for your organization.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
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

            {services.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No services available at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
