import { query, queryOne } from "@/lib/db"
import type { Service } from "@/lib/types"

interface ServiceRow {
  id: number
  title: string
  slug: string
  description: string
  long_description: string | null
  icon: string
  features: string
  published: number
  created_at: Date
  updated_at: Date
}

function parseService(row: ServiceRow): Service {
  return {
    ...row,
    features: JSON.parse(row.features || "[]"),
    published: Boolean(row.published),
  }
}

export async function getAllServices(): Promise<Service[]> {
  const rows = await query<ServiceRow[]>("SELECT * FROM services ORDER BY id ASC")
  return rows.map(parseService)
}

export async function getPublishedServices(): Promise<Service[]> {
  const rows = await query<ServiceRow[]>("SELECT * FROM services WHERE published = 1 ORDER BY id ASC")
  return rows.map(parseService)
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const row = await queryOne<ServiceRow>("SELECT * FROM services WHERE slug = ?", [slug])
  return row ? parseService(row) : null
}

export async function getServiceById(id: number): Promise<Service | null> {
  const row = await queryOne<ServiceRow>("SELECT * FROM services WHERE id = ?", [id])
  return row ? parseService(row) : null
}

export async function createService(data: Omit<Service, "id" | "created_at" | "updated_at">): Promise<Service> {
  const result = await query<any>(
    `INSERT INTO services (title, slug, description, long_description, icon, features, published)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.slug,
      data.description,
      data.long_description,
      data.icon,
      JSON.stringify(data.features),
      data.published ? 1 : 0,
    ],
  )
  const service = await getServiceById(result.insertId)
  return service!
}

export async function updateService(
  id: number,
  data: Partial<Omit<Service, "id" | "created_at" | "updated_at">>,
): Promise<Service | null> {
  const updates: string[] = []
  const values: any[] = []

  if (data.title !== undefined) {
    updates.push("title = ?")
    values.push(data.title)
  }
  if (data.slug !== undefined) {
    updates.push("slug = ?")
    values.push(data.slug)
  }
  if (data.description !== undefined) {
    updates.push("description = ?")
    values.push(data.description)
  }
  if (data.long_description !== undefined) {
    updates.push("long_description = ?")
    values.push(data.long_description)
  }
  if (data.icon !== undefined) {
    updates.push("icon = ?")
    values.push(data.icon)
  }
  if (data.features !== undefined) {
    updates.push("features = ?")
    values.push(JSON.stringify(data.features))
  }
  if (data.published !== undefined) {
    updates.push("published = ?")
    values.push(data.published ? 1 : 0)
  }

  if (updates.length === 0) return getServiceById(id)

  values.push(id)
  await query(`UPDATE services SET ${updates.join(", ")} WHERE id = ?`, values)
  return getServiceById(id)
}

export async function deleteService(id: number): Promise<boolean> {
  const result = await query<any>("DELETE FROM services WHERE id = ?", [id])
  return result.affectedRows > 0
}
