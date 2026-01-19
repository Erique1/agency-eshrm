import { type NextRequest, NextResponse } from "next/server"
import { getAllTestimonials, getPublishedTestimonials, createTestimonial } from "@/lib/services/testimonials.service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeUnpublished = searchParams.get("all") === "true"

    const testimonials = includeUnpublished ? await getAllTestimonials() : await getPublishedTestimonials()

    return NextResponse.json({ success: true, data: testimonials })
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const testimonial = await createTestimonial(body)
    return NextResponse.json({ success: true, data: testimonial }, { status: 201 })
  } catch (error) {
    console.error("Error creating testimonial:", error)
    return NextResponse.json({ success: false, error: "Failed to create testimonial" }, { status: 500 })
  }
}
