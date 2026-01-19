"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminLoginPage = pathname === "/admin/login"

  return (
    <div className="min-h-screen bg-muted/30">
      {!isAdminLoginPage && <AdminSidebar />}
      <div className={!isAdminLoginPage ? "lg:pl-64" : ""}>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
