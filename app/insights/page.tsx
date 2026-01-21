"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowRight, Search, Calendar, User } from "lucide-react"

const categories = ["All", "HR Trends", "Compliance", "Leadership", "Talent Management", "Workforce Strategy"]

const blogPosts = [
  {
    id: "hr-zimbabwe-economic-challenges",
    title: "Navigating HR Challenges in Zimbabwe's Economic Environment",
    excerpt:
      "Explore how Zimbabwean businesses can maintain effective HR practices amidst currency fluctuations and economic uncertainties.",
    content: "",
    category: "HR Trends",
    tags: ["HR Trends", "Zimbabwe", "Economic Challenges"],
    author: "Eric",
    image: "/images/digital.jpg",
    publishedAt: "January 15, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "zimbabwe-labour-act-compliance",
    title: "Ensuring Compliance with Zimbabwe's Labour Act",
    excerpt: "A comprehensive guide to understanding and implementing the Labour Act requirements in your organization.",
    content: "",
    category: "Compliance",
    tags: ["Compliance", "Labour Act", "Zimbabwe Law"],
    author: "Kudzai",
    image: "/images/leadership.jpg",
    publishedAt: "January 10, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "building-resilient-teams-zimbabwe",
    title: "Building Resilient Leadership Teams in Zimbabwe",
    excerpt:
      "Strategies for developing strong leadership capabilities that can navigate Zimbabwe's unique business challenges.",
    content: "",
    category: "Leadership",
    tags: ["Leadership", "Resilience", "Zimbabwe"],
    author: "Eric",
    image: "/images/team.jpg",
    publishedAt: "January 5, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "talent-retention-zimbabwe-market",
    title: "Talent Retention in Zimbabwe's Competitive Job Market",
    excerpt:
      "Proven strategies to retain top talent in Harare and Bulawayo's competitive employment landscape.",
    content: "",
    category: "Talent Management",
    tags: ["Talent Retention", "Zimbabwe", "Harare"],
    author: "Kudzai",
    image: "/images/culture.jpg",
    publishedAt: "December 28, 2025",
    readTime: "9 min read",
    featured: true,
  },
  {
    id: "performance-management-zimbabwe-context",
    title: "Performance Management Adapted for Zimbabwe",
    excerpt:
      "How to implement effective performance management systems that align with Zimbabwean cultural values and business practices.",
    content: "",
    category: "HR Trends",
    tags: ["Performance Management", "Culture", "Zimbabwe"],
    author: "Eric",
    image: "/images/digital.jpg",
    publishedAt: "December 20, 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "workforce-planning-post-pandemic-zimbabwe",
    title: "Workforce Planning for Zimbabwe's Post-Pandemic Recovery",
    excerpt: "Strategic approaches to workforce planning that support Zimbabwe's economic recovery and growth objectives.",
    content: "",
    category: "Workforce Strategy",
    tags: ["Workforce Planning", "Economic Recovery", "Zimbabwe"],
    author: "Kudzai",
    image: "/images/afric.jpg",
    publishedAt: "December 15, 2025",
    readTime: "8 min read",
    featured: false,
  },
]



export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) =>
    selectedCategory === "All" || post.category === selectedCategory
  )

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

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
                Insights & Resources
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                HR Knowledge & <span className="text-primary">Insights</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Stay ahead with expert perspectives on HR trends, compliance, leadership, and workforce strategies
                across Africa.
              </p>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search articles..." className="pl-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <Badge>{post.category}</Badge>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      <Link href={`/insights/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.publishedAt}
                        </span>
                      </div>
                      <Link
                        href={`/insights/${post.id}`}
                        className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                      >
                        Read more <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      <Link href={`/insights/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span>{post.publishedAt}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to our newsletter and get the latest HR insights delivered directly to your inbox.
              </p>
              <form className="flex gap-3 max-w-md mx-auto">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
