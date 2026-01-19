import { query, queryOne } from "@/lib/db"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"
import type { AdminUser, AdminSession } from "@/lib/types"

export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  return queryOne<AdminUser>("SELECT * FROM admin_users WHERE email = ?", [email])
}

export async function getAdminUserById(id: number): Promise<AdminUser | null> {
  return queryOne<AdminUser>("SELECT * FROM admin_users WHERE id = ?", [id])
}

export async function verifyAdminPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export async function hashAdminPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function createAdminSession(userId: number): Promise<AdminSession> {
  const sessionId = uuidv4()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await query("INSERT INTO admin_sessions (id, user_id, expires_at) VALUES (?, ?, ?)", [
    sessionId,
    userId,
    expiresAt,
  ])

  // Update last login
  await query("UPDATE admin_users SET last_login = NOW() WHERE id = ?", [userId])

  return {
    id: sessionId,
    user_id: userId,
    expires_at: expiresAt,
    created_at: new Date(),
  }
}

export async function getAdminSession(sessionId: string): Promise<AdminSession | null> {
  const session = await queryOne<AdminSession>(
    "SELECT * FROM admin_sessions WHERE id = ? AND expires_at > NOW()",
    [sessionId]
  )
  return session
}

export async function deleteAdminSession(sessionId: string): Promise<void> {
  await query("DELETE FROM admin_sessions WHERE id = ?", [sessionId])
}

export async function cleanExpiredAdminSessions(): Promise<void> {
  await query("DELETE FROM admin_sessions WHERE expires_at <= NOW()")
}

export async function createAdminUser(
  email: string,
  password: string,
  name: string,
  role: "admin" | "editor" = "admin",
): Promise<AdminUser> {
  const hashedPassword = await hashAdminPassword(password)
  const result = await query<any>("INSERT INTO admin_users (email, password_hash, name, role) VALUES (?, ?, ?, ?)", [
    email,
    hashedPassword,
    name,
    role,
  ])
  const user = await getAdminUserById(result.insertId)
  return user!
}

export async function updateAdminPassword(userId: number, newPassword: string): Promise<void> {
  const hashedPassword = await hashAdminPassword(newPassword)
  await query("UPDATE admin_users SET password_hash = ? WHERE id = ?", [hashedPassword, userId])
}
