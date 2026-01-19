import { type NextRequest, NextResponse } from "next/server"
import { getBookingById, updateBookingStatus, deleteBooking } from "@/lib/services/bookings.service"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const booking = await getBookingById(Number.parseInt(id))

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: booking })
  } catch (error) {
    console.error("Error fetching booking:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch booking" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const booking = await updateBookingStatus(Number.parseInt(id), body.status)

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: booking })
  } catch (error) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ success: false, error: "Failed to update booking" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const deleted = await deleteBooking(Number.parseInt(id))

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Booking deleted" })
  } catch (error) {
    console.error("Error deleting booking:", error)
    return NextResponse.json({ success: false, error: "Failed to delete booking" }, { status: 500 })
  }
}
