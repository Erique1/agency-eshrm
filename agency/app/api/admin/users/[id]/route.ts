import { type NextRequest, NextResponse } from "next/server"
import { query, queryOne } from "@/lib/db"
import type { AdminUser } from "@/lib/types"

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

    const user = await queryOne<AdminUser>(
      "SELECT id, email, name, role, last_login, created_at, updated_at FROM admin_users WHERE id = ?",
      [id]
    )

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch user" }, { status: 500 })
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
    const { name, role } = body

    // Check if user exists
    const existingUser = await queryOne<AdminUser>("SELECT id FROM admin_users WHERE id = ?", [id])
    if (!existingUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // Update user (excluding password and email for security)
    const updateFields: string[] = []
    const values: any[] = []

    if (name !== undefined) {
      updateFields.push("name = ?")
      values.push(name)
    }
    if (role !== undefined) {
      updateFields.push("role = ?")
      values.push(role)
    }

    if (updateFields.length > 0) {
      values.push(id)
      await query(`UPDATE admin_users SET ${updateFields.join(", ")} WHERE id = ?`, values)
    }

    const user = await queryOne<AdminUser>(
      "SELECT id, email, name, role, last_login, created_at, updated_at FROM admin_users WHERE id = ?",
      [id]
    )

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 })
    }

    // Check if user exists
    const user = await queryOne<AdminUser>("SELECT id, role FROM admin_users WHERE id = ?", [id])
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // Prevent deleting the last admin
    if (user.role === 'admin') {
      const adminCountResult = await query<any>(
        "SELECT COUNT(*) as count FROM admin_users WHERE role = 'admin'",
        []
      )
      const adminCount = adminCountResult[0]?.count || 0
      if (adminCount <= 1) {
        return NextResponse.json({
          success: false,
          error: "Cannot delete the last administrator account"
        }, { status: 400 })
      }
    }

    // Delete user
    const result = await query<any>("DELETE FROM admin_users WHERE id = ?", [id])
    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "User deleted successfully" })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 })
  }
}
