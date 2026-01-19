import { query, queryOne } from "@/lib/db"
import type { CaseStudy } from "@/lib/types"

interface CaseStudyRow {
  id: number
  title: string
  slug: string
  client: string
  industry: string | null
  challenge: string | null
  solution: string | null
  results: string
  testimonial: string | null
  image: string | null
  published: number
  created_at: Date
  updated_at: Date
}

function parseCaseStudy(row: CaseStudyRow): CaseStudy {
  return {
    ...row,
    results: JSON.parse(row.results || "[]"),
    published: Boolean(row.published),
  }
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const rows = await query<CaseStudyRow[]>("SELECT * FROM case_studies ORDER BY created_at DESC")
  return rows.map(parseCaseStudy)
}

export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  const rows = await query<CaseStudyRow[]>("SELECT * FROM case_studies WHERE published = 1 ORDER BY created_at DESC")
  return rows.map(parseCaseStudy)
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const row = await queryOne<CaseStudyRow>("SELECT * FROM case_studies WHERE slug = ?", [slug])
  return row ? parseCaseStudy(row) : null
}

export async function getCaseStudyById(id: number): Promise<CaseStudy | null> {
  const row = await queryOne<CaseStudyRow>("SELECT * FROM case_studies WHERE id = ?", [id])
  return row ? parseCaseStudy(row) : null
}

export async function createCaseStudy(data: Omit<CaseStudy, "id" | "created_at" | "updated_at">): Promise<CaseStudy> {
  const result = await query<any>(
    `INSERT INTO case_studies (title, slug, client, industry, challenge, solution, results, testimonial, image, published)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.slug,
      data.client,
      data.industry,
      data.challenge,
      data.solution,
      JSON.stringify(data.results),
      data.testimonial,
      data.image,
      data.published ? 1 : 0,
    ],
  )
  const caseStudy = await getCaseStudyById(result.insertId)
  return caseStudy!
}

export async function updateCaseStudy(
  id: number,
  data: Partial<Omit<CaseStudy, "id" | "created_at" | "updated_at">>,
): Promise<CaseStudy | null> {
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
  if (data.client !== undefined) {
    updates.push("client = ?")
    values.push(data.client)
  }
  if (data.industry !== undefined) {
    updates.push("industry = ?")
    values.push(data.industry)
  }
  if (data.challenge !== undefined) {
    updates.push("challenge = ?")
    values.push(data.challenge)
  }
  if (data.solution !== undefined) {
    updates.push("solution = ?")
    values.push(data.solution)
  }
  if (data.results !== undefined) {
    updates.push("results = ?")
    values.push(JSON.stringify(data.results))
  }
  if (data.testimonial !== undefined) {
    updates.push("testimonial = ?")
    values.push(data.testimonial)
  }
  if (data.image !== undefined) {
    updates.push("image = ?")
    values.push(data.image)
  }
  if (data.published !== undefined) {
    updates.push("published = ?")
    values.push(data.published ? 1 : 0)
  }

  if (updates.length === 0) return getCaseStudyById(id)

  values.push(id)
  await query(`UPDATE case_studies SET ${updates.join(", ")} WHERE id = ?`, values)
  return getCaseStudyById(id)
}

export async function deleteCaseStudy(id: number): Promise<boolean> {
  const result = await query<any>("DELETE FROM case_studies WHERE id = ?", [id])
  return result.affectedRows > 0
}
