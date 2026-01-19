import { query, queryOne } from "@/lib/db"
import type { Lead } from "@/lib/types"

export async function getAllLeads(): Promise<Lead[]> {
  return query<Lead[]>("SELECT * FROM leads ORDER BY created_at DESC")
}

export async function getLeadById(id: number): Promise<Lead | null> {
  return queryOne<Lead>("SELECT * FROM leads WHERE id = ?", [id])
}

export async function getLeadsByStatus(status: Lead["status"]): Promise<Lead[]> {
  return query<Lead[]>("SELECT * FROM leads WHERE status = ? ORDER BY created_at DESC", [status])
}

export async function createLead(data: Omit<Lead, "id" | "created_at" | "updated_at" | "status">): Promise<Lead> {
  const result = await query<any>(
    `INSERT INTO leads (name, email, company, message, service_interest, status)
     VALUES (?, ?, ?, ?, ?, 'new')`,
    [data.name, data.email, data.company, data.message, data.service_interest],
  )
  const lead = await getLeadById(result.insertId)
  return lead!
}

export async function updateLeadStatus(id: number, status: Lead["status"]): Promise<Lead | null> {
  await query("UPDATE leads SET status = ? WHERE id = ?", [status, id])
  return getLeadById(id)
}

export async function deleteLead(id: number): Promise<boolean> {
  const result = await query<any>("DELETE FROM leads WHERE id = ?", [id])
  return result.affectedRows > 0
}

export async function getLeadStats(): Promise<{ new: number; contacted: number; converted: number; total: number }> {
  const results = await query<Array<{ status: string; count: number }>>(
    "SELECT status, COUNT(*) as count FROM leads GROUP BY status",
  )
  const stats = { new: 0, contacted: 0, converted: 0, total: 0 }
  results.forEach((row) => {
    stats[row.status as keyof typeof stats] = row.count
    stats.total += row.count
  })
  return stats
}
