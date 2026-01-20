"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react"
import type { ContentBlock } from "@/lib/types"

interface FooterContent {
  brand_name?: ContentBlock
  brand_description?: ContentBlock
  social_links?: ContentBlock
  services_links?: ContentBlock
  quick_links?: ContentBlock
  legal_links?: ContentBlock
  contact_info?: ContentBlock
  newsletter_title?: ContentBlock
  copyright_text?: ContentBlock
}

interface LinkData {
  title: string
  href: string
}

interface SocialLinkData {
  platform: string
  url: string
}

interface ContactInfoData {
  type: string
  value: string
  label?: string
}

export function Footer() {
  const { theme } = useTheme()
  const [content, setContent] = useState<FooterContent>({})
  const [services, setServices] = useState<LinkData[]>([])
  const [quickLinks, setQuickLinks] = useState<LinkData[]>([])
  const [legalLinks, setLegalLinks] = useState<LinkData[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLinkData[]>([])
  const [contactInfo, setContactInfo] = useState<ContactInfoData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        const response = await fetch('/api/content?page=global&section=footer')
        const data = await response.json()

        if (data.success && data.data.footer) {
          const footerBlocks = data.data.footer
          const contentMap: FooterContent = {}

          footerBlocks.forEach((block: ContentBlock) => {
            contentMap[block.block_key as keyof FooterContent] = block
          })

          setContent(contentMap)

          // Extract different types of content
          footerBlocks.forEach((block: ContentBlock) => {
            const blockContent = block.content

            switch (block.block_key) {
              case 'services_links':
                if (blockContent.links && Array.isArray(blockContent.links)) {
                  setServices(blockContent.links)
                }
                break
              case 'quick_links':
                if (blockContent.links && Array.isArray(blockContent.links)) {
                  setQuickLinks(blockContent.links)
                }
                break
              case 'legal_links':
                if (blockContent.links && Array.isArray(blockContent.links)) {
                  setLegalLinks(blockContent.links)
                }
                break
              case 'social_links':
                if (blockContent.links && Array.isArray(blockContent.links)) {
                  setSocialLinks(blockContent.links)
                }
                break
              case 'contact_info':
                if (blockContent.contacts && Array.isArray(blockContent.contacts)) {
                  setContactInfo(blockContent.contacts)
                }
                break
            }
          })
        }
      } catch (error) {
        console.error('Error fetching footer content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFooterContent()
  }, [])

  // Default content as fallback
  const defaultContent = {
    brand_name: { content: { text: "ESHRM" } },
    brand_description: {
      content: {
        text: "Transforming human resource management for African businesses through customized, client-centric, and impact-driven solutions."
      }
    },
    newsletter_title: { content: { text: "Subscribe to our newsletter" } },
    copyright_text: { content: { text: `© ${new Date().getFullYear()} ESHRM. All rights reserved.` } }
  }

  const footerContent = { ...defaultContent, ...content }

  // Default data as fallback
  const defaultServices: LinkData[] = [
    { title: "Custom HR Solutions", href: "/services/custom-hr-solutions" },
    { title: "Organizational Development", href: "/services/organizational-development" },
    { title: "Training & Workshops", href: "/services/training-workshops" },
    { title: "HR Policy Development", href: "/services/hr-policy-development" },
    { title: "Performance Management", href: "/services/performance-management" },
    { title: "Talent Acquisition", href: "/services/talent-acquisition" },
  ]

  const defaultQuickLinks: LinkData[] = [
    { title: "About Us", href: "/about" },
    { title: "Case Studies", href: "/case-studies" },
    { title: "Insights", href: "/insights" },
    { title: "Contact", href: "/contact" },
    { title: "Book Consultation", href: "/book-consultation" },
  ]

  const defaultLegalLinks: LinkData[] = [
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms & Conditions", href: "/terms-conditions" },
  ]

  const defaultSocialLinks: SocialLinkData[] = [
    { platform: "linkedin", url: "https://linkedin.com" },
    { platform: "twitter", url: "https://twitter.com" },
    { platform: "facebook", url: "https://facebook.com" },
  ]

  const defaultContactInfo: ContactInfoData[] = [
    { type: "address", value: "Harare, Zimbabwe" },
    { type: "phone", value: "+263 779 122 227", label: "+263 774 193 064" },
    { type: "email", value: "info@eshrm.africa" },
  ]

  const displayServices = services.length > 0 ? services : defaultServices
  const displayQuickLinks = quickLinks.length > 0 ? quickLinks : defaultQuickLinks
  const displayLegalLinks = legalLinks.length > 0 ? legalLinks : defaultLegalLinks
  const displaySocialLinks = socialLinks.length > 0 ? socialLinks : defaultSocialLinks
  const displayContactInfo = contactInfo.length > 0 ? contactInfo : defaultContactInfo

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />
      case 'twitter':
        return <Twitter className="h-5 w-5" />
      case 'facebook':
        return <Facebook className="h-5 w-5" />
      default:
        return null
    }
  }

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'address':
        return <MapPin className="h-5 w-5 shrink-0 text-primary" />
      case 'phone':
        return <Phone className="h-5 w-5 shrink-0 text-primary" />
      case 'email':
        return <Mail className="h-5 w-5 shrink-0 text-primary" />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <footer className="bg-foreground text-background">
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4 animate-pulse">
              <div className="h-6 bg-muted-foreground/20 rounded w-24"></div>
              <div className="h-4 bg-muted-foreground/20 rounded w-full"></div>
              <div className="flex gap-4">
                <div className="h-5 w-5 bg-muted-foreground/20 rounded"></div>
                <div className="h-5 w-5 bg-muted-foreground/20 rounded"></div>
                <div className="h-5 w-5 bg-muted-foreground/20 rounded"></div>
              </div>
            </div>
            <div className="animate-pulse">
              <div className="h-6 bg-muted-foreground/20 rounded w-32 mb-4"></div>
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
                ))}
              </div>
            </div>
            <div className="animate-pulse">
              <div className="h-6 bg-muted-foreground/20 rounded w-24 mb-4"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted-foreground/20 rounded w-2/3"></div>
                ))}
              </div>
            </div>
            <div className="animate-pulse">
              <div className="h-6 bg-muted-foreground/20 rounded w-24 mb-4"></div>
              <div className="space-y-3 mb-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-5 w-5 bg-muted-foreground/20 rounded"></div>
                    <div className="h-4 bg-muted-foreground/20 rounded w-32"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={theme === 'dark' ? '/logo.png' : '/logo-light.png'}
                  alt="ESHRM Logo"
                  className="h-8 w-auto object-contain"
                />
                <span className="font-bold text-xl text-background">
                  ESHRM
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              {footerContent.brand_description?.content?.text ||
                "Transforming human resource management for African businesses through customized, client-centric, and impact-driven solutions."}
            </p>
            <div className="flex gap-4">
              {displaySocialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {getSocialIcon(social.platform)}
                  <span className="sr-only">{social.platform}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              {displayServices.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {displayQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-muted-foreground/20">
              {displayLegalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors mb-2"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Newsletter Column */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 mb-6">
              {displayContactInfo.map((contact, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  {getContactIcon(contact.type)}
                  {contact.type === 'phone' ? (
                    <div className="flex flex-col">
                      <span>{contact.value}</span>
                      {contact.label && <span>{contact.label}</span>}
                    </div>
                  ) : (
                    <span>{contact.value}</span>
                  )}
                </li>
              ))}
            </ul>
            <h4 className="mb-2 text-sm font-semibold">
              {footerContent.newsletter_title?.content?.text || "Subscribe to our newsletter"}
            </h4>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background/10 border-muted-foreground/20 text-background placeholder:text-muted-foreground"
              />
              <Button type="submit" size="sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted-foreground/20 text-center text-sm text-muted-foreground">
          <p>{footerContent.copyright_text?.content?.text || `© ${new Date().getFullYear()} ESHRM. All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  )
}
