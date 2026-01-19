import { type NextRequest, NextResponse } from "next/server"
import { getAllBlogPosts, getPublishedBlogPosts, createBlogPost } from "@/lib/services/blog.service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeUnpublished = searchParams.get("all") === "true"

    const posts = includeUnpublished ? await getAllBlogPosts() : await getPublishedBlogPosts()

    return NextResponse.json({ success: true, data: posts })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const post = await createBlogPost(body)
    return NextResponse.json({ success: true, data: post }, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ success: false, error: "Failed to create blog post" }, { status: 500 })
  }
}
