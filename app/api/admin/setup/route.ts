import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import fs from "fs"
import path from "path"
import bcrypt from "bcryptjs"

// Check if setup is already completed
async function isSetupCompleted(): Promise<boolean> {
  try {
    // Check if admin users table exists and has users
    const result = await query("SELECT COUNT(*) as count FROM admin_users")
    return (result as any)[0].count > 0
  } catch (error) {
    // If table doesn't exist, setup is not completed
    return false
  }
}

// Test database connection
async function testDatabaseConnection(): Promise<{ success: boolean; error?: string }> {
  try {
    await query("SELECT 1")
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Database connection failed"
    }
  }
}

// Execute SQL script
async function executeSqlScript(filePath: string): Promise<{ success: boolean; error?: string }> {
  try {
    const sql = fs.readFileSync(filePath, "utf8")
    const statements = sql.split(";").filter(stmt => stmt.trim().length > 0)

    for (const statement of statements) {
      if (statement.trim()) {
        await query(statement.trim())
      }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "SQL execution failed"
    }
  }
}

// Run database setup
async function runDatabaseSetup(): Promise<{ success: boolean; error?: string; steps: any[] }> {
  const steps = []
  const scriptsDir = path.join(process.cwd(), "scripts")

  // Define scripts in order
  const scripts = [
    { name: "Create Database", file: "001-create-database.sql" },
    { name: "Seed Data", file: "002-seed-data.sql" },
    { name: "Create Admin Schema", file: "003-create-admin-schema.sql" },
    { name: "Content Management Schema", file: "004-content-management-schema.sql" }
  ]

  for (const script of scripts) {
    const filePath = path.join(scriptsDir, script.file)

    if (!fs.existsSync(filePath)) {
      steps.push({ name: script.name, status: "error", error: "Script file not found" })
      continue
    }

    const result = await executeSqlScript(filePath)
    steps.push({
      name: script.name,
      status: result.success ? "completed" : "error",
      error: result.error
    })

    if (!result.success) {
      break
    }
  }

  const allSuccessful = steps.every(step => step.status === "completed")

  return {
    success: allSuccessful,
    error: allSuccessful ? undefined : "One or more setup steps failed",
    steps
  }
}

// Create initial admin user
async function createAdminUser(adminData: { email: string; password: string }): Promise<{ success: boolean; error?: string }> {
  try {
    const hashedPassword = await bcrypt.hash(adminData.password, 12)

    await query(
      "INSERT INTO admin_users (email, password, role, status) VALUES (?, ?, ?, ?)",
      [adminData.email, hashedPassword, "super_admin", "active"]
    )

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create admin user"
    }
  }
}

// Mark setup as completed
async function markSetupCompleted(): Promise<{ success: boolean; error?: string }> {
  try {
    // Create a simple flag in the database
    await query("CREATE TABLE IF NOT EXISTS setup_status (completed BOOLEAN DEFAULT TRUE, completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
    await query("INSERT INTO setup_status (completed) VALUES (?)", [true])
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to mark setup as completed"
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const setupCompleted = await isSetupCompleted()

    if (setupCompleted) {
      return NextResponse.json({
        setupCompleted: true,
        message: "Setup has already been completed"
      })
    }

    const dbTest = await testDatabaseConnection()

    return NextResponse.json({
      setupCompleted: false,
      databaseConnected: dbTest.success,
      databaseError: dbTest.error
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Setup check failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const setupCompleted = await isSetupCompleted()

    if (setupCompleted) {
      return NextResponse.json(
        { error: "Setup has already been completed" },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { action, adminData } = body

    switch (action) {
      case "test_database":
        const dbTest = await testDatabaseConnection()
        return NextResponse.json(dbTest)

      case "setup_database":
        const setupResult = await runDatabaseSetup()
        return NextResponse.json(setupResult)

      case "create_admin":
        if (!adminData?.email || !adminData?.password) {
          return NextResponse.json(
            { success: false, error: "Admin email and password are required" },
            { status: 400 }
          )
        }
        const adminResult = await createAdminUser(adminData)
        return NextResponse.json(adminResult)

      case "complete_setup":
        const completionResult = await markSetupCompleted()
        return NextResponse.json(completionResult)

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        )
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Setup operation failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
