import { type NextRequest, NextResponse } from "next/server"
import { getContentBlockById, updateContentBlock, deleteContentBlock } from "@/lib/services/content.service"

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

    const block = await getContentBlockById(id)
    if (!block) {
      return NextResponse.json({ success: false, error: "Content block not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: block })
  } catch (error) {
    console.error("Error fetching content block:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch content block" }, { status: 500 })
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
    const block = await updateContentBlock(id, body)

    if (!block) {
      return NextResponse.json({ success: false, error: "Content block not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: block })
  } catch (error) {
    console.error("Error updating content block:", error)
    return NextResponse.json({ success: false, error: "Failed to update content block" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 })
    }

    const success = await deleteContentBlock(id)
    if (!success) {
      return NextResponse.json({ success: false, error: "Content block not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Content block deleted" })
  } catch (error) {
    console.error("Error deleting content block:", error)
    return NextResponse.json({ success: false, error: "Failed to delete content block" }, { status: 500 })
  }
}
