import { query, queryOne } from "@/lib/db"
import type { ContentBlock, MediaAsset } from "@/lib/types"
import fs from "fs"
import path from "path"

// Content Blocks Management
export async function getContentBlocks(page?: string, section?: string): Promise<ContentBlock[]> {
  let sql = "SELECT * FROM content_blocks WHERE is_active = true"
  const params: any[] = []

  if (page) {
    sql += " AND page = ?"
    params.push(page)
  }

  if (section) {
    sql += " AND section = ?"
    params.push(section)
  }

  sql += " ORDER BY sort_order ASC"
  const blocks = await query<any[]>(sql, params)

  // Parse JSON content for each block
  return blocks.map(block => ({
    ...block,
    content: typeof block.content === 'string' ? JSON.parse(block.content) : block.content
  }))
}

export async function getContentBlock(page: string, section: string, blockKey: string): Promise<ContentBlock | null> {
  const block = await queryOne<any>(
    "SELECT * FROM content_blocks WHERE page = ? AND section = ? AND block_key = ? AND is_active = true",
    [page, section, blockKey]
  )

  if (!block) return null

  // Parse JSON content
  return {
    ...block,
    content: typeof block.content === 'string' ? JSON.parse(block.content) : block.content
  }
}

export async function getContentBlockById(id: number): Promise<ContentBlock | null> {
  const block = await queryOne<any>("SELECT * FROM content_blocks WHERE id = ?", [id])

  if (!block) return null

  // Parse JSON content
  return {
    ...block,
    content: typeof block.content === 'string' ? JSON.parse(block.content) : block.content
  }
}

