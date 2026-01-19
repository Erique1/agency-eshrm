import { query, queryOne } from "@/lib/db"
import type { Testimonial } from "@/lib/types"

interface TestimonialRow {
  id: number
  name: string
  role: string | null
  company: string | null
  content: string
  image: string | null
  published: number
  created_at: Date
  updated_at: Date
}

function parseTestimonial(row: TestimonialRow): Testimonial {
  return {
    ...row,
    published: Boolean(row.published),
  }
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const rows = await query<TestimonialRow[]>("SELECT * FROM testimonials ORDER BY created_at DESC")
  return rows.map(parseTestimonial)
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const rows = await query<TestimonialRow[]>("SELECT * FROM testimonials WHERE published = 1 ORDER BY created_at DESC")
  return rows.map(parseTestimonial)
}

export async function getTestimonialById(id: number): Promise<Testimonial | null> {
  const row = await queryOne<TestimonialRow>("SELECT * FROM testimonials WHERE id = ?", [id])
  return row ? parseTestimonial(row) : null
}

export async function createTestimonial(
  data: Omit<Testimonial, "id" | "created_at" | "updated_at">,
): Promise<Testimonial> {
  const result = await query<any>(
    `INSERT INTO testimonials (name, role, company, content, image, published)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [data.name, data.role, data.company, data.content, data.image, data.published ? 1 : 0],
  )
  const testimonial = await getTestimonialById(result.insertId)
  return testimonial!
}

export async function updateTestimonial(
  id: number,
  data: Partial<Omit<Testimonial, "id" | "created_at" | "updated_at">>,
): Promise<Testimonial | null> {
  const updates: string[] = []
  const values: any[] = []

  if (data.name !== undefined) {
    updates.push("name = ?")
    values.push(data.name)
  }
  if (data.role !== undefined) {
    updates.push("role = ?")
    values.push(data.role)
  }
  if (data.company !== undefined) {
    updates.push("company = ?")
    values.push(data.company)
  }
  if (data.content !== undefined) {
    updates.push("content = ?")
    values.push(data.content)
  }
  if (data.image !== undefined) {
    updates.push("image = ?")
    values.push(data.image)
  }
  if (data.published !== undefined) {
    updates.push("published = ?")
    values.push(data.published ? 1 : 0)
  }

  if (updates.length === 0) return getTestimonialById(id)

  values.push(id)
  await query(`UPDATE testimonials SET ${updates.join(", ")} WHERE id = ?`, values)
  return getTestimonialById(id)
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  const result = await query<any>("DELETE FROM testimonials WHERE id = ?", [id])
  return result.affectedRows > 0
}
