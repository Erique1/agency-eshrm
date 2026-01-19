import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { query, queryOne } from "@/lib/db"
import type { AdminUser } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const users = await query<AdminUser[]>(
      "SELECT id, email, name, role, last_login, created_at, updated_at FROM admin_users ORDER BY created_at DESC"
    )
    return NextResponse.json({ success: true, data: users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, role } = body

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await queryOne<AdminUser>("SELECT id FROM admin_users WHERE email = ?", [email])
    if (existingUser) {
      return NextResponse.json({ success: false, error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user
    const result = await query<any>(
      "INSERT INTO admin_users (email, password_hash, name, role) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, name || null, role || 'editor']
    )

    const user = await queryOne<AdminUser>(
      "SELECT id, email, name, role, last_login, created_at, updated_at FROM admin_users WHERE id = ?",
      [result.insertId]
    )

    return NextResponse.json({ success: true, data: user }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 })
  }
}
