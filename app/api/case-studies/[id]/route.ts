import { type NextRequest, NextResponse } from "next/server"
import { getCaseStudyById, updateCaseStudy, deleteCaseStudy } from "@/lib/services/case-studies.service"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const caseStudy = await getCaseStudyById(Number.parseInt(id))

    if (!caseStudy) {
      return NextResponse.json({ success: false, error: "Case study not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: caseStudy })
  } catch (error) {
    console.error("Error fetching case study:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch case study" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const caseStudy = await updateCaseStudy(Number.parseInt(id), body)

    if (!caseStudy) {
      return NextResponse.json({ success: false, error: "Case study not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: caseStudy })
  } catch (error) {
    console.error("Error updating case study:", error)
    return NextResponse.json({ success: false, error: "Failed to update case study" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const deleted = await deleteCaseStudy(Number.parseInt(id))

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Case study not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Case study deleted" })
  } catch (error) {
    console.error("Error deleting case study:", error)
    return NextResponse.json({ success: false, error: "Failed to delete case study" }, { status: 500 })
  }
}
