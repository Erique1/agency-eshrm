"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Target, Eye, Heart, Users, Globe, Award, TrendingUp, ArrowRight } from "lucide-react"
import type { ContentBlock } from "@/lib/types"

interface AboutContent {
  [key: string]: any
  hero?: { badge?: ContentBlock; title?: ContentBlock; subtitle?: ContentBlock; background?: ContentBlock }
  story?: { title?: ContentBlock; content1?: ContentBlock; content2?: ContentBlock; content3?: ContentBlock; story_image?: ContentBlock; impact_years?: ContentBlock }
  mission_vision?: { mission_title?: ContentBlock; mission_content?: ContentBlock; vision_title?: ContentBlock; vision_content?: ContentBlock }
  values?: { title?: ContentBlock; subtitle?: ContentBlock; excellence?: ContentBlock; integrity?: ContentBlock; innovation?: ContentBlock; collaboration?: ContentBlock }
  team?: { title?: ContentBlock; subtitle?: ContentBlock }
  stats?: { [key: string]: ContentBlock }
  africa_focus?: { badge?: ContentBlock; title?: ContentBlock; description1?: ContentBlock; description2?: ContentBlock; image?: ContentBlock; countries_stat?: ContentBlock; sectors_stat?: ContentBlock }
  cta?: { title?: ContentBlock; subtitle?: ContentBlock; primary_cta?: ContentBlock; secondary_cta?: ContentBlock }
}

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

interface ValueItem {
  icon: string
  title: string
  description: string
}

interface StatItem {
  value: string
  label: string
}

