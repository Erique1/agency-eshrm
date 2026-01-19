import { type NextRequest, NextResponse } from "next/server"
import { getAllSettings, updateSettings } from "@/lib/services/settings.service"

export async function GET() {
  try {
    const settings = await getAllSettings()
    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    await updateSettings(body)
    const settings = await getAllSettings()
    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 })
  }
}
