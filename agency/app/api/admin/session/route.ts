import { NextResponse } from "next/server"
import { getAdminSession, getAdminUserById } from "@/lib/services/admin-auth.service"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("admin_session")?.value

    if (!sessionId) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 })
    }

    const session = await getAdminSession(sessionId)

    if (!session) {
      cookieStore.delete("admin_session")
      return NextResponse.json({ success: false, error: "Session expired" }, { status: 401 })
    }

    const user = await getAdminUserById(session.user_id)

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    })
  } catch (error) {
    console.error("Admin session check error:", error)
    return NextResponse.json({ success: false, error: "Failed to check session" }, { status: 500 })
  }
}
