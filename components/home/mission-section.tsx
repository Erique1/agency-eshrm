"use client"

import { useEffect, useState } from "react"
import { Target, Eye, Heart } from "lucide-react"
import type { ContentBlock } from "@/lib/types"

interface MissionContent {
  title?: ContentBlock
  content?: ContentBlock
  clients?: ContentBlock
  countries?: ContentBlock
  satisfaction?: ContentBlock
}

export function MissionSection() {
  const [content, setContent] = useState<MissionContent>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMissionContent = async () => {
      try {
        const response = await fetch('/api/content?page=home&section=mission')
        const data = await response.json()

        if (data.success && data.data.mission) {
          const missionBlocks = data.data.mission
          const contentMap: MissionContent = {}

          missionBlocks.forEach((block: ContentBlock) => {
            contentMap[block.block_key as keyof MissionContent] = block
          })

          setContent(contentMap)
        }
      } catch (error) {
        console.error('Error fetching mission content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMissionContent()
  }, [])

  // Default content as fallback
  const defaultContent = {
    title: { content: { text: "Our Mission" } },
    content: {
      content: {
        text: "To empower African businesses with world-class HR solutions that drive sustainable growth and create high-performing teams."
      }
    },
    clients: {
      content: {
        value: "20+",
        label: "Happy Clients"
      }
    },
    countries: {
      content: {
        value: "1",
        label: "African Country Served"
      }
    },
    satisfaction: {
      content: {
        value: "98%",
        label: "Client Satisfaction"
      }
    }
  }

  const missionContent = { ...defaultContent, ...content }

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="h-8 bg-primary-foreground/20 rounded mb-4"></div>
            <div className="h-4 bg-primary-foreground/20 rounded w-3/4 mx-auto"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="mx-auto mb-6 h-16 w-16 bg-primary-foreground/20 rounded-full"></div>
                <div className="h-6 bg-primary-foreground/20 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-primary-foreground/20 rounded"></div>
                  <div className="h-4 bg-primary-foreground/20 rounded w-3/4 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
            {missionContent.title?.content?.text || "Our Mission"}
          </h2>
          <p className="text-lg text-primary-foreground/80 text-pretty">
            {missionContent.content?.content?.text ||
              "To empower African businesses with world-class HR solutions that drive sustainable growth and create high-performing teams."}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {missionContent.clients?.content?.value || "20+"}
            </div>
            <div className="text-primary-foreground/80">
              {missionContent.clients?.content?.label || "Happy Clients"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {missionContent.countries?.content?.value || "20+"}
            </div>
            <div className="text-primary-foreground/80">
              {missionContent.countries?.content?.label || "African Countries"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {missionContent.satisfaction?.content?.value || "98%"}
            </div>
            <div className="text-primary-foreground/80">
              {missionContent.satisfaction?.content?.label || "Client Satisfaction"}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
