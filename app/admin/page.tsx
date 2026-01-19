"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Lead, Booking } from "@/lib/types"
import { Users, CalendarCheck, FileText, FolderOpen, TrendingUp, Eye, Loader2 } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    leads: 0,
    bookings: 0,
    posts: 0,
    caseStudies: 0,
  })
  const [recentLeads, setRecentLeads] = useState<Lead[]>([])
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        // First check if user is authenticated
        const sessionRes = await fetch('/api/admin/session')
        const sessionData = await sessionRes.json()

        if (!sessionData.success) {
          // Not authenticated, redirect to login
          router.push('/admin/login')
          return
        }

        setIsAuthenticated(true)

        // Fetch dashboard data
        const [leadsRes, bookingsRes, postsRes, casesRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/bookings'),
          fetch('/api/blog'),
          fetch('/api/case-studies'),
        ])

        const leads = leadsRes.ok ? await leadsRes.json() : { data: [] }
        const bookings = bookingsRes.ok ? await bookingsRes.json() : { data: [] }
        const posts = postsRes.ok ? await postsRes.json() : { data: [] }
        const cases = casesRes.ok ? await casesRes.json() : { data: [] }

        setStats({
          leads: leads.data?.length || 0,
          bookings: bookings.data?.length || 0,
          posts: posts.data?.filter((p: any) => p.published).length || 0,
          caseStudies: cases.data?.filter((c: any) => c.published).length || 0,
        })

        setRecentLeads((leads.data || []).slice(-5).reverse())
        setRecentBookings((bookings.data || []).slice(-5).reverse())
      } catch (error) {
        console.error('Error loading dashboard:', error)
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndFetchData()
  }, [router])

  const statCards = [
    { title: "Total Leads", value: stats.leads, icon: Users, href: "/admin/leads", color: "text-blue-500" },
    {
      title: "Bookings",
      value: stats.bookings,
      icon: CalendarCheck,
      href: "/admin/bookings",
      color: "text-green-500",
    },
    { title: "Blog Posts", value: stats.posts, icon: FileText, href: "/admin/blog", color: "text-purple-500" },
    {
      title: "Case Studies",
      value: stats.caseStudies,
      icon: FolderOpen,
      href: "/admin/case-studies",
      color: "text-orange-500",
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the ESHRM admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <Link
                href={stat.href}
                className="text-sm text-muted-foreground hover:text-primary flex items-center mt-2"
              >
                View details →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Leads</CardTitle>
            <CardDescription>Latest contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <p className="text-sm text-muted-foreground">No leads yet</p>
            ) : (
              <div className="space-y-3">
                {recentLeads.slice(0, 3).map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                    </div>
                    <Badge
                      variant={
                        lead.status === "new" ? "default" : lead.status === "contacted" ? "secondary" : "outline"
                      }
                    >
                      {lead.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Bookings</CardTitle>
            <CardDescription>Latest consultation requests</CardDescription>
          </CardHeader>
          <CardContent>
            {recentBookings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No bookings yet</p>
            ) : (
              <div className="space-y-3">
                {recentBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{booking.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.booking_date).toLocaleDateString()} at {booking.booking_time}
                      </p>
                    </div>
                    <Badge
                      variant={
                        booking.status === "pending"
                          ? "default"
                          : booking.status === "confirmed"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current system metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">Active</p>
                <p className="text-sm text-muted-foreground">System Status</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.leads}</p>
                <p className="text-sm text-muted-foreground">Total Leads</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.bookings}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
