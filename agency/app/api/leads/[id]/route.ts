import { type NextRequest, NextResponse } from "next/server"
import { getLeadById, updateLeadStatus, deleteLead } from "@/lib/services/leads.service"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const lead = await getLeadById(Number.parseInt(id))

    if (!lead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: lead })
  } catch (error) {
    console.error("Error fetching lead:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch lead" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const lead = await updateLeadStatus(Number.parseInt(id), body.status)

    if (!lead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: lead })
  } catch (error) {
    console.error("Error updating lead:", error)
    return NextResponse.json({ success: false, error: "Failed to update lead" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const deleted = await deleteLead(Number.parseInt(id))

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Lead deleted" })
  } catch (error) {
    console.error("Error deleting lead:", error)
    return NextResponse.json({ success: false, error: "Failed to delete lead" }, { status: 500 })
  }
}
