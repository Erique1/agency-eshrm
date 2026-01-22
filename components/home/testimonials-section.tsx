"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
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
      name: "Mr Mundopa",
      role: "Director",
      company: "July Motion Pvt Ltd",
      content:
        "ESHRM has been our trusted HR partner for 2 years, transforming our HR processes in Harare and helping us build a stronger team foundation. Their local expertise and understanding of Zimbabwe's business environment continues to be invaluable for our growth in the motion industry.",
      image: "/placeholder.svg",
    },
    {
      name: "Mr Taruvinga",
      role: "Director",
      company: "Strange Love Enterprises",
      content:
        "ESHRM has been our strategic HR partner for 3 years, consistently delivering exceptional results for our Zimbabwe-based operations. Their tailored HR solutions have helped us navigate the unique challenges of our retail business while ensuring full compliance with local regulations.",
      image: "/placeholder.svg",
    },
    {
      name: "Dr Kamunda",
      role: "Director",
      company: "Montague Radiology Centre",
      content:
        "ESHRM's expertise in healthcare HR management was exactly what we needed. They helped us develop policies that support our medical staff while ensuring we meet Zimbabwe's healthcare standards.",
      image: "/placeholder.svg",
    },
    {
      name: "Mr Manyemba",
      role: "Director",
      company: "Brooklyn Bright Construction",
      content:
        "The HR training programs from ESHRM have significantly improved our project management capabilities. Their understanding of Zimbabwe's construction sector helped us build a more skilled workforce.",
      image: "/placeholder.svg",
    },
    {
      name: "Mr Masawi",
      role: "Headmaster",
      company: "Lyndel House College",
      content:
        "ESHRM provided outstanding support for our educational institution. Their HR solutions helped us attract and retain quality teaching staff, contributing to the academic excellence at Lyndel House College.",
      image: "/placeholder.svg",
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

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {displayTestimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.name || index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="p-1">
                    <Card className="relative">
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
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
