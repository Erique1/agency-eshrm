"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import type { ContentBlock } from "@/lib/types"

interface CTAContent {
  title?: ContentBlock
  subtitle?: ContentBlock
  primary_cta?: ContentBlock
  secondary_cta?: ContentBlock
}

export function CTASection() {
  const [content, setContent] = useState<CTAContent>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCTAContent = async () => {
      try {
        const response = await fetch('/api/content?page=home&section=cta')
        const data = await response.json()

        if (data.success && data.data.cta) {
          const ctaBlocks = data.data.cta
          const contentMap: CTAContent = {}

          ctaBlocks.forEach((block: ContentBlock) => {
            contentMap[block.block_key as keyof CTAContent] = block
          })

          setContent(contentMap)
        }
      } catch (error) {
        console.error('Error fetching CTA content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCTAContent()
  }, [])

  // Default content as fallback
  const defaultContent = {
    title: { content: { text: "Ready to Transform Your HR Function?" } },
    subtitle: {
      content: {
        text: "Take the first step toward building a high-performing organization. Schedule a complimentary consultation with our experts and discover how we can help you achieve your HR goals."
      }
    },
    primary_cta: {
      content: {
        text: "Book a Consultation",
        link: "/book-consultation",
        variant: "secondary"
      }
    },
    secondary_cta: {
      content: {
        text: "Contact Us",
        link: "/contact",
        variant: "outline"
      }
    }
  }

  const ctaContent = { ...defaultContent, ...content }

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-2xl bg-primary p-8 text-center text-primary-foreground lg:p-16 animate-pulse">
            <div className="h-12 bg-primary-foreground/20 rounded mb-4"></div>
            <div className="h-6 bg-primary-foreground/20 rounded w-3/4 mx-auto mb-8"></div>
            <div className="flex justify-center gap-4">
              <div className="h-12 bg-primary-foreground/20 rounded w-48"></div>
              <div className="h-12 bg-primary-foreground/20 rounded w-32"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-2xl bg-primary p-8 text-center text-primary-foreground lg:p-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
            {ctaContent.title?.content?.text || "Ready to Transform Your HR Function?"}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80 text-pretty">
            {ctaContent.subtitle?.content?.text ||
              "Take the first step toward building a high-performing organization. Schedule a complimentary consultation with our experts and discover how we can help you achieve your HR goals."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              variant={ctaContent.primary_cta?.content?.variant === 'outline' ? 'outline' : 'secondary'}
              className="gap-2"
            >
              <Link href={ctaContent.primary_cta?.content?.link || "/book-consultation"}>
                {ctaContent.primary_cta?.content?.text || "Book a Consultation"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant={ctaContent.secondary_cta?.content?.variant || "outline"}
              className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href={ctaContent.secondary_cta?.content?.link || "/contact"}>
                <Phone className="h-4 w-4" />
                {ctaContent.secondary_cta?.content?.text || "Contact Us"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