const iconMap: Record<string, any> = {
  award: Award,
  heart: Heart,
  'trending-up': TrendingUp,
  users: Users,
}

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent>({})
  const [values, setValues] = useState<ValueItem[]>([])
  const [stats, setStats] = useState<StatItem[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await fetch('/api/content?page=about')
        const data = await response.json()

        if (data.success && data.data) {
          const aboutBlocks = data.data
          const contentMap: AboutContent = {}

          // Group blocks by section
          aboutBlocks.forEach((block: ContentBlock) => {
            const section = block.section
            if (!contentMap[section]) {
              contentMap[section] = {}
            }

            if (section === 'hero') {
              contentMap.hero = contentMap.hero || {}
              contentMap.hero[block.block_key as keyof typeof contentMap.hero] = block
            } else if (section === 'story') {
              contentMap.story = contentMap.story || {}
              contentMap.story[block.block_key as keyof typeof contentMap.story] = block
            } else if (section === 'mission_vision') {
              contentMap.mission_vision = contentMap.mission_vision || {}
              contentMap.mission_vision[block.block_key as keyof typeof contentMap.mission_vision] = block
            } else if (section === 'values') {
              contentMap.values = contentMap.values || {}
              contentMap.values[block.block_key as keyof typeof contentMap.values] = block
            } else if (section === 'stats') {
              contentMap.stats = contentMap.stats || {}
              contentMap.stats[block.block_key as keyof typeof contentMap.stats] = block
            } else if (section === 'africa_focus') {
              contentMap.africa_focus = contentMap.africa_focus || {}
              contentMap.africa_focus[block.block_key as keyof typeof contentMap.africa_focus] = block
            } else if (section === 'cta') {
              contentMap.cta = contentMap.cta || {}
              contentMap.cta[block.block_key as keyof typeof contentMap.cta] = block
            }
          })

          setContent(contentMap)

          // Extract values
          const valuesBlocks = aboutBlocks.filter((block: ContentBlock) =>
            block.section === 'values' && block.block_type === 'feature'
          )
          if (valuesBlocks.length > 0) {
            const parsedValues: ValueItem[] = valuesBlocks.map((block: ContentBlock) => {
              const valueContent = block.content
              return {
                icon: valueContent.icon || '',
                title: valueContent.title || '',
                description: valueContent.description || '',
              }
            })
            setValues(parsedValues)
          }

          // Extract stats
          const statsBlocks = aboutBlocks.filter((block: ContentBlock) =>
            block.section === 'stats' && block.block_type === 'stats_item'
          )
          if (statsBlocks.length > 0) {
            const parsedStats: StatItem[] = statsBlocks.map((block: ContentBlock) => {
              const statContent = block.content
              return {
                value: statContent.value || '',
                label: statContent.label || '',
              }
            })
            setStats(parsedStats)
          }

          // Extract team
          const teamBlocks = aboutBlocks.filter((block: ContentBlock) =>
            block.section === 'team' && block.block_type === 'team_member'
          )
          if (teamBlocks.length > 0) {
            const parsedTeam: TeamMember[] = teamBlocks.map((block: ContentBlock) => {
              const teamContent = block.content
              return {
                name: teamContent.name || '',
                role: teamContent.role || '',
                bio: teamContent.bio || '',
                image: teamContent.image || '',
              }
            })
            setTeam(parsedTeam)
          }
        }
      } catch (error) {
        console.error('Error fetching about content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAboutContent()
  }, [])

  // Default content as fallback
  const defaultContent = {
    hero: {
      badge: { content: { text: "About ESHRM" } },
      title: { content: { text: "Transforming HR for African Businesses", highlight: "African Businesses" } },
      subtitle: { content: { text: "We are a leading HR and business consulting firm dedicated to empowering African organizations through customized, client-centric, and impact-driven human resource solutions." } },
      background: { content: { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop", alt: "ESHRM Team Collaboration" } }
    },
    story: {
      title: { content: { text: "Our Story" } },
      content1: { content: { text: "Founded in 2010, ESHRM emerged from a vision to revolutionize how African businesses approach human resource management. We recognized that the unique challenges and opportunities of the African market required HR solutions tailored to local contexts while meeting global standards." } },
      content2: { content: { text: "Over the years, we've grown from a small consultancy to a trusted partner for over 500 organizations across 20+ African countries. Our success is built on deep expertise, unwavering commitment to our clients, and a genuine passion for developing Africa's workforce." } },
      content3: { content: { text: "Today, ESHRM stands as a beacon of HR excellence in Africa, helping organizations build high-performing teams, develop future leaders, and create workplaces where both people and businesses thrive." } },
      story_image: { content: { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop", alt: "ESHRM Team Collaboration" } },
      impact_years: { content: { value: "15+", label: "Years of Impact" } }
    },
    mission_vision: {
      mission_title: { content: { text: "Our Mission" } },
      mission_content: { content: { text: "To transform human resource management for African businesses through customized, client-centric, and impact-driven solutions that empower organizations to build high-performing teams and achieve sustainable growth." } },
      vision_title: { content: { text: "Our Vision" } },
      vision_content: { content: { text: "To be Africa's most trusted HR consulting partner, recognized for driving organizational excellence and building workplaces where people and businesses flourish together across the continent." } }
    },
    africa_focus: {
      badge: { content: { text: "Africa Focus" } },
      title: { content: { text: "Deep Roots Across the Continent" } },
      description1: { content: { text: "Our African heritage gives us unique insight into the opportunities and challenges facing businesses on the continent. We understand the diverse regulatory landscapes, cultural nuances, and market dynamics that shape HR practices across different regions." } },
      description2: { content: { text: "From Harare to Nairobi, Johannesburg to Accra, we've helped organizations navigate complex HR challenges while building workforces ready for the future. Our pan-African network ensures we can support your business wherever you operate." } },
      image: { content: { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", alt: "ESHRM Africa Coverage" } },
      countries_stat: { content: { value: "20+", label: "Countries Served" } },
      sectors_stat: { content: { value: "50+", label: "Industry Sectors" } }
    },
    cta: {
      title: { content: { text: "Ready to Partner with Us?" } },
      subtitle: { content: { text: "Discover how ESHRM can help transform your organization's HR function and drive sustainable success." } },
      primary_cta: { content: { text: "Book a Consultation", link: "/book-consultation", variant: "secondary" } },
      secondary_cta: { content: { text: "Contact Us", link: "/contact", variant: "outline" } }
    }
  }

  const aboutContent = { ...defaultContent, ...content }

  // Default values as fallback
  const defaultValues: ValueItem[] = [
    {
      icon: "award",
      title: "Excellence",
      description: "We pursue the highest standards in everything we do, delivering exceptional quality and results.",
    },
    {
      icon: "heart",
      title: "Integrity",
      description: "We operate with honesty, transparency, and ethical conduct in all our relationships and engagements.",
    },
    {
      icon: "trending-up",
      title: "Innovation",
      description: "We embrace new ideas and approaches, continuously evolving to meet the changing needs of our clients.",
    },
    {
      icon: "users",
      title: "Collaboration",
      description: "We work as true partners with our clients, fostering teamwork and shared success.",
    },
  ]

  // Default stats as fallback
  const defaultStats: StatItem[] = [
    { value: "15+", label: "Years of Excellence" },
    { value: "500+", label: "Clients Served" },
    { value: "20+", label: "African Countries" },
    { value: "98%", label: "Client Satisfaction" },
  ]

  // Default team as fallback
  const defaultTeam: TeamMember[] = [
    {
      name: "Dr. Adaora Nwankwo",
      role: "Founder & CEO",
      bio: "With over 25 years of HR leadership experience across Africa, Dr. Nwankwo founded ESHRM to transform how African businesses approach human capital.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Emmanuel Koffi",
      role: "Chief Consulting Officer",
      bio: "Emmanuel brings 20 years of organizational development expertise, having led transformation projects for Fortune 500 companies and African enterprises alike.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Zainab Ibrahim",
      role: "Head of Training & Development",
      bio: "A certified master trainer with expertise in leadership development, Zainab has designed and delivered programs for over 10,000 professionals.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    },
  ]

  const displayValues = values.length > 0 ? values : defaultValues
  const displayStats = stats.length > 0 ? stats : defaultStats
  const displayTeam = team.length > 0 ? team : defaultTeam

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="animate-pulse space-y-20">
            {/* Hero skeleton */}
            <section className="py-20 lg:py-28">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                  <div className="h-6 bg-muted-foreground/20 rounded-full w-32 mx-auto mb-4"></div>
                  <div className="h-12 bg-muted-foreground/20 rounded w-full mb-6"></div>
                  <div className="h-6 bg-muted-foreground/20 rounded w-3/4 mx-auto"></div>
                </div>
              </div>
            </section>
            {/* Other sections skeleton */}
            <div className="container mx-auto px-4 space-y-20">
              <div className="h-96 bg-muted-foreground/20 rounded"></div>
              <div className="h-96 bg-muted-foreground/20 rounded"></div>
              <div className="h-96 bg-muted-foreground/20 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted py-20 lg:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                {aboutContent.hero?.badge?.content?.text || "About ESHRM"}
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-balance">
                {aboutContent.hero?.title?.content?.text || "Transforming HR for African Businesses"}
                {aboutContent.hero?.title?.content?.highlight && (
                  <span className="text-primary"> {aboutContent.hero.title.content.highlight}</span>
                )}
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                {aboutContent.hero?.subtitle?.content?.text ||
                  "We are a leading HR and business consulting firm dedicated to empowering African organizations through customized, client-centric, and impact-driven human resource solutions."}
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  {aboutContent.story?.title?.content?.text || "Our Story"}
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {aboutContent.story?.content1?.content?.text ||
                      "Founded in 2010, ESHRM emerged from a vision to revolutionize how African businesses approach human resource management. We recognized that the unique challenges and opportunities of the African market required HR solutions tailored to local contexts while meeting global standards."}
                  </p>
                  <p>
                    {aboutContent.story?.content2?.content?.text ||
                      "Over the years, we've grown from a small consultancy to a trusted partner for over 500 organizations across 20+ African countries. Our success is built on deep expertise, unwavering commitment to our clients, and a genuine passion for developing Africa's workforce."}
                  </p>
                  <p>
                    {aboutContent.story?.content3?.content?.text ||
                      "Today, ESHRM stands as a beacon of HR excellence in Africa, helping organizations build high-performing teams, develop future leaders, and create workplaces where both people and businesses thrive."}
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src={aboutContent.story?.story_image?.content?.src || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"}
                  alt={aboutContent.story?.story_image?.content?.alt || "ESHRM Team Collaboration"}
                  className="rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 rounded-xl bg-primary p-6 text-primary-foreground shadow-lg">
                  <div className="text-3xl font-bold">{aboutContent.story?.impact_years?.content?.value || "15+"}</div>
                  <div className="text-sm">{aboutContent.story?.impact_years?.content?.label || "Years of Impact"}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision Section */}
        <section className="py-20 lg:py-28 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Target className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">
                    {aboutContent.mission_vision?.mission_title?.content?.text || "Our Mission"}
                  </h3>
                  <p className="text-muted-foreground">
                    {aboutContent.mission_vision?.mission_content?.content?.text ||
                      "To transform human resource management for African businesses through customized, client-centric, and impact-driven solutions that empower organizations to build high-performing teams and achieve sustainable growth."}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Eye className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">
                    {aboutContent.mission_vision?.vision_title?.content?.text || "Our Vision"}
                  </h3>
                  <p className="text-muted-foreground">
                    {aboutContent.mission_vision?.vision_content?.content?.text ||
                      "To be Africa's most trusted HR consulting partner, recognized for driving organizational excellence and building workplaces where people and businesses flourish together across the continent."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {aboutContent.values?.title?.content?.text || "Our Core Values"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {aboutContent.values?.subtitle?.content?.text ||
                  "These principles guide every engagement and shape who we are as an organization."}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {displayValues.map((value) => {
                const IconComponent = iconMap[value.icon] || Award
                return (
                  <Card key={value.title} className="text-center">
                    <CardContent className="p-6">
                      <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {displayStats.map((stat, index) => (
                <div key={stat.label || index} className="text-center">
                  <div className="text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Africa Focus Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1">
                <img
                  src={aboutContent.africa_focus?.image?.content?.src || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"}
                  alt={aboutContent.africa_focus?.image?.content?.alt || "ESHRM Africa Coverage"}
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                  <Globe className="h-4 w-4" />
                  {aboutContent.africa_focus?.badge?.content?.text || "Africa Focus"}
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  {aboutContent.africa_focus?.title?.content?.text || "Deep Roots Across the Continent"}
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {aboutContent.africa_focus?.description1?.content?.text ||
                      "Our African heritage gives us unique insight into the opportunities and challenges facing businesses on the continent. We understand the diverse regulatory landscapes, cultural nuances, and market dynamics that shape HR practices across different regions."}
                  </p>
                  <p>
                    {aboutContent.africa_focus?.description2?.content?.text ||
                      "From Harare to Nairobi, Johannesburg to Accra, we've helped organizations navigate complex HR challenges while building workforces ready for the future. Our pan-African network ensures we can support your business wherever you operate."}
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted p-4">
                    <div className="text-2xl font-bold text-primary">
                      {aboutContent.africa_focus?.countries_stat?.content?.value || "20+"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {aboutContent.africa_focus?.countries_stat?.content?.label || "Countries Served"}
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <div className="text-2xl font-bold text-primary">
                      {aboutContent.africa_focus?.sectors_stat?.content?.value || "50+"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {aboutContent.africa_focus?.sectors_stat?.content?.label || "Industry Sectors"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 lg:py-28 bg-muted">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {aboutContent.team?.title?.content?.text || "Our Leadership Team"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {aboutContent.team?.subtitle?.content?.text || "Meet the experts driving HR transformation across Africa."}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayTeam.map((member) => (
                <Card key={member.name} className="overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <div className="text-primary font-medium mb-3">{member.role}</div>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-2xl bg-primary p-8 text-center text-primary-foreground lg:p-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {aboutContent.cta?.title?.content?.text || "Ready to Partner with Us?"}
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
                {aboutContent.cta?.subtitle?.content?.text ||
                  "Discover how ESHRM can help transform your organization's HR function and drive sustainable success."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  variant={aboutContent.cta?.primary_cta?.content?.variant === 'outline' ? 'outline' : 'secondary'}
                  className="gap-2"
                >
                  <Link href={aboutContent.cta?.primary_cta?.content?.link || "/book-consultation"}>
                    {aboutContent.cta?.primary_cta?.content?.text || "Book a Consultation"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant={aboutContent.cta?.secondary_cta?.content?.variant || "outline"}
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link href={aboutContent.cta?.secondary_cta?.content?.link || "/contact"}>
                    {aboutContent.cta?.secondary_cta?.content?.text || "Contact Us"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
