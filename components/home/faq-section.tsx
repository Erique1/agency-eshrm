"use client"

import { useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { ContentBlock } from "@/lib/types"

interface FAQContent {
  title?: ContentBlock
  subtitle?: ContentBlock
  description?: ContentBlock
}

interface FAQItem {
  question: string
  answer: string
}

export function FAQSection() {
  const [content, setContent] = useState<FAQContent>({})
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFAQContent = async () => {
      try {
        // Fetch section content
        const contentResponse = await fetch('/api/content?page=home&section=faq')
        const contentData = await contentResponse.json()

        if (contentData.success && contentData.data.faq) {
          const faqBlocks = contentData.data.faq
          const contentMap: FAQContent = {}

          faqBlocks.forEach((block: ContentBlock) => {
            contentMap[block.block_key as keyof FAQContent] = block
          })

          setContent(contentMap)

          // Extract FAQs from content blocks
          const faqBlocksFiltered = faqBlocks.filter((block: ContentBlock) =>
            block.block_key.startsWith('faq_')
          )

          if (faqBlocksFiltered.length > 0) {
            const parsedFaqs: FAQItem[] = faqBlocksFiltered.map((block: ContentBlock) => {
              const faqContent = block.content
              return {
                question: faqContent.question || '',
                answer: faqContent.answer || '',
              }
            })
            setFaqs(parsedFaqs)
          }
        }
      } catch (error) {
        console.error('Error fetching FAQ content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFAQContent()
  }, [])

  // Default content as fallback
  const defaultContent = {
    title: { content: { text: "FAQ" } },
    subtitle: { content: { text: "Frequently Asked Questions" } },
    description: {
      content: {
        text: "Find answers to common questions about our services and approach."
      }
    }
  }

  const faqContent = { ...defaultContent, ...content }

  // Default FAQs as fallback
  const defaultFaqs: FAQItem[] = [
    {
      question: "What industries do you specialize in?",
      answer:
        "We work across all industries including financial services, healthcare, manufacturing, technology, retail, and more. Our team has deep expertise in adapting HR best practices to the unique challenges and regulations of each sector.",
    },
    {
      question: "How long does a typical engagement last?",
      answer:
        "Engagement duration varies based on scope and complexity. A focused project like policy development might take 4-8 weeks, while comprehensive organizational transformation can span 6-12 months. We'll provide a clear timeline during our initial consultation.",
    },
    {
      question: "Do you work with small businesses or only large corporations?",
      answer:
        "We work with organizations of all sizes. Whether you're a growing startup needing to establish HR foundations or a large enterprise seeking transformation, we tailor our approach and pricing to match your needs and budget.",
    },
    {
      question: "What makes ESHRM different from other HR consultants?",
      answer:
        "Our deep African market expertise, client-centric approach, and commitment to sustainable results set us apart. We don't just deliver recommendations—we partner with you through implementation and beyond to ensure lasting success.",
    },
    {
      question: "Can you help with compliance across multiple African countries?",
      answer:
        "Absolutely. We have expertise in labor laws and HR regulations across 2+. We help organizations navigate complex multi-country compliance requirements while maintaining consistent HR practices.",
    },
    {
      question: "What does the consultation process look like?",
      answer:
        "It starts with a complimentary discovery call where we learn about your challenges and goals. From there, we propose a tailored engagement plan. Once agreed, we begin with a thorough assessment before developing and implementing solutions.",
    },
  ]

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="h-6 bg-muted-foreground/20 rounded-full w-16 mx-auto mb-4"></div>
            <div className="h-12 bg-muted-foreground/20 rounded w-full mb-4"></div>
            <div className="h-6 bg-muted-foreground/20 rounded w-3/4 mx-auto"></div>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-muted-foreground/20 rounded mb-2"></div>
                  <div className="h-16 bg-muted-foreground/20 rounded"></div>
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
            {faqContent.title?.content?.text || "FAQ"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
            {faqContent.subtitle?.content?.text || "Frequently Asked Questions"}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            {faqContent.description?.content?.text ||
              "Find answers to common questions about our services and approach."}
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {displayFaqs.map((faq, index) => (
              <AccordionItem key={faq.question || index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
