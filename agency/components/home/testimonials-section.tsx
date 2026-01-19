"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import type { ContentBlock } from "@/lib/types"

interface TestimonialsContent {
  title?: ContentBlock
  subtitle?: ContentBlock
  description?: ContentBlock
}

interface TestimonialData {
  name: string
  role: string
  company: string
  content: string
  image: string
}

export function TestimonialsSection() {
  const [content, setContent] = useState<TestimonialsContent>({})
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonialsContent = async () => {
      try {
        // Fetch section content
        const contentResponse = await fetch('/api/content?page=home&section=testimonials')
        const contentData = await contentResponse.json()

        if (contentData.success && contentData.data.testimonials) {
          const testimonialsBlocks = contentData.data.testimonials
          const contentMap: TestimonialsContent = {}

          testimonialsBlocks.forEach((block: ContentBlock) => {
            contentMap[block.block_key as keyof TestimonialsContent] = block
          })

          setContent(contentMap)

          // Extract testimonials from content blocks
          const testimonialBlocks = testimonialsBlocks.filter((block: ContentBlock) =>
            block.block_key.startsWith('testimonial_')
          )

          if (testimonialBlocks.length > 0) {
            const parsedTestimonials: TestimonialData[] = testimonialBlocks.map((block: ContentBlock) => {
              const testimonialContent = block.content
              return {
                name: testimonialContent.name || '',
                role: testimonialContent.role || '',
                company: testimonialContent.company || '',
                content: testimonialContent.content || '',
                image: testimonialContent.image || '',
              }
            })
            setTestimonials(parsedTestimonials)
          }
        }
      } catch (error) {
        console.error('Error fetching testimonials content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonialsContent()
  }, [])

  // Default content as fallback
  const defaultContent = {
    title: { content: { text: "Testimonials" } },
    subtitle: { content: { text: "What Our Clients Say" } },
    description: {
      content: {
        text: "Don't just take our word for it—hear from the organizations we've had the privilege to serve."
      }
    }
  }

  const testimonialsContent = { ...defaultContent, ...content }

  // Default testimonials as fallback
  const defaultTestimonials: TestimonialData[] = [
    {
      name: "Amara Okonkwo",
      role: "Chief People Officer",
      company: "TechAfrica Solutions",
      content:
        "ESHRM has been instrumental in transforming our HR function. Their expertise and dedication to understanding our unique challenges resulted in solutions that truly work for our organization.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    },
    {
      name: "David Mensah",
      role: "Managing Director",
      company: "GrowthPath Industries",
      content:
        "Working with ESHRM was a game-changer for our company. They helped us build a performance management system that has significantly improved our team's productivity and engagement.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    },
    {
      name: "Fatima Al-Hassan",
      role: "HR Director",
      company: "Sahel Investments",
      content:
        "The training programs delivered by ESHRM exceeded our expectations. Our leadership team is now more confident, capable, and aligned with our strategic goals.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    },
  ]

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="h-6 bg-muted rounded-full w-32 mx-auto mb-4"></div>
            <div className="h-12 bg-muted rounded w-full mb-4"></div>
            <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="relative animate-pulse">
                <CardContent className="p-6 pt-8">
                  <div className="absolute top-4 right-4 h-8 w-8 bg-muted-foreground/20 rounded"></div>
                  <div className="mb-6 space-y-2">
                    <div className="h-4 bg-muted-foreground/20 rounded"></div>
                    <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
                    <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-muted-foreground/20 rounded-full"></div>
                    <div className="space-y-1">
                      <div className="h-4 bg-muted-foreground/20 rounded w-24"></div>
                      <div className="h-3 bg-muted-foreground/20 rounded w-16"></div>
                    </div>
                  </div>
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
            {testimonialsContent.title?.content?.text || "Testimonials"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
            {testimonialsContent.subtitle?.content?.text || "What Our Clients Say"}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            {testimonialsContent.description?.content?.text ||
              "Don't just take our word for it—hear from the organizations we've had the privilege to serve."}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayTestimonials.map((testimonial, index) => (
            <Card key={testimonial.name || index} className="relative">
              <CardContent className="p-6 pt-8">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
                <p className="mb-6 text-muted-foreground italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-primary">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
