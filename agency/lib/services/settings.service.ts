import { query, queryOne } from "@/lib/db"
import type { SiteSetting, SiteSettings } from "@/lib/types"

export async function getAllSettings(): Promise<SiteSettings> {
  const rows = await query<SiteSetting[]>("SELECT * FROM site_settings")
  const settings: Record<string, string> = {}
  rows.forEach((row) => {
    settings[row.setting_key] = row.setting_value || ""
  })
  return settings as unknown as SiteSettings
}

export async function getSetting(key: string): Promise<string | null> {
  const row = await queryOne<SiteSetting>("SELECT * FROM site_settings WHERE setting_key = ?", [key])
  return row?.setting_value || null
}

export async function updateSetting(key: string, value: string): Promise<void> {
  await query(
    `INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = ?`,
    [key, value, value],
  )
}

export async function updateSettings(settings: Partial<SiteSettings>): Promise<void> {
  for (const [key, value] of Object.entries(settings)) {
    if (value !== undefined) {
      await updateSetting(key, value)
    }
  }
}
