"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import type { ContentBlock } from "@/lib/types"

interface HeroContent {
  badge?: ContentBlock
  title?: ContentBlock
  subtitle?: ContentBlock
  primary_cta?: ContentBlock
  secondary_cta?: ContentBlock
  background?: ContentBlock
  organizations?: ContentBlock
  years?: ContentBlock
  indicators?: ContentBlock
}

export function HeroSection() {
  const [content, setContent] = useState<HeroContent>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await fetch('/api/content?page=home&section=hero')
        const data = await response.json()

        if (data.success && data.data.hero) {
          const heroBlocks = data.data.hero
          const contentMap: HeroContent = {}

          heroBlocks.forEach((block: ContentBlock) => {
            contentMap[block.block_key as keyof HeroContent] = block
          })

          setContent(contentMap)
        }
      } catch (error) {
        console.error('Error fetching hero content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeroContent()
  }, [])

  // Default content as fallback
  const defaultContent = {
    badge: { content: { text: "Leading HR Consulting in Africa" } },
    title: {
      content: {
        text: "Transforming Human Resources for African Businesses",
        highlight: "Human Resources"
      }
    },
    subtitle: {
      content: {
        text: "We deliver customized, client-centric, and impact-driven HR solutions that empower organizations to build high-performing teams and achieve sustainable growth across Africa."
      }
    },
    primary_cta: {
      content: {
        text: "Book a Consultation",
        link: "/book-consultation",
        variant: "default"
      }
    },
    secondary_cta: {
      content: {
        text: "Explore Services",
        link: "/services/custom-hr-solutions",
        variant: "outline"
      }
    },
    background: {
      content: {
        src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop",
        alt: "ESHRM - Professional HR Consulting Team"
      }
    },
    organizations: {
      content: {
        value: "20+",
        label: "Organizations Transformed"
      }
    },
    years: {
      content: {
        value: "4+",
        label: "Years"
      }
    },
    indicators: {
      content: {
        indicators: [
          "4+ Years of Excellence",
          "20+ Clients Served",
          "2+",
          "98% Client Satisfaction"
        ]
      }
    }
  }

  const heroContent = { ...defaultContent, ...content }
  const trustIndicators = heroContent.indicators?.content?.indicators || []

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-muted py-20 lg:py-32">
        <div className="container relative mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8 animate-pulse">
              <div className="h-6 bg-muted-foreground/20 rounded-full w-64"></div>
              <div className="space-y-4">
                <div className="h-12 bg-muted-foreground/20 rounded w-full"></div>
                <div className="h-12 bg-muted-foreground/20 rounded w-3/4"></div>
              </div>
              <div className="h-6 bg-muted-foreground/20 rounded w-full"></div>
            </div>
            <div className="aspect-square bg-muted-foreground/10 rounded-2xl"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden bg-muted py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {heroContent.badge?.content?.text || "Leading HR Consulting in Africa"}
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              {heroContent.title?.content?.text || "Transforming Human Resources for African Businesses"}
              {heroContent.title?.content?.highlight && (
                <span className="text-primary"> {heroContent.title.content.highlight}</span>
              )}
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl text-pretty">
              {heroContent.subtitle?.content?.text || "We deliver customized, client-centric, and impact-driven HR solutions that empower organizations to build high-performing teams and achieve sustainable growth across Africa."}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="gap-2"
                variant={heroContent.primary_cta?.content?.variant === 'outline' ? 'outline' : 'default'}
              >
                <Link href={heroContent.primary_cta?.content?.link || "/book-consultation"}>
                  {heroContent.primary_cta?.content?.text || "Book a Consultation"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant={heroContent.secondary_cta?.content?.variant || "outline"}
                size="lg"
              >
                <Link href={heroContent.secondary_cta?.content?.link || "/services/custom-hr-solutions"}>
                  {heroContent.secondary_cta?.content?.text || "Explore Services"}
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4">
              {trustIndicators.map((indicator: string) => (
                <div key={indicator} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
              <img
                src={heroContent.background?.content?.src || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop"}
                alt={heroContent.background?.content?.alt || "ESHRM - Professional HR Consulting Team"}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-card p-6 shadow-lg border">
              <div className="text-3xl font-bold text-primary">
                {heroContent.organizations?.content?.value || "20+"}
              </div>
              <div className="text-sm text-muted-foreground">
                {heroContent.organizations?.content?.label || "Organizations Transformed"}
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 rounded-xl bg-primary p-4 shadow-lg">
              <div className="text-xl font-bold text-primary-foreground">
                {heroContent.years?.content?.value || "4+"}
              </div>
              <div className="text-xs text-primary-foreground/80">
                {heroContent.years?.content?.label || "Years"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
