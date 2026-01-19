import { NextResponse } from "next/server"
import { getLeadStats } from "@/lib/services/leads.service"
import { getBookingStats } from "@/lib/services/bookings.service"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const [leadStats, bookingStats, blogCount, testimonialCount] = await Promise.all([
      getLeadStats(),
      getBookingStats(),
      query<Array<{ count: number }>>("SELECT COUNT(*) as count FROM blog_posts WHERE published = 1"),
      query<Array<{ count: number }>>("SELECT COUNT(*) as count FROM testimonials WHERE published = 1"),
    ])

    return NextResponse.json({
      success: true,
      data: {
        leads: leadStats,
        bookings: bookingStats,
        blogPosts: blogCount[0]?.count || 0,
        testimonials: testimonialCount[0]?.count || 0,
      },
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 })
  }
}
