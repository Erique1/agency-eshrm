"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import type { ContentBlock } from "@/lib/types"

interface ClientsContent {
  title?: ContentBlock
  subtitle?: ContentBlock
  description?: ContentBlock
  footer_text?: ContentBlock
}

interface ClientData {
  name: string
  logo: string
}

export function ClientsCarousel() {
  const [content, setContent] = useState<ClientsContent>({})
  const [clients, setClients] = useState<ClientData[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchClientsContent = async () => {
      try {
        // Fetch section content
        const contentResponse = await fetch('/api/content?page=home&section=clients')
        const contentData = await contentResponse.json()

        if (contentData.success && contentData.data.clients) {
          const clientsBlocks = contentData.data.clients
          const contentMap: ClientsContent = {}

          clientsBlocks.forEach((block: ContentBlock) => {
            contentMap[block.block_key as keyof ClientsContent] = block
          })

          setContent(contentMap)

          // Extract clients from content blocks
          const clientBlocks = clientsBlocks.filter((block: ContentBlock) =>
            block.block_key.startsWith('client_')
          )

          if (clientBlocks.length > 0) {
            const parsedClients: ClientData[] = clientBlocks.map((block: ContentBlock) => {
              const clientContent = block.content
              return {
                name: clientContent.name || '',
                logo: clientContent.logo || '',
              }
            })
            setClients(parsedClients)
          }
        }
      } catch (error) {
        console.error('Error fetching clients content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClientsContent()
  }, [])

  useEffect(() => {
    if (clients.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length)
      }, 3000) // Change slide every 3 seconds

      return () => clearInterval(interval)
    }
  }, [clients.length])

  // Default content as fallback
  const defaultContent = {
    title: { content: { text: "Trusted Partners" } },
    subtitle: { content: { text: "Clients We Work With", highlight: "Work With" } },
    description: {
      content: {
        text: "We're proud to partner with leading organizations across various industries to transform their HR functions."
      }
    },
    footer_text: {
      content: {
        text: "Join hundreds of organizations that trust ESHRM with their HR transformation"
      }
    }
  }

  const clientsContent = { ...defaultContent, ...content }

  // Default clients as fallback
  const defaultClients: ClientData[] = [
    { name: "JULY MOTION", logo: "JM" },
    { name: "LYNDEL HOUSE COLLEGE", logo: "LHC" },
    { name: "MONTAGUE RADIOLOGY", logo: "MR" },
    { name: "MEGAMEDIA GROUP", logo: "MMG" },
    { name: "HYDRO DRILLING", logo: "HD" },
    { name: "STRANGE LOVE ENTERPRISES", logo: "SLE" },
    { name: "BROOKLYN BRIGHT CONSTRUCTION", logo: "BBC" },
    { name: "PERLICOP AUTO", logo: "PA" },
  ]

  const displayClients = clients.length > 0 ? clients : defaultClients

  const getVisibleClients = () => {
    const visible = []
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % displayClients.length
      visible.push(displayClients[index])
    }
    return visible
  }

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="h-6 bg-muted-foreground/20 rounded-full w-32 mx-auto mb-4"></div>
            <div className="h-12 bg-muted-foreground/20 rounded w-full mb-4"></div>
            <div className="h-6 bg-muted-foreground/20 rounded w-3/4 mx-auto"></div>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex justify-center gap-8">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="flex items-center justify-center p-6 min-w-[200px] h-24 bg-white shadow-sm animate-pulse">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-muted-foreground/20 rounded-lg mx-auto mb-2"></div>
                    <div className="h-3 bg-muted-foreground/20 rounded w-24 mx-auto"></div>
                  </div>
                </Card>
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
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            {clientsContent.title?.content?.text || "Trusted Partners"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
            {clientsContent.subtitle?.content?.text || "Clients We Work With"}
            {clientsContent.subtitle?.content?.highlight && (
              <span className="text-primary"> {clientsContent.subtitle.content.highlight}</span>
            )}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            {clientsContent.description?.content?.text ||
              "We're proud to partner with leading organizations across various industries to transform their HR functions."}
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out">
            <div className="flex min-w-full justify-center gap-8">
              {getVisibleClients().map((client, index) => (
                <Card
                  key={`${client.name}-${index}`}
                  className="flex items-center justify-center p-6 min-w-[200px] h-24 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-primary rounded-lg text-primary-foreground font-bold text-lg">
                      {client.logo}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium truncate max-w-[160px]">
                      {client.name}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {displayClients.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to client ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            {clientsContent.footer_text?.content?.text ||
              "Join hundreds of organizations that trust ESHRM with their HR transformation"}
          </p>
        </div>
      </div>
    </section>
  )
}