export async function createContentBlock(block: Omit<ContentBlock, 'id' | 'created_at' | 'updated_at'>): Promise<ContentBlock> {
  const result = await query<any>(
    `INSERT INTO content_blocks (page, section, block_type, block_key, content, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [block.page, block.section, block.block_type, block.block_key, JSON.stringify(block.content), block.sort_order, block.is_active]
  )

  const inserted = await queryOne<any>("SELECT * FROM content_blocks WHERE id = ?", [result.insertId])
  if (!inserted) throw new Error("Failed to create content block")

  // Parse JSON content
  return {
    ...inserted,
    content: typeof inserted.content === 'string' ? JSON.parse(inserted.content) : inserted.content
  }
}

export async function updateContentBlock(id: number, updates: Partial<Omit<ContentBlock, 'id' | 'created_at' | 'updated_at'>>): Promise<ContentBlock | null> {
  const updateFields: string[] = []
  const params: any[] = []

  if (updates.page !== undefined) {
    updateFields.push("page = ?")
    params.push(updates.page)
  }
  if (updates.section !== undefined) {
    updateFields.push("section = ?")
    params.push(updates.section)
  }
  if (updates.block_type !== undefined) {
    updateFields.push("block_type = ?")
    params.push(updates.block_type)
  }
  if (updates.block_key !== undefined) {
    updateFields.push("block_key = ?")
    params.push(updates.block_key)
  }
  if (updates.content !== undefined) {
    updateFields.push("content = ?")
    params.push(JSON.stringify(updates.content))
  }
  if (updates.sort_order !== undefined) {
    updateFields.push("sort_order = ?")
    params.push(updates.sort_order)
  }
  if (updates.is_active !== undefined) {
    updateFields.push("is_active = ?")
    params.push(updates.is_active)
  }

  if (updateFields.length === 0) return null

  params.push(id)
  await query(`UPDATE content_blocks SET ${updateFields.join(", ")} WHERE id = ?`, params)

  const updated = await queryOne<any>("SELECT * FROM content_blocks WHERE id = ?", [id])
  if (!updated) return null

  // Parse JSON content
  return {
    ...updated,
    content: typeof updated.content === 'string' ? JSON.parse(updated.content) : updated.content
  }
}

export async function deleteContentBlock(id: number): Promise<boolean> {
  const result = await query<any>("DELETE FROM content_blocks WHERE id = ?", [id])
  return result.affectedRows > 0
}

export async function updateContentBlockOrder(updates: { id: number; sort_order: number }[]): Promise<void> {
  for (const update of updates) {
    await query("UPDATE content_blocks SET sort_order = ? WHERE id = ?", [update.sort_order, update.id])
  }
}

// Media Assets Management
export async function getMediaAssets(limit?: number, offset?: number): Promise<MediaAsset[]> {
  let sql = "SELECT * FROM media_assets ORDER BY created_at DESC"
  const params: any[] = []

  if (limit) {
    sql += " LIMIT ?"
    params.push(limit)
  }

  if (offset) {
    sql += " OFFSET ?"
    params.push(offset)
  }

  return await query<MediaAsset[]>(sql, params)
}

export async function getMediaAsset(id: number): Promise<MediaAsset | null> {
  return await queryOne<MediaAsset>("SELECT * FROM media_assets WHERE id = ?", [id])
}

export async function createMediaAsset(asset: Omit<MediaAsset, 'id' | 'created_at'>): Promise<MediaAsset> {
  const result = await query<any>(
    `INSERT INTO media_assets (filename, original_name, mime_type, file_size, file_path, alt_text, tags, uploaded_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [asset.filename, asset.original_name, asset.mime_type, asset.file_size, asset.file_path, asset.alt_text, JSON.stringify(asset.tags), asset.uploaded_by]
  )

  const inserted = await queryOne<MediaAsset>("SELECT * FROM media_assets WHERE id = ?", [result.insertId])
  if (!inserted) throw new Error("Failed to create media asset")
  return inserted
}

export async function updateMediaAsset(id: number, updates: Partial<Pick<MediaAsset, 'alt_text' | 'tags'>>): Promise<MediaAsset | null> {
  const updateFields: string[] = []
  const params: any[] = []

  if (updates.alt_text !== undefined) {
    updateFields.push("alt_text = ?")
    params.push(updates.alt_text)
  }
  if (updates.tags !== undefined) {
    updateFields.push("tags = ?")
    params.push(JSON.stringify(updates.tags))
  }

  if (updateFields.length === 0) return null

  params.push(id)
  await query(`UPDATE media_assets SET ${updateFields.join(", ")} WHERE id = ?`, params)

  return await queryOne<MediaAsset>("SELECT * FROM media_assets WHERE id = ?", [id])
}

export async function deleteMediaAsset(id: number): Promise<boolean> {
  // Get the file path first for cleanup
  const asset = await getMediaAsset(id)
  if (!asset) return false

  // Delete physical file if it exists
  try {
    if (fs.existsSync(asset.file_path)) {
      fs.unlinkSync(asset.file_path)
    }
  } catch (error) {
    console.error('Error deleting file:', error)
    // Continue with database deletion even if file deletion fails
  }

  // Delete from database
  const result = await query<any>("DELETE FROM media_assets WHERE id = ?", [id])
  return result.affectedRows > 0
}

// File upload utilities
export async function saveUploadedFile(file: File, uploadedBy: number): Promise<MediaAsset> {
  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }

  // Generate unique filename
  const fileExtension = path.extname(file.name)
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}${fileExtension}`
  const filePath = path.join(uploadsDir, fileName)

  // Convert file to buffer and save
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  fs.writeFileSync(filePath, buffer)

  // Create database record
  const asset = await createMediaAsset({
    filename: fileName,
    original_name: file.name,
    mime_type: file.type,
    file_size: file.size,
    file_path: `/uploads/${fileName}`,
    alt_text: '',
    tags: [],
    uploaded_by: uploadedBy
  })

  return asset
}

export function getMediaUrl(filePath: string): string {
  // Convert relative path to full URL
  if (filePath.startsWith('/')) {
    return filePath
  }
  return `/${filePath}`
}

// Helper functions for content rendering
export async function getPageContent(page: string): Promise<Record<string, ContentBlock[]>> {
  const blocks = await getContentBlocks(page)
  const grouped: Record<string, ContentBlock[]> = {}

  blocks.forEach(block => {
    if (!grouped[block.section]) {
      grouped[block.section] = []
    }
    grouped[block.section].push(block)
  })

  // Sort blocks within each section
  Object.keys(grouped).forEach(section => {
    grouped[section].sort((a, b) => a.sort_order - b.sort_order)
  })

  return grouped
}

export async function getBlockContent(page: string, section: string, blockKey: string): Promise<any | null> {
  const block = await getContentBlock(page, section, blockKey)
  return block ? block.content : null
}
