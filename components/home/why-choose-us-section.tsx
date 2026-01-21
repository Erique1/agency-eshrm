"use client"

import { useEffect, useState } from "react"
import { Award, Target, Handshake, TrendingUp } from "lucide-react"
import type { ContentBlock } from "@/lib/types"

interface WhyChooseUsContent {
  title?: ContentBlock
  subtitle?: ContentBlock
  description?: ContentBlock
  image?: ContentBlock
}

interface ReasonData {
  icon: string
  title: string
  description: string
}

const iconMap: Record<string, any> = {
  award: Award,
  target: Target,
  handshake: Handshake,
  'trending-up': TrendingUp,
}

export function WhyChooseUsSection() {
  const [content, setContent] = useState<WhyChooseUsContent>({})
  const [reasons, setReasons] = useState<ReasonData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWhyChooseUsContent = async () => {
      try {
        // Fetch section content
        const contentResponse = await fetch('/api/content?page=home&section=why_choose_us')
        const contentData = await contentResponse.json()

        if (contentData.success && contentData.data.why_choose_us) {
          const whyChooseUsBlocks = contentData.data.why_choose_us
          const contentMap: WhyChooseUsContent = {}

          whyChooseUsBlocks.forEach((block: ContentBlock) => {
            contentMap[block.block_key as keyof WhyChooseUsContent] = block
          })

          setContent(contentMap)

          // Extract reasons from content blocks
          const reasonBlocks = whyChooseUsBlocks.filter((block: ContentBlock) =>
            block.block_key.startsWith('reason_')
          )

          if (reasonBlocks.length > 0) {
            const parsedReasons: ReasonData[] = reasonBlocks.map((block: ContentBlock) => {
              const reasonContent = block.content
              return {
                icon: reasonContent.icon || '',
                title: reasonContent.title || '',
                description: reasonContent.description || '',
              }
            })
            setReasons(parsedReasons)
          }
        }
      } catch (error) {
        console.error('Error fetching why choose us content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWhyChooseUsContent()
  }, [])

  // Default content as fallback
  const defaultContent = {
    title: { content: { text: "Why Choose Us" } },
    subtitle: { content: { text: "Your Trusted Partner in HR Excellence" } },
    description: {
      content: {
        text: "At ESHRM, we understand that your people are your greatest asset. That's why we're committed to delivering HR solutions that not only solve today's challenges but position your organization for long-term success."
      }
    },
    image: {
      content: {
        src: "/images/consulting-team.jpg",
        alt: "ESHRM Consulting Team at Work"
      }
    }
  }

  const whyChooseUsContent = { ...defaultContent, ...content }

  // Default reasons as fallback
  const defaultReasons: ReasonData[] = [
    {
      icon: "award",
      title: "Deep Expertise",
      description:
        "Our team brings decades of combined experience across diverse industries and HR disciplines, ensuring you receive expert guidance tailored to your specific challenges.",
    },
    {
      icon: "target",
      title: "Tailored Solutions",
      description:
        "We don't believe in one-size-fits-all. Every solution we develop is customized to align with your unique organizational culture, goals, and market context.",
    },
    {
      icon: "trending-up",
      title: "Proven Track Record",
      description:
        "With over 500 successful client engagements and a 98% satisfaction rate, our results speak for themselves. We deliver measurable outcomes that drive real business value.",
    },
    {
      icon: "handshake",
      title: "Partnership Approach",
      description:
        "We work alongside your team as true partners, providing ongoing support and guidance to ensure sustainable success long after our engagement ends.",
    },
  ]

  const displayReasons = reasons.length > 0 ? reasons : defaultReasons

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="h-6 bg-muted-foreground/20 rounded-full w-32 mb-4"></div>
              <div className="h-12 bg-muted-foreground/20 rounded w-full mb-6"></div>
              <div className="h-6 bg-muted-foreground/20 rounded w-full mb-8"></div>
              <div className="aspect-video bg-muted-foreground/20 rounded-xl"></div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl bg-card p-6 shadow-sm border animate-pulse">
                  <div className="h-12 w-12 bg-muted-foreground/20 rounded-lg mb-4"></div>
                  <div className="h-6 bg-muted-foreground/20 rounded mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted-foreground/20 rounded"></div>
                    <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              {whyChooseUsContent.title?.content?.text || "Why Choose Us"}
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-balance">
              {whyChooseUsContent.subtitle?.content?.text || "Your Trusted Partner in HR Excellence"}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              {whyChooseUsContent.description?.content?.text ||
                "At ESHRM, we understand that your people are your greatest asset. That's why we're committed to delivering HR solutions that not only solve today's challenges but position your organization for long-term success."}
            </p>
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <img
                src={whyChooseUsContent.image?.content?.src || "/images/consulting-team.jpg"}
                alt={whyChooseUsContent.image?.content?.alt || "ESHRM Consulting Team at Work"}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {displayReasons.map((reason, index) => {
              const IconComponent = iconMap[reason.icon] || Award
              return (
                <div key={reason.title || index} className="rounded-xl bg-card p-6 shadow-sm border">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground">{reason.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
