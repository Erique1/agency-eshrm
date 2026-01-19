import { type NextRequest, NextResponse } from "next/server"
import { getAllBookings, createBooking, getBookingStats, getUpcomingBookings } from "@/lib/services/bookings.service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stats = searchParams.get("stats") === "true"
    const upcoming = searchParams.get("upcoming") === "true"

    if (stats) {
      const bookingStats = await getBookingStats()
      return NextResponse.json({ success: true, data: bookingStats })
    }

    if (upcoming) {
      const upcomingBookings = await getUpcomingBookings()
      return NextResponse.json({ success: true, data: upcomingBookings })
    }

    const bookings = await getAllBookings()
    return NextResponse.json({ success: true, data: bookings })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const booking = await createBooking(body)
    return NextResponse.json({ success: true, data: booking }, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ success: false, error: "Failed to create booking" }, { status: 500 })
  }
}
