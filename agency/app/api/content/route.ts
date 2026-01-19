import { type NextRequest, NextResponse } from "next/server"
import { getContentBlocks, createContentBlock, getPageContent } from "@/lib/services/content.service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get("page")
    const section = searchParams.get("section")

    if (page) {
      // Return grouped content for a page
      const content = await getPageContent(page)
      return NextResponse.json({ success: true, data: content })
    } else {
      // Return all content blocks with optional filtering
      const blocks = await getContentBlocks(page || undefined, section || undefined)
      return NextResponse.json({ success: true, data: blocks })
    }
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const block = await createContentBlock(body)
    return NextResponse.json({ success: true, data: block }, { status: 201 })
  } catch (error) {
    console.error("Error creating content block:", error)
    return NextResponse.json({ success: false, error: "Failed to create content block" }, { status: 500 })
  }
}
