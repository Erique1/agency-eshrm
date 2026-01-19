import { type NextRequest, NextResponse } from "next/server"
import { getAllCaseStudies, getPublishedCaseStudies, createCaseStudy } from "@/lib/services/case-studies.service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeUnpublished = searchParams.get("all") === "true"

    const caseStudies = includeUnpublished ? await getAllCaseStudies() : await getPublishedCaseStudies()

    return NextResponse.json({ success: true, data: caseStudies })
  } catch (error) {
    console.error("Error fetching case studies:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch case studies" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const caseStudy = await createCaseStudy(body)
    return NextResponse.json({ success: true, data: caseStudy }, { status: 201 })
  } catch (error) {
    console.error("Error creating case study:", error)
    return NextResponse.json({ success: false, error: "Failed to create case study" }, { status: 500 })
  }
}
