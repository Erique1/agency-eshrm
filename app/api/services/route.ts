import { type NextRequest, NextResponse } from "next/server"
import { getAllServices, getPublishedServices, createService } from "@/lib/services/services.service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeUnpublished = searchParams.get("all") === "true"

    const services = includeUnpublished ? await getAllServices() : await getPublishedServices()

    return NextResponse.json({ success: true, data: services })
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const service = await createService(body)
    return NextResponse.json({ success: true, data: service }, { status: 201 })
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json({ success: false, error: "Failed to create service" }, { status: 500 })
  }
}
