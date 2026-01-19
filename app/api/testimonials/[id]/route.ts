import { type NextRequest, NextResponse } from "next/server"
import { getTestimonialById, updateTestimonial, deleteTestimonial } from "@/lib/services/testimonials.service"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const testimonial = await getTestimonialById(Number.parseInt(id))

    if (!testimonial) {
      return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: testimonial })
  } catch (error) {
    console.error("Error fetching testimonial:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch testimonial" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const testimonial = await updateTestimonial(Number.parseInt(id), body)

    if (!testimonial) {
      return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: testimonial })
  } catch (error) {
    console.error("Error updating testimonial:", error)
    return NextResponse.json({ success: false, error: "Failed to update testimonial" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const deleted = await deleteTestimonial(Number.parseInt(id))

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Testimonial deleted" })
  } catch (error) {
    console.error("Error deleting testimonial:", error)
    return NextResponse.json({ success: false, error: "Failed to delete testimonial" }, { status: 500 })
  }
}
