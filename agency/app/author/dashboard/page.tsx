"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FileText, Plus, Edit, Eye, Calendar, Clock } from "lucide-react"
import { getUser } from "@/lib/client-auth"
import { useRouter } from "next/navigation"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: string
  featured: boolean
}

const mockPosts: BlogPost[] = [
  {
    id: "future-hr-africa-2025",
    title: "The Future of HR in Africa: Trends to Watch in 2025",
    excerpt: "Explore the key HR trends shaping the African business landscape...",
    category: "HR Trends",
    publishedAt: "January 10, 2025",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "compliance-first-hr-strategy",
    title: "Building a Compliance-First HR Strategy",
    excerpt: "Learn how to develop HR policies that ensure regulatory compliance...",
    category: "Compliance",
    publishedAt: "January 5, 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "leadership-remote-hybrid-teams",
    title: "Effective Leadership in Remote and Hybrid Teams",
    excerpt: "Discover strategies for leading distributed teams effectively...",
    category: "Leadership",
    publishedAt: "December 28, 2024",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "talent-retention-competitive-market",
    title: "Talent Retention Strategies in a Competitive Market",
    excerpt: "Discover proven approaches to keeping your top performers engaged...",
    category: "Talent Management",
    publishedAt: "December 20, 2024",
    readTime: "9 min read",
    featured: true,
  },
]

export default function AuthorDashboard() {
  const router = useRouter()
  const user = getUser()
  const [posts] = useState<BlogPost[]>(mockPosts)

  useEffect(() => {
    if (!user || user.role !== "author") {
      router.push("/author/login")
    }
  }, [user, router])

  if (!user || user.role !== "author") {
    return null
  }

  const featuredPosts = posts.filter(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-6">
        <div>
          <h1 className="text-lg font-semibold">Author Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, {user.name || user.email}!</p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/" target="_blank">
              View Site
            </Link>
          </Button>
          <Button variant="outline" onClick={async () => {
            try {
              await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              })
            } catch (error) {
              console.error("Logout error:", error)
            }
            localStorage.removeItem("eshrm_admin_user")
            router.push("/author/login")
          }}>
            Logout
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Featured Posts</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{featuredPosts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Published This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Read Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.5m</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your blog posts and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/author/posts/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Write New Post
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/insights">
                    <Eye className="mr-2 h-4 w-4" />
                    View Public Blog
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts */}
        <div className="grid gap-6">
          {/* Featured Posts */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Featured Posts</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge>{post.category}</Badge>
                          <span className="text-sm text-muted-foreground">{post.readTime}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-2">Featured</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/insights/${post.id}`}>
                            <Eye className="h-3 w-3" />
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/author/posts/${post.id}/edit`}>
                            <Edit className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Posts */}
          <div>
            <h2 className="text-xl font-semibold mb-4">All Posts</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle className="text-base mb-2">{post.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
                      <div className="flex gap-1">
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/insights/${post.id}`}>
                            <Eye className="h-3 w-3" />
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/author/posts/${post.id}/edit`}>
                            <Edit className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
