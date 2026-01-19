import { query, queryOne } from "@/lib/db"
import type { BlogPost } from "@/lib/types"

interface BlogPostRow {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  category: string | null
  tags: string
  author: string
  image: string | null
  published_at: Date | null
  meta_title: string | null
  meta_description: string | null
  published: number
  created_at: Date
  updated_at: Date
}

function parseBlogPost(row: BlogPostRow): BlogPost {
  return {
    ...row,
    tags: JSON.parse(row.tags || "[]"),
    published: Boolean(row.published),
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const rows = await query<BlogPostRow[]>("SELECT * FROM blog_posts ORDER BY published_at DESC")
  return rows.map(parseBlogPost)
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const rows = await query<BlogPostRow[]>("SELECT * FROM blog_posts WHERE published = 1 ORDER BY published_at DESC")
  return rows.map(parseBlogPost)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const row = await queryOne<BlogPostRow>("SELECT * FROM blog_posts WHERE slug = ?", [slug])
  return row ? parseBlogPost(row) : null
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  const row = await queryOne<BlogPostRow>("SELECT * FROM blog_posts WHERE id = ?", [id])
  return row ? parseBlogPost(row) : null
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const rows = await query<BlogPostRow[]>(
    "SELECT * FROM blog_posts WHERE category = ? AND published = 1 ORDER BY published_at DESC",
    [category],
  )
  return rows.map(parseBlogPost)
}

export async function createBlogPost(data: Omit<BlogPost, "id" | "created_at" | "updated_at">): Promise<BlogPost> {
  const result = await query<any>(
    `INSERT INTO blog_posts (title, slug, excerpt, content, category, tags, author, image, published_at, meta_title, meta_description, published)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.slug,
      data.excerpt,
      data.content,
      data.category,
      JSON.stringify(data.tags),
      data.author,
      data.image,
      data.published_at,
      data.meta_title,
      data.meta_description,
      data.published ? 1 : 0,
    ],
  )
  const post = await getBlogPostById(result.insertId)
  return post!
}

export async function updateBlogPost(
  id: number,
  data: Partial<Omit<BlogPost, "id" | "created_at" | "updated_at">>,
): Promise<BlogPost | null> {
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
  if (data.excerpt !== undefined) {
    updates.push("excerpt = ?")
    values.push(data.excerpt)
  }
  if (data.content !== undefined) {
    updates.push("content = ?")
    values.push(data.content)
  }
  if (data.category !== undefined) {
    updates.push("category = ?")
    values.push(data.category)
  }
  if (data.tags !== undefined) {
    updates.push("tags = ?")
    values.push(JSON.stringify(data.tags))
  }
  if (data.author !== undefined) {
    updates.push("author = ?")
    values.push(data.author)
  }
  if (data.image !== undefined) {
    updates.push("image = ?")
    values.push(data.image)
  }
  if (data.published_at !== undefined) {
    updates.push("published_at = ?")
    values.push(data.published_at)
  }
  if (data.meta_title !== undefined) {
    updates.push("meta_title = ?")
    values.push(data.meta_title)
  }
  if (data.meta_description !== undefined) {
    updates.push("meta_description = ?")
    values.push(data.meta_description)
  }
  if (data.published !== undefined) {
    updates.push("published = ?")
    values.push(data.published ? 1 : 0)
  }

  if (updates.length === 0) return getBlogPostById(id)

  values.push(id)
  await query(`UPDATE blog_posts SET ${updates.join(", ")} WHERE id = ?`, values)
  return getBlogPostById(id)
}

export async function deleteBlogPost(id: number): Promise<boolean> {
  const result = await query<any>("DELETE FROM blog_posts WHERE id = ?", [id])
  return result.affectedRows > 0
}
