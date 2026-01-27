import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { query } from "@/lib/db"

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

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check setup status for admin routes
  const setupCompleted = await isSetupCompleted()

  // Setup page handling
  if (pathname === '/admin/setup' || pathname === '/admin/setup/') {
    if (setupCompleted) {
      // If setup is completed, redirect to admin dashboard
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    // Allow access to setup page if setup is not completed
    return NextResponse.next()
  }

  // If setup is not completed, redirect all admin routes to setup page
  if (!setupCompleted && pathname.startsWith('/admin/') && !pathname.startsWith('/admin/setup')) {
    return NextResponse.redirect(new URL('/admin/setup', request.url))
  }

  // Only run middleware on specific admin page routes when setup is completed
  const adminRoutes = [
    '/admin',
    '/admin/login',
    '/admin/dashboard',
    '/admin/leads',
    '/admin/bookings',
    '/admin/blog',
    '/admin/case-studies',
    '/admin/testimonials',
    '/admin/settings',
    '/admin/users',
    '/admin/media',
    '/admin/pages',
    '/admin/services',
  ]

  if (adminRoutes.includes(pathname) || adminRoutes.includes(pathname.replace(/\/$/, ''))) {
    // Always allow access to login page
    if (pathname === '/admin/login' || pathname === '/admin/login/') {
      return NextResponse.next()
    }

    // For other admin routes, check for session cookie
    const adminSession = request.cookies.get('admin_session')?.value
    if (!adminSession || adminSession.trim() === '') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Allow access to other admin routes if session cookie exists
    // Session validation will happen at the page/API level
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/((?!api/).)*',
  ],
}
