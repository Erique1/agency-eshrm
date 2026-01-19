import { NextResponse } from "next/server"
import { deleteAdminSession } from "@/lib/services/admin-auth.service"
import { cookies } from "next/headers"

export async function POST() {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("admin_session")?.value

    if (sessionId) {
      // Delete session from database
      await deleteAdminSession(sessionId)
    }

    // Clear session cookie
    cookieStore.delete("admin_session")

    return NextResponse.json({
      success: true,
      message: "Logged out successfully"
    })
  } catch (error) {
    console.error("Admin logout error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to logout" },
      { status: 500 }
    )
  }
}
