import { queryOne } from "@/lib/db"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"
import type { User, Session } from "@/lib/types"

export async function getUserByEmail(email: string): Promise<User | null> {
  return queryOne<User>("SELECT * FROM users WHERE email = ?", [email])
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function createSession(userId: number): Promise<Session> {
  const sessionId = uuidv4()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await queryOne("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)", [
    sessionId,
    userId,
    expiresAt,
  ])

  // Update last login
  await queryOne("UPDATE users SET last_login = NOW() WHERE id = ?", [userId])

  return {
    id: sessionId,
    user_id: userId,
    expires_at: expiresAt,
    created_at: new Date(),
  }
}

export async function login(email: string, password: string): Promise<{ success: boolean; user?: any; session?: any; error?: string }> {
  try {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' }
    }

    const user = await getUserByEmail(email)

    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return { success: false, error: 'Invalid email or password' }
    }

    // Create session
    const session = await createSession(user.id)

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      session
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'An error occurred' }
  }
}
