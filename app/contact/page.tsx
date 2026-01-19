"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import type { ContentBlock } from "@/lib/types"

interface ContactContent {
  [key: string]: any
  hero?: { badge?: ContentBlock; title?: ContentBlock; subtitle?: ContentBlock }
  contact_info?: {
    title?: ContentBlock
    office_address?: ContentBlock
    phone_numbers?: ContentBlock
    email_address?: ContentBlock
    business_hours?: ContentBlock
    office_image?: ContentBlock
    services_options?: ContentBlock
  }
}

interface ContactDetail {
  type: string
  title: string
  value: string
  label?: string
  note?: string
  icon: string
}

const iconMap: Record<string, any> = {
  MapPin,
  Phone,
  Mail,
  Clock,
}

export default function ContactPage() {
  const [content, setContent] = useState<ContactContent>({})
  const [contactDetails, setContactDetails] = useState<ContactDetail[]>([])
  const [services, setServices] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceInterest: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const fetchContactContent = async () => {
      try {
        const response = await fetch('/api/content?page=contact')
        const data = await response.json()

        if (data.success && data.data) {
          const groupedContent = data.data // This is Record<string, ContentBlock[]>
          const contentMap: ContactContent = {}

          // Flatten all blocks and group them
          const allBlocks: ContentBlock[] = []
          Object.values(groupedContent).forEach((blocks: unknown) => {
            if (Array.isArray(blocks)) {
              allBlocks.push(...(blocks as ContentBlock[]))
            }
          })

          // Group blocks by section
          allBlocks.forEach((block: ContentBlock) => {
            const section = block.section
            if (!contentMap[section]) {
              contentMap[section] = {}
            }

            if (section === 'hero') {
              contentMap.hero = contentMap.hero || {}
              contentMap.hero[block.block_key as keyof typeof contentMap.hero] = block
            } else if (section === 'contact_info') {
              contentMap.contact_info = contentMap.contact_info || {}
              contentMap.contact_info[block.block_key as keyof typeof contentMap.contact_info] = block
            }
          })

          setContent(contentMap)

          // Extract contact details
          const contactDetailBlocks = allBlocks.filter((block: ContentBlock) =>
            block.section === 'contact_info' && block.block_type === 'contact_detail'
          )
          if (contactDetailBlocks.length > 0) {
            const parsedContactDetails: ContactDetail[] = contactDetailBlocks.map((block: ContentBlock) => {
              const contactContent = block.content
              return {
                type: contactContent.type || '',
                title: contactContent.title || '',
                value: contactContent.value || '',
                label: contactContent.label || '',
                note: contactContent.note || '',
                icon: contactContent.icon || '',
              }
            })
            setContactDetails(parsedContactDetails)
          }

          // Extract services options
          const servicesBlock = allBlocks.find((block: ContentBlock) =>
            block.block_key === 'services_options'
          )
          if (servicesBlock) {
            const servicesData = servicesBlock.content.services || []
            setServices(servicesData)
          }
        }
      } catch (error) {
        console.error('Error fetching contact content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContactContent()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Send emails asynchronously (don't block the UI)
        fetch('/api/send-contact-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }).catch((emailError) => {
          console.error('Email sending failed:', emailError)
          // Don't show error to user as the form was successfully submitted
        })

        toast.success('Message sent successfully!')
        setIsSubmitted(true)
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-md text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
                <p className="text-muted-foreground mb-8">
                  Your message has been received. Our team will get back to you within 24-48 hours.
                </p>
                <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  // Default content as fallback
  const defaultContent = {
    hero: {
      badge: { content: { text: "Get in Touch" } },
      title: { content: { text: "Let's Start a Conversation", highlight: "Conversation" } },
      subtitle: { content: { text: "Have questions about our services or ready to discuss your HR challenges? We're here to help." } },
    },
    contact_info: {
      title: { content: { text: "Contact Information" } },
      office_image: { content: { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", alt: "ESHRM Office" } },
    }
  }

  const contactContent = { ...defaultContent, ...content }

  // Default contact details as fallback
  const defaultContactDetails: ContactDetail[] = [
    {
      type: "address",
      title: "Our Office",
      value: "Harare, Zimbabwe",
      icon: "MapPin"
    },
    {
      type: "phone",
      title: "Phone",
      value: "+263 779 122 227",
      label: "+263 774 193 064",
      note: "Mon-Fri, 8am-5pm CAT",
      icon: "Phone"
    },
    {
      type: "email",
      title: "Email",
      value: "info@eshrm.africa",
      note: "We'll respond within 24 hours",
      icon: "Mail"
    },
    {
      type: "hours",
      title: "Business Hours",
      value: "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed",
      icon: "Clock"
    }
  ]

  // Default services as fallback
  const defaultServices = [
    "Custom HR Solutions",
    "Organizational Development",
    "Training & Workshops",
    "HR Policy Development",
    "Performance Management",
    "Talent Acquisition",
    "Other",
  ]

  const displayContactDetails = contactDetails.length > 0 ? contactDetails : defaultContactDetails
  const displayServices = services.length > 0 ? services : defaultServices

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="animate-pulse space-y-20">
            {/* Hero skeleton */}
            <section className="py-20 lg:py-28">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                  <div className="h-6 bg-muted-foreground/20 rounded-full w-32 mx-auto mb-4"></div>
                  <div className="h-12 bg-muted-foreground/20 rounded w-full mb-6"></div>
                  <div className="h-6 bg-muted-foreground/20 rounded w-3/4 mx-auto"></div>
                </div>
              </div>
            </section>
            {/* Contact section skeleton */}
            <section className="py-20 lg:py-28">
              <div className="container mx-auto px-4">
                <div className="grid gap-12 lg:grid-cols-2">
                  <div className="space-y-6">
                    <div className="h-8 bg-muted-foreground/20 rounded w-64"></div>
                    <div className="space-y-4">
                      <div className="h-12 bg-muted-foreground/20 rounded"></div>
                      <div className="h-12 bg-muted-foreground/20 rounded"></div>
                      <div className="h-12 bg-muted-foreground/20 rounded"></div>
                      <div className="h-32 bg-muted-foreground/20 rounded"></div>
                      <div className="h-12 bg-muted-foreground/20 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="h-8 bg-muted-foreground/20 rounded w-48"></div>
                    <div className="space-y-4">
                      <div className="h-24 bg-muted-foreground/20 rounded"></div>
                      <div className="h-24 bg-muted-foreground/20 rounded"></div>
                      <div className="h-24 bg-muted-foreground/20 rounded"></div>
                      <div className="h-24 bg-muted-foreground/20 rounded"></div>
                    </div>
                    <div className="h-48 bg-muted-foreground/20 rounded"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
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
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                {contactContent.hero?.badge?.content?.text || "Get in Touch"}
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                {contactContent.hero?.title?.content?.text || "Let's Start a Conversation"}
                {contactContent.hero?.title?.content?.highlight && (
                  <span className="text-primary"> {contactContent.hero.title.content.highlight}</span>
                )}
              </h1>
              <p className="text-lg text-muted-foreground">
                {contactContent.hero?.subtitle?.content?.text ||
                  "Have questions about our services or ready to discuss your HR challenges? We're here to help."}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company / Organization</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Interest</Label>
                      <Select
                        value={formData.serviceInterest}
                        onValueChange={(value: string) => setFormData({ ...formData, serviceInterest: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {displayServices.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your HR challenges or questions..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {contactContent.contact_info?.title?.content?.text || "Contact Information"}
                </h2>
                <div className="space-y-6 mb-8">
                  {displayContactDetails.map((detail, index) => {
                    const IconComponent = iconMap[detail.icon] || MapPin
                    return (
                      <Card key={detail.title || index}>
                        <CardContent className="flex items-start gap-4 p-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{detail.title}</h3>
                            <p className="text-muted-foreground">{detail.value}</p>
                            {detail.label && (
                              <p className="text-muted-foreground">{detail.label}</p>
                            )}
                            {detail.note && (
                              <p className="text-sm text-muted-foreground">{detail.note}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {/* Map/Image */}
                <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                  <img
                    src={contactContent.contact_info?.office_image?.content?.src || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"}
                    alt={contactContent.contact_info?.office_image?.content?.alt || "ESHRM Office"}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
