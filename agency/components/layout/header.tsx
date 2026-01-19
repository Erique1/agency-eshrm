"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ContentBlock } from "@/lib/types"

interface HeaderContent {
  brand_name?: ContentBlock
  navigation?: ContentBlock
  cta_buttons?: ContentBlock
}

interface NavItem {
  title: string
  href: string
  type?: 'link' | 'dropdown'
  children?: NavItem[]
}

interface CTAButton {
  text: string
  href: string
  variant: 'default' | 'outline'
}

export function Header() {
  const [content, setContent] = useState<HeaderContent>({})
  const [navigation, setNavigation] = useState<NavItem[]>([])
  const [ctaButtons, setCtaButtons] = useState<CTAButton[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHeaderContent = async () => {
      try {
        const response = await fetch('/api/content?page=global&section=header')
        const data = await response.json()

        if (data.success && data.data.header) {
          const headerBlocks = data.data.header
          const contentMap: HeaderContent = {}

          headerBlocks.forEach((block: ContentBlock) => {
            contentMap[block.block_key as keyof HeaderContent] = block
          })

          setContent(contentMap)

          // Extract navigation
          const navBlock = headerBlocks.find((block: ContentBlock) => block.block_key === 'navigation')
          if (navBlock && navBlock.content.items && Array.isArray(navBlock.content.items)) {
            setNavigation(navBlock.content.items)
          }

          // Extract CTA buttons
          const ctaBlock = headerBlocks.find((block: ContentBlock) => block.block_key === 'cta_buttons')
          if (ctaBlock && ctaBlock.content.buttons && Array.isArray(ctaBlock.content.buttons)) {
            setCtaButtons(ctaBlock.content.buttons)
          }
        }
      } catch (error) {
        console.error('Error fetching header content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeaderContent()
  }, [])

  // Default content as fallback
  const defaultContent = {
    brand_name: { content: { text: "ESHRM" } }
  }

  const headerContent = { ...defaultContent, ...content }

  // Default navigation as fallback
  const defaultNavigation: NavItem[] = [
    { title: "Home", href: "/", type: "link" },
    { title: "About", href: "/about", type: "link" },
    {
      title: "Services",
      href: "#",
      type: "dropdown",
      children: [
        { title: "Custom HR Solutions", href: "/services/custom-hr-solutions" },
        { title: "Organizational Development", href: "/services/organizational-development" },
        { title: "Training & Workshops", href: "/services/training-workshops" },
        { title: "HR Policy Development", href: "/services/hr-policy-development" },
        { title: "Performance Management", href: "/services/performance-management" },
        { title: "Talent Acquisition", href: "/services/talent-acquisition" },
        { title: "NSSA Registration & Returns", href: "/services/nssa-registration-returns" },
      ]
    },
    { title: "Case Studies", href: "/case-studies", type: "link" },
    { title: "Insights", href: "/insights", type: "link" },
    { title: "Contact", href: "/contact", type: "link" },
  ]

  // Default CTA buttons as fallback
  const defaultCtaButtons: CTAButton[] = [
    { text: "Contact Us", href: "/contact", variant: "outline" },
    { text: "Book a Consultation", href: "/book-consultation", variant: "default" },
  ]

  const displayNavigation = navigation.length > 0 ? navigation : defaultNavigation
  const displayCtaButtons = ctaButtons.length > 0 ? ctaButtons : defaultCtaButtons

  const servicesItems = displayNavigation.find(item => item.type === 'dropdown')?.children || []

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 animate-pulse">
            <div className="h-10 w-10 bg-muted rounded-lg"></div>
            <div className="h-6 bg-muted rounded w-16"></div>
          </div>
          <div className="hidden lg:flex items-center gap-4 animate-pulse">
            <div className="h-10 bg-muted rounded w-20"></div>
            <div className="h-10 bg-muted rounded w-36"></div>
          </div>
          <div className="lg:hidden animate-pulse">
            <div className="h-10 w-10 bg-muted rounded"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {headerContent.brand_name?.content?.src ? (
              <img
                src={headerContent.brand_name.content.src}
                alt={headerContent.brand_name.content.alt || "Logo"}
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  // Fallback to text if image fails
                  const fallback = e.currentTarget.parentElement?.querySelector('.brand-text')
                  if (fallback) (fallback as HTMLElement).style.display = 'block'
                }}
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                E
              </div>
            )}
            <span className="font-bold text-xl brand-text" style={{ display: headerContent.brand_name?.content?.src ? 'none' : 'block' }}>
              {headerContent.brand_name?.content?.text || "ESHRM"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {displayNavigation.map((item) => (
              <NavigationMenuItem key={item.href}>
                {item.type === 'dropdown' ? (
                  <>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        {item.children?.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{child.title}</div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex lg:items-center lg:gap-4">
          {displayCtaButtons.map((button, index) => (
            <Button key={index} asChild variant={button.variant === 'outline' ? 'outline' : 'default'}>
              <Link href={button.href}>{button.text}</Link>
            </Button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {displayNavigation.map((item) => (
                item.type === 'dropdown' ? (
                  <div key={item.href}>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="flex w-full items-center justify-between text-lg font-medium"
                    >
                      {item.title}
                      <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
                    </button>
                    {servicesOpen && (
                      <div className="mt-2 ml-4 flex flex-col gap-2">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                )
              ))}
              <div className="flex flex-col gap-2 mt-4">
                {displayCtaButtons.map((button, index) => (
                  <Button
                    key={index}
                    asChild
                    variant={button.variant === 'outline' ? 'outline' : 'default'}
                  >
                    <Link href={button.href} onClick={() => setIsOpen(false)}>
                      {button.text}
                    </Link>
                  </Button>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
