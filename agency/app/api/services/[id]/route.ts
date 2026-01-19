import { type NextRequest, NextResponse } from "next/server"
import { getServiceById, updateService, deleteService } from "@/lib/services/services.service"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const service = await getServiceById(Number.parseInt(id))

    if (!service) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: service })
  } catch (error) {
    console.error("Error fetching service:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch service" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const service = await updateService(Number.parseInt(id), body)

    if (!service) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: service })
  } catch (error) {
    console.error("Error updating service:", error)
    return NextResponse.json({ success: false, error: "Failed to update service" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const deleted = await deleteService(Number.parseInt(id))

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Service deleted" })
  } catch (error) {
    console.error("Error deleting service:", error)
    return NextResponse.json({ success: false, error: "Failed to delete service" }, { status: 500 })
  }
}
