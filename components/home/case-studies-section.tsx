"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { ContentBlock } from "@/lib/types"

interface CaseStudiesContent {
  title?: ContentBlock
  subtitle?: ContentBlock
  description?: ContentBlock
}

interface CaseStudyData {
  title: string
  client: string
  industry: string
  results: string[]
  image: string
  href: string
}

export function CaseStudiesSection() {
  const [content, setContent] = useState<CaseStudiesContent>({})
  const [caseStudies, setCaseStudies] = useState<CaseStudyData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCaseStudiesContent = async () => {
      try {
        // Fetch section content
        const contentResponse = await fetch('/api/content?page=home&section=case_studies')
        const contentData = await contentResponse.json()

        if (contentData.success && contentData.data.case_studies) {
          const caseStudiesBlocks = contentData.data.case_studies
          const contentMap: CaseStudiesContent = {}

          caseStudiesBlocks.forEach((block: ContentBlock) => {
            contentMap[block.block_key as keyof CaseStudiesContent] = block
          })

          setContent(contentMap)

          // Extract case studies from content blocks
          const studyBlocks = caseStudiesBlocks.filter((block: ContentBlock) =>
            block.block_key.startsWith('case_study_')
          )

          if (studyBlocks.length > 0) {
            const parsedCaseStudies: CaseStudyData[] = studyBlocks.map((block: ContentBlock) => {
              const studyContent = block.content
              return {
                title: studyContent.title || '',
                client: studyContent.client || '',
                industry: studyContent.industry || '',
                results: Array.isArray(studyContent.results) ? studyContent.results : [],
                image: studyContent.image || '',
                href: studyContent.href || '',
              }
            })
            setCaseStudies(parsedCaseStudies)
          }
        }
      } catch (error) {
        console.error('Error fetching case studies content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCaseStudiesContent()
  }, [])

  // Default content as fallback
  const defaultContent = {
    title: { content: { text: "Our Impact" } },
    subtitle: { content: { text: "Real Results for Real Organizations" } },
    description: {
      content: {
        text: "Discover how we've helped organizations across Africa transform their HR functions and achieve remarkable results."
      }
    }
  }

  const caseStudiesContent = { ...defaultContent, ...content }

  // Default case studies as fallback
  const defaultCaseStudies: CaseStudyData[] = [
    {
      title: "Digital Transformation of HR Operations",
      client: "Leading Fintech Company",
      industry: "Financial Services",
      results: [
        "40% reduction in HR administrative time",
        "85% employee satisfaction improvement",
        "60% faster onboarding",
      ],
      image: "/images/digital.jpg",
      href: "/case-studies/digital-transformation-hr",
    },
    {
      title: "Culture Transformation Program",
      client: "Pan-African Manufacturing Corp",
      industry: "Manufacturing",
      results: ["35% increase in engagement", "50% reduction in turnover", "25% productivity boost"],
      image: "/images/culture.jpg",
      href: "/case-studies/culture-transformation",
    },
    {
      title: "Leadership Development Initiative",
      client: "Regional Healthcare Network",
      industry: "Healthcare",
      results: ["90% participants promoted", "65% leadership readiness improvement", "75% internal promotions"],
      image: "/images/leadership.jpg",
      href: "/case-studies/leadership-development",
    },
  ]

  const displayCaseStudies = caseStudies.length > 0 ? caseStudies : defaultCaseStudies

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="h-6 bg-muted-foreground/20 rounded-full w-32 mx-auto mb-4"></div>
            <div className="h-12 bg-muted-foreground/20 rounded w-full mb-4"></div>
            <div className="h-6 bg-muted-foreground/20 rounded w-3/4 mx-auto"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="group overflow-hidden animate-pulse">
                <div className="aspect-video bg-muted-foreground/20"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-muted-foreground/20 rounded mb-3 w-24"></div>
                  <div className="h-6 bg-muted-foreground/20 rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mb-4"></div>
                  <div className="space-y-1 mb-4">
                    <div className="h-4 bg-muted-foreground/20 rounded"></div>
                    <div className="h-4 bg-muted-foreground/20 rounded w-5/6"></div>
                    <div className="h-4 bg-muted-foreground/20 rounded w-4/6"></div>
                  </div>
                  <div className="h-4 bg-muted-foreground/20 rounded w-32"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            {caseStudiesContent.title?.content?.text || "Our Impact"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
            {caseStudiesContent.subtitle?.content?.text || "Real Results for Real Organizations"}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            {caseStudiesContent.description?.content?.text ||
              "Discover how we've helped organizations across Africa transform their HR functions and achieve remarkable results."}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayCaseStudies.map((study, index) => (
            <Card key={study.title || index} className="group overflow-hidden transition-all hover:shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {study.industry}
                </Badge>
                <h3 className="mb-2 text-xl font-bold">{study.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{study.client}</p>
                <ul className="mb-4 space-y-1">
                  {study.results.map((result, resultIndex) => (
                    <li key={resultIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {result}
                    </li>
                  ))}
                </ul>
                <Link
                  href={study.href || "/case-studies"}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Read case study <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/case-studies">View All Case Studies</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
