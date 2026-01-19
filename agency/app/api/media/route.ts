import { type NextRequest, NextResponse } from "next/server"
import { getMediaAssets, saveUploadedFile } from "@/lib/services/content.service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined
    const offset = searchParams.get("offset") ? parseInt(searchParams.get("offset")!) : undefined

    const assets = await getMediaAssets(limit, offset)
    return NextResponse.json({ success: true, data: assets })
  } catch (error) {
    console.error("Error fetching media assets:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch media assets" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const uploadedBy = parseInt(formData.get("uploadedBy") as string) || 1 // Default to admin user

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: "Invalid file type. Only images are allowed." }, { status: 400 })
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ success: false, error: "File too large. Maximum size is 5MB." }, { status: 400 })
    }

    const asset = await saveUploadedFile(file, uploadedBy)

    return NextResponse.json({ success: true, data: asset }, { status: 201 })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ success: false, error: "Failed to upload file" }, { status: 500 })
  }
}
