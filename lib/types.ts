// TypeScript interfaces for the application

export interface Service {
  id: number
  title: string
  slug: string
  description: string
  long_description: string | null
  icon: string
  features: string[]
  published: boolean
  created_at: Date
  updated_at: Date
}

export interface CaseStudy {
  id: number
  title: string
  slug: string
  client: string
  industry: string | null
  challenge: string | null
  solution: string | null
  results: string[]
  testimonial: string | null
  image: string | null
  published: boolean
  created_at: Date
  updated_at: Date
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  category: string | null
  tags: string[]
  author: string
  image: string | null
  published_at: Date | null
  meta_title: string | null
  meta_description: string | null
  published: boolean
  created_at: Date
  updated_at: Date
}

export interface Testimonial {
  id: number
  name: string
  role: string | null
  company: string | null
  content: string
  image: string | null
  published: boolean
  created_at: Date
  updated_at: Date
}

export interface Lead {
  id: number
  name: string
  email: string
  company: string | null
  message: string | null
  service_interest: string | null
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  created_at: Date
  updated_at: Date
}

export interface Booking {
  id: number
  name: string
  email: string
  company: string | null
  phone: string | null
  service: string | null
  booking_date: Date
  booking_time: string
  consultation_type: "video" | "phone" | "in-person"
  message: string | null
  status: "pending" | "confirmed" | "completed" | "cancelled"
  created_at: Date
  updated_at: Date
}

export interface SiteSetting {
  id: number
  setting_key: string
  setting_value: string | null
  created_at: Date
  updated_at: Date
}

export interface AdminUser {
  id: number
  email: string
  password_hash: string
  name: string | null
  role: "admin" | "editor"
  last_login: Date | null
  created_at: Date
  updated_at: Date
}

export interface AdminSession {
  id: string
  user_id: number
  expires_at: Date
  created_at: Date
}

export interface User {
  id: number
  email: string
  password_hash: string
  name: string | null
  role: "admin" | "editor" | "author"
  last_login: Date | null
  created_at: Date
  updated_at: Date
}

export interface Session {
  id: string
  user_id: number
  expires_at: Date
  created_at: Date
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Site settings as object
export interface SiteSettings {
  site_name: string
  tagline: string
  primary_color: string
  accent_color: string
  phone: string
  phone_secondary: string
  email: string
  address: string
  linkedin: string
  twitter: string
  facebook: string
}

export interface ContentBlock {
  id: number
  page: string
  section: string
  block_type: string
  block_key: string
  content: any // JSON content
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface MediaAsset {
  id: number
  filename: string
  original_name: string
  mime_type: string
  file_size: number
  file_path: string
  alt_text: string | null
  tags: string[]
  uploaded_by: number | null
  created_at: Date
}
