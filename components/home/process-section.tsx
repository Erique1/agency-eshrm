"use client"

import { useEffect, useState } from "react"
import { Search, Lightbulb, Rocket } from "lucide-react"
import type { ContentBlock } from "@/lib/types"

interface ProcessContent {
  title?: ContentBlock
  subtitle?: ContentBlock
  description?: ContentBlock
}

interface ProcessStep {
  icon: string
  step: string
  title: string
  description: string
}

const iconMap: Record<string, any> = {
  search: Search,
  lightbulb: Lightbulb,
  rocket: Rocket,
}

export function ProcessSection() {
  const [content, setContent] = useState<ProcessContent>({})
  const [steps, setSteps] = useState<ProcessStep[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProcessContent = async () => {
      try {
        // Fetch section content
        const contentResponse = await fetch('/api/content?page=home&section=process')
        const contentData = await contentResponse.json()

        if (contentData.success && contentData.data.process) {
          const processBlocks = contentData.data.process
          const contentMap: ProcessContent = {}

          processBlocks.forEach((block: ContentBlock) => {
            contentMap[block.block_key as keyof ProcessContent] = block
          })

          setContent(contentMap)

          // Extract process steps from content blocks
          const stepBlocks = processBlocks.filter((block: ContentBlock) =>
            block.block_key.startsWith('step_')
          )

          if (stepBlocks.length > 0) {
            const parsedSteps: ProcessStep[] = stepBlocks.map((block: ContentBlock) => {
              const stepContent = block.content
              return {
                icon: stepContent.icon || '',
                step: stepContent.step || '',
                title: stepContent.title || '',
                description: stepContent.description || '',
              }
            })
            setSteps(parsedSteps)
          }
        }
      } catch (error) {
        console.error('Error fetching process content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProcessContent()
  }, [])

  // Default content as fallback
  const defaultContent = {
    title: { content: { text: "How We Work" } },
    subtitle: { content: { text: "A Proven Approach to HR Transformation" } },
    description: {
      content: {
        text: "Our structured methodology ensures consistent, high-quality results while remaining flexible enough to adapt to your unique needs."
      }
    }
  }

  const processContent = { ...defaultContent, ...content }

  // Default steps as fallback
  const defaultSteps: ProcessStep[] = [
    {
      icon: "search",
      step: "01",
      title: "Discovery & Assessment",
      description:
        "We begin by deeply understanding your organization—your culture, challenges, goals, and current HR landscape. Through comprehensive assessments and stakeholder interviews, we identify opportunities for improvement.",
    },
    {
      icon: "lightbulb",
      step: "02",
      title: "Strategy Development",
      description:
        "Based on our findings, we develop a customized HR strategy that aligns with your business objectives. We present clear recommendations with expected outcomes and implementation roadmaps.",
    },
    {
      icon: "rocket",
      step: "03",
      title: "Implementation & Support",
      description:
        "We work alongside your team to implement solutions, providing hands-on support, training, and guidance. Our commitment doesn't end at delivery—we ensure sustainable success through ongoing partnership.",
    },
  ]

  const displaySteps = steps.length > 0 ? steps : defaultSteps

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="h-6 bg-muted-foreground/20 rounded-full w-24 mx-auto mb-4"></div>
            <div className="h-12 bg-muted-foreground/20 rounded w-full mb-4"></div>
            <div className="h-6 bg-muted-foreground/20 rounded w-3/4 mx-auto"></div>
          </div>
          <div className="relative">
            <div className="grid gap-12 lg:gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-8 lg:flex-row lg:items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""} animate-pulse`}
                >
                  <div className="flex-1">
                    <div className={`max-w-md ${i % 2 === 1 ? "lg:ml-auto" : ""}`}>
                      <div className="mb-4 inline-flex items-center gap-4">
                        <div className="h-16 w-16 bg-muted-foreground/20 rounded-full"></div>
                        <div className="h-12 w-12 bg-muted-foreground/20 rounded-full"></div>
                      </div>
                      <div className="h-8 bg-muted-foreground/20 rounded mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted-foreground/20 rounded"></div>
                        <div className="h-4 bg-muted-foreground/20 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block lg:w-4">
                    <div className="h-4 w-4 bg-muted-foreground/20 rounded-full mx-auto"></div>
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
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
            {processContent.title?.content?.text || "How We Work"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
            {processContent.subtitle?.content?.text || "A Proven Approach to HR Transformation"}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            {processContent.description?.content?.text ||
              "Our structured methodology ensures consistent, high-quality results while remaining flexible enough to adapt to your unique needs."}
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />

          <div className="grid gap-12 lg:gap-8">
            {displaySteps.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Search
              return (
                <div
                  key={item.step || index}
                  className={`flex flex-col gap-8 lg:flex-row lg:items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="flex-1">
                    <div className={`max-w-md ${index % 2 === 1 ? "lg:ml-auto" : ""}`}>
                      <div className="mb-4 inline-flex items-center gap-4">
                        <span className="text-5xl font-bold text-primary/20">{item.step}</span>
                        <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          <IconComponent className="h-6 w-6" />
                        </div>
                      </div>
                      <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden lg:block lg:w-4">
                    <div className="mx-auto h-4 w-4 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
