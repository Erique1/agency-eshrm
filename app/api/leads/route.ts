import { type NextRequest, NextResponse } from "next/server"
import { getAllLeads, createLead, getLeadStats } from "@/lib/services/leads.service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stats = searchParams.get("stats") === "true"

    if (stats) {
      const leadStats = await getLeadStats()
      return NextResponse.json({ success: true, data: leadStats })
    }

    const leads = await getAllLeads()
    return NextResponse.json({ success: true, data: leads })
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const lead = await createLead(body)
    return NextResponse.json({ success: true, data: lead }, { status: 201 })
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json({ success: false, error: "Failed to create lead" }, { status: 500 })
  }
}
