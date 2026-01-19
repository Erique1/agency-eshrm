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
    id: "future-hr-africa-2025",
    title: "The Future of HR in Africa: Trends to Watch in 2025",
    excerpt:
      "Explore the key HR trends shaping the African business landscape and how organizations can prepare for the future of work.",
    content: "",
    category: "HR Trends",
    tags: ["HR Trends", "Africa", "Future of Work"],
    author: "Dr. Adaora Nwankwo",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    publishedAt: "January 10, 2025",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "compliance-first-hr-strategy",
    title: "Building a Compliance-First HR Strategy",
    excerpt: "Learn how to develop HR policies that ensure regulatory compliance while supporting business objectives.",
    content: "",
    category: "Compliance",
    tags: ["Compliance", "HR Policy", "Risk Management"],
    author: "Emmanuel Koffi",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    publishedAt: "January 5, 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "leadership-remote-hybrid-teams",
    title: "Effective Leadership in Remote and Hybrid Teams",
    excerpt:
      "Discover strategies for leading distributed teams effectively and maintaining engagement across locations.",
    content: "",
    category: "Leadership",
    tags: ["Leadership", "Remote Work", "Team Management"],
    author: "Zainab Ibrahim",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    publishedAt: "December 28, 2024",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "talent-retention-competitive-market",
    title: "Talent Retention Strategies in a Competitive Market",
    excerpt:
      "Discover proven approaches to keeping your top performers engaged and committed in today's competitive talent landscape.",
    content: "",
    category: "Talent Management",
    tags: ["Talent Retention", "Employee Engagement", "Compensation"],
    author: "Dr. Adaora Nwankwo",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    publishedAt: "December 20, 2024",
    readTime: "9 min read",
    featured: true,
  },
  {
    id: "performance-reviews-best-practices",
    title: "Modernizing Performance Reviews: Best Practices for 2025",
    excerpt:
      "Traditional annual reviews are outdated. Learn how to implement continuous performance management that drives results.",
    content: "",
    category: "HR Trends",
    tags: ["Performance Management", "Feedback", "Best Practices"],
    author: "Emmanuel Koffi",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    publishedAt: "December 15, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "workforce-planning-uncertainty",
    title: "Strategic Workforce Planning in Times of Uncertainty",
    excerpt: "Build a resilient workforce strategy that adapts to changing market conditions and business needs.",
    content: "",
    category: "Workforce Strategy",
    tags: ["Workforce Planning", "Strategy", "Resilience"],
    author: "Zainab Ibrahim",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    publishedAt: "December 10, 2024",
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
