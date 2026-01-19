import { type NextRequest, NextResponse } from "next/server"
import { getMediaAsset, updateMediaAsset, deleteMediaAsset } from "@/lib/services/content.service"

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 })
    }

    const asset = await getMediaAsset(id)
    if (!asset) {
      return NextResponse.json({ success: false, error: "Media asset not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: asset })
  } catch (error) {
    console.error("Error fetching media asset:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch media asset" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 })
    }

    const body = await request.json()
    const asset = await updateMediaAsset(id, body)

    if (!asset) {
      return NextResponse.json({ success: false, error: "Media asset not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: asset })
  } catch (error) {
    console.error("Error updating media asset:", error)
    return NextResponse.json({ success: false, error: "Failed to update media asset" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 })
    }

    const success = await deleteMediaAsset(id)
    if (!success) {
      return NextResponse.json({ success: false, error: "Media asset not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Media asset deleted" })
  } catch (error) {
    console.error("Error deleting media asset:", error)
    return NextResponse.json({ success: false, error: "Failed to delete media asset" }, { status: 500 })
  }
}
