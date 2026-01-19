"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Edit, Plus, Eye, Save, X } from "lucide-react"
import type { ContentBlock } from "@/lib/types"
import { MediaPicker } from "@/components/admin/media-picker"

interface PageContent {
  [section: string]: ContentBlock[]
}

export default function AdminPages() {
  const [content, setContent] = useState<PageContent>({})
  const [selectedPage, setSelectedPage] = useState("home")
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const router = useRouter()

  const pages = [
    { id: "home", name: "Home Page", sections: [
      "hero", "services", "why_choose_us", "process", "case_studies",
      "testimonials", "clients", "mission", "faq", "cta"
    ]},
    { id: "about", name: "About Page", sections: [
      "hero", "story", "mission_vision", "values", "stats", "africa_focus", "team", "cta"
    ]},
    { id: "contact", name: "Contact Page", sections: [
      "hero", "contact_info"
    ]},
    { id: "book_consultation", name: "Book Consultation", sections: [
      "hero", "info"
    ]},
    { id: "insights", name: "Insights/Blog", sections: [
      "hero", "categories", "featured", "latest", "newsletter"
    ]},
    { id: "case_studies", name: "Case Studies", sections: [
      "hero"
    ]},
    { id: "global", name: "Global (Header/Footer)", sections: ["header", "footer"] },
  ]

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        const sessionRes = await fetch('/api/admin/session')
        const sessionData = await sessionRes.json()

        if (!sessionData.success) {
          router.push('/admin/login')
          return
        }

        setIsAuthenticated(true)
        await fetchPageContent(selectedPage)
      } catch (error) {
        console.error('Error loading pages:', error)
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndFetchData()
  }, [router, selectedPage])

  const fetchPageContent = async (page: string) => {
    try {
      const response = await fetch(`/api/content?page=${page}`)
      const data = await response.json()
      if (data.success) {
        setContent(data.data)
      }
    } catch (error) {
      console.error('Error fetching page content:', error)
    }
  }

  const handleEditBlock = (block: ContentBlock) => {
    setEditingBlock({ ...block })
    setIsEditDialogOpen(true)
  }

  const handleSaveBlock = async () => {
    if (!editingBlock) return

    try {
      const response = await fetch(`/api/content/${editingBlock.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBlock),
      })

      const data = await response.json()
      if (data.success) {
        await fetchPageContent(selectedPage)
        setIsEditDialogOpen(false)
        setEditingBlock(null)
      }
    } catch (error) {
      console.error('Error saving block:', error)
    }
  }

  const handleContentChange = (field: string, value: string | string[]) => {
    if (!editingBlock) return

    if (field.includes('.')) {
      // Handle nested content updates
      const [parent, child] = field.split('.')
      setEditingBlock({
        ...editingBlock,
        content: {
          ...editingBlock.content,
          [parent]: {
            ...editingBlock.content[parent],
            [child]: value
          }
        }
      })
    } else {
      setEditingBlock({
        ...editingBlock,
        content: {
          ...editingBlock.content,
          [field]: value
        }
      })
    }
  }

  const renderContentEditor = () => {
    if (!editingBlock) return null

    const content = editingBlock.content

    switch (editingBlock.block_type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text Content</Label>
              <Textarea
                id="text"
                value={content.text || ''}
                onChange={(e) => handleContentChange('text', e.target.value)}
                rows={3}
              />
            </div>
            {content.highlight && (
              <div>
                <Label htmlFor="highlight">Highlighted Text</Label>
                <Input
                  id="highlight"
                  value={content.highlight || ''}
                  onChange={(e) => handleContentChange('highlight', e.target.value)}
                />
              </div>
            )}
          </div>
        )

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="src">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="src"
                  value={content.src || ''}
                  onChange={(e) => handleContentChange('src', e.target.value)}
                  placeholder="Enter image URL or select from media library"
                />
                <MediaPicker
                  value={content.src}
                  onSelect={(url) => handleContentChange('src', url)}
                  trigger={
                    <Button type="button" variant="outline" size="sm">
                      Browse
                    </Button>
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={content.alt || ''}
                onChange={(e) => handleContentChange('alt', e.target.value)}
                placeholder="Describe the image for accessibility"
              />
            </div>
            {content.src && (
              <div>
                <Label>Preview</Label>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <img
                    src={content.src}
                    alt={content.alt || 'Preview'}
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.jpg'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Button Text</Label>
              <Input
                id="text"
                value={content.text || ''}
                onChange={(e) => handleContentChange('text', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="link">Button Link</Label>
              <Input
                id="link"
                value={content.link || ''}
                onChange={(e) => handleContentChange('link', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="variant">Button Style</Label>
              <Select value={content.variant || 'default'} onValueChange={(value: string) => handleContentChange('variant', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 'stats':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                value={content.value || ''}
                onChange={(e) => handleContentChange('value', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={content.label || ''}
                onChange={(e) => handleContentChange('label', e.target.value)}
              />
            </div>
          </div>
        )

      case 'testimonial':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={content.name || ''}
                onChange={(e) => handleContentChange('name', e.target.value)}
                placeholder="Testimonial author's name"
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={content.role || ''}
                onChange={(e) => handleContentChange('role', e.target.value)}
                placeholder="Job title"
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={content.company || ''}
                onChange={(e) => handleContentChange('company', e.target.value)}
                placeholder="Company name"
              />
            </div>
            <div>
              <Label htmlFor="content">Testimonial Content</Label>
              <Textarea
                id="content"
                value={content.content || ''}
                onChange={(e) => handleContentChange('content', e.target.value)}
                rows={4}
                placeholder="The testimonial text"
              />
            </div>
            <div>
              <Label htmlFor="image">Profile Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  value={content.image || ''}
                  onChange={(e) => handleContentChange('image', e.target.value)}
                  placeholder="Profile image URL"
                />
                <MediaPicker
                  value={content.image}
                  onSelect={(url) => handleContentChange('image', url)}
                  trigger={
                    <Button type="button" variant="outline" size="sm">
                      Browse
                    </Button>
                  }
                />
              </div>
            </div>
            {content.image && (
              <div>
                <Label>Image Preview</Label>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <img
                    src={content.image}
                    alt={content.name || 'Testimonial author'}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-user.jpg'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )

      case 'trust_indicators':
        return (
          <div className="space-y-4">
            <Label>Trust Indicators (one per line)</Label>
            <Textarea
              value={(content.indicators || []).join('\n')}
              onChange={(e) => handleContentChange('indicators', e.target.value.split('\n').filter(line => line.trim()))}
              rows={6}
              placeholder="Enter each trust indicator on a new line"
            />
          </div>
        )

      case 'feature':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Feature Title</Label>
              <Input
                id="title"
                value={content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Feature Description</Label>
              <Textarea
                id="description"
                value={content.description || ''}
                onChange={(e) => handleContentChange('description', e.target.value)}
                rows={3}
              />
            </div>
            {content.icon && (
              <div>
                <Label htmlFor="icon">Icon Name</Label>
                <Input
                  id="icon"
                  value={content.icon || ''}
                  onChange={(e) => handleContentChange('icon', e.target.value)}
                  placeholder="e.g., Award, Heart, TrendingUp"
                />
              </div>
            )}
          </div>
        )

      case 'team_member':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={content.name || ''}
                onChange={(e) => handleContentChange('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={content.role || ''}
                onChange={(e) => handleContentChange('role', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={content.bio || ''}
                onChange={(e) => handleContentChange('bio', e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="image">Profile Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  value={content.image || ''}
                  onChange={(e) => handleContentChange('image', e.target.value)}
                  placeholder="Profile image URL"
                />
                <MediaPicker
                  value={content.image}
                  onSelect={(url) => handleContentChange('image', url)}
                  trigger={
                    <Button type="button" variant="outline" size="sm">
                      Browse
                    </Button>
                  }
                />
              </div>
            </div>
            {content.image && (
              <div>
                <Label>Image Preview</Label>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <img
                    src={content.image}
                    alt={content.name || 'Team member'}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-user.jpg'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="type">Contact Type</Label>
              <Select value={content.type || 'office'} onValueChange={(value: string) => handleContentChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="hours">Business Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content.content || ''}
                onChange={(e) => handleContentChange('content', e.target.value)}
                rows={3}
              />
            </div>
            {content.note && (
              <div>
                <Label htmlFor="note">Note</Label>
                <Input
                  id="note"
                  value={content.note || ''}
                  onChange={(e) => handleContentChange('note', e.target.value)}
                />
              </div>
            )}
          </div>
        )

      case 'categories':
        return (
          <div className="space-y-4">
            <Label>Categories (one per line)</Label>
            <Textarea
              value={(content.categories || []).join('\n')}
              onChange={(e) => handleContentChange('categories', e.target.value.split('\n').filter(line => line.trim()))}
              rows={6}
              placeholder="Enter each category on a new line"
            />
          </div>
        )

      case 'contact_info':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={content.subtitle || ''}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={content.address || ''}
                onChange={(e) => handleContentChange('address', e.target.value)}
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={content.phone || ''}
                onChange={(e) => handleContentChange('phone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={content.email || ''}
                onChange={(e) => handleContentChange('email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={content.website || ''}
                onChange={(e) => handleContentChange('website', e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>
        )

      case 'africa_focus':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={content.description || ''}
                onChange={(e) => handleContentChange('description', e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="countries_count">Countries Served</Label>
              <Input
                id="countries_count"
                value={content.countries_count || ''}
                onChange={(e) => handleContentChange('countries_count', e.target.value)}
                placeholder="e.g., 20+"
              />
            </div>
            <div>
              <Label htmlFor="expertise_areas">Expertise Areas (one per line)</Label>
              <Textarea
                id="expertise_areas"
                value={(content.expertise_areas || []).join('\n')}
                onChange={(e) => handleContentChange('expertise_areas', e.target.value.split('\n').filter(line => line.trim()))}
                rows={4}
                placeholder="Enter each expertise area on a new line"
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  value={content.image || ''}
                  onChange={(e) => handleContentChange('image', e.target.value)}
                  placeholder="Image URL for Africa focus section"
                />
                <MediaPicker
                  value={content.image}
                  onSelect={(url) => handleContentChange('image', url)}
                  trigger={
                    <Button type="button" variant="outline" size="sm">
                      Browse
                    </Button>
                  }
                />
              </div>
            </div>
            {content.image && (
              <div>
                <Label>Image Preview</Label>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <img
                    src={content.image}
                    alt="Africa focus"
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.jpg'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )

      case 'stats_item':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                value={content.value || ''}
                onChange={(e) => handleContentChange('value', e.target.value)}
                placeholder="e.g., 500+, 98%, $2M"
              />
            </div>
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={content.label || ''}
                onChange={(e) => handleContentChange('label', e.target.value)}
                placeholder="Description of the statistic"
              />
            </div>
            <div>
              <Label htmlFor="description">Additional Description</Label>
              <Textarea
                id="description"
                value={content.description || ''}
                onChange={(e) => handleContentChange('description', e.target.value)}
                rows={2}
                placeholder="Optional additional context"
              />
            </div>
            <div>
              <Label htmlFor="icon">Icon Name</Label>
              <Input
                id="icon"
                value={content.icon || ''}
                onChange={(e) => handleContentChange('icon', e.target.value)}
                placeholder="e.g., TrendingUp, Users, Award"
              />
            </div>
          </div>
        )

      case 'contact_detail':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="type">Contact Type</Label>
              <Select value={content.type || 'address'} onValueChange={(value: string) => handleContentChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="address">Address</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="hours">Business Hours</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                placeholder="Display title for this contact item"
              />
            </div>
            <div>
              <Label htmlFor="value">Value</Label>
              <Textarea
                id="value"
                value={content.value || ''}
                onChange={(e) => handleContentChange('value', e.target.value)}
                rows={content.type === 'hours' ? 4 : 2}
                placeholder={content.type === 'hours' ? "Business hours (one per line)" : "Contact value"}
              />
            </div>
            {content.label && (
              <div>
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={content.label || ''}
                  onChange={(e) => handleContentChange('label', e.target.value)}
                  placeholder="Additional label (e.g., secondary phone)"
                />
              </div>
            )}
            <div>
              <Label htmlFor="note">Note</Label>
              <Input
                id="note"
                value={content.note || ''}
                onChange={(e) => handleContentChange('note', e.target.value)}
                placeholder="Optional note or additional information"
              />
            </div>
            <div>
              <Label htmlFor="icon">Icon Name</Label>
              <Input
                id="icon"
                value={content.icon || ''}
                onChange={(e) => handleContentChange('icon', e.target.value)}
                placeholder="e.g., MapPin, Phone, Mail, Clock"
              />
            </div>
          </div>
        )

      case 'services_list':
        return (
          <div className="space-y-4">
            <Label>Services (one per line)</Label>
            <Textarea
              value={(content.services || []).join('\n')}
              onChange={(e) => handleContentChange('services', e.target.value.split('\n').filter(line => line.trim()))}
              rows={8}
              placeholder="Enter each service option on a new line"
            />
            <div className="text-sm text-muted-foreground">
              These services will appear as options in contact forms and other selection interfaces.
            </div>
          </div>
        )

      case 'brand_name':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Brand Text</Label>
              <Input
                id="text"
                value={content.text || ''}
                onChange={(e) => handleContentChange('text', e.target.value)}
                placeholder="Brand name as text (optional if using logo)"
              />
            </div>
            <div>
              <Label htmlFor="src">Logo Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="src"
                  value={content.src || ''}
                  onChange={(e) => handleContentChange('src', e.target.value)}
                  placeholder="Logo image URL"
                />
                <MediaPicker
                  value={content.src}
                  onSelect={(url) => handleContentChange('src', url)}
                  trigger={
                    <Button type="button" variant="outline" size="sm">
                      Browse
                    </Button>
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="alt">Logo Alt Text</Label>
              <Input
                id="alt"
                value={content.alt || ''}
                onChange={(e) => handleContentChange('alt', e.target.value)}
                placeholder="Describe the logo for accessibility"
              />
            </div>
            {(content.src || content.text) && (
              <div>
                <Label>Preview</Label>
                <div className="mt-2 p-4 border rounded-lg bg-muted/50">
                  {content.src ? (
                    <img
                      src={content.src}
                      alt={content.alt || 'Logo preview'}
                      className="h-8 w-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    <span className="font-bold text-lg">{content.text || 'ESHRM'}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )

      case 'client':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Client Name</Label>
              <Input
                id="name"
                value={content.name || ''}
                onChange={(e) => handleContentChange('name', e.target.value)}
                placeholder="Full client company name"
              />
            </div>
            <div>
              <Label htmlFor="logo">Logo Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="logo"
                  value={content.logo || ''}
                  onChange={(e) => handleContentChange('logo', e.target.value)}
                  placeholder="Client logo image URL"
                />
                <MediaPicker
                  value={content.logo}
                  onSelect={(url) => handleContentChange('logo', url)}
                  trigger={
                    <Button type="button" variant="outline" size="sm">
                      Browse
                    </Button>
                  }
                />
              </div>
            </div>
            {content.logo && (
              <div>
                <Label>Logo Preview</Label>
                <div className="mt-2 border rounded-lg overflow-hidden bg-white p-4">
                  <img
                    src={content.logo}
                    alt={`${content.name || 'Client'} logo`}
                    className="h-12 w-auto object-contain mx-auto"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-logo.png'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )

      default:
        return (
          <div>
            <Label>Raw Content (JSON)</Label>
            <Textarea
              value={JSON.stringify(content, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value)
                  setEditingBlock({ ...editingBlock, content: parsed })
                } catch (error) {
                  // Invalid JSON, keep current value
                }
              }}
              rows={10}
            />
          </div>
        )
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading pages...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Page Content Management</h1>
          <p className="text-muted-foreground">Edit content for all website pages</p>
        </div>
        <Button asChild>
          <a href="/" target="_blank">
            <Eye className="mr-2 h-4 w-4" />
            View Site
          </a>
        </Button>
      </div>

      <Tabs value={selectedPage} onValueChange={setSelectedPage}>
        <TabsList className="grid w-full grid-cols-7">
          {pages.map((page) => (
            <TabsTrigger key={page.id} value={page.id}>
              {page.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {pages.map((page) => (
          <TabsContent key={page.id} value={page.id} className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(content).map(([section, blocks]) => (
                <Card key={section}>
                  <CardHeader>
                    <CardTitle className="capitalize">{section.replace('_', ' ')} Section</CardTitle>
                    <CardDescription>
                      {blocks.length} content {blocks.length === 1 ? 'block' : 'blocks'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {blocks.map((block) => (
                        <div key={block.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{block.block_type}</Badge>
                              <Badge variant="secondary">{block.block_key}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {block.block_type === 'text' && block.content.text}
                              {block.block_type === 'image' && block.content.alt}
                              {block.block_type === 'button' && block.content.text}
                              {block.block_type === 'stats' && `${block.content.value} - ${block.content.label}`}
                              {block.block_type === 'testimonial' && block.content.name}
                              {block.block_type === 'trust_indicators' && `${block.content.indicators?.length || 0} indicators`}
                              {block.block_type === 'feature' && block.content.title}
                              {block.block_type === 'team_member' && block.content.name}
                              {block.block_type === 'contact' && block.content.title}
                              {block.block_type === 'contact_detail' && block.content.title}
                              {block.block_type === 'categories' && `${block.content.categories?.length || 0} categories`}
                              {block.block_type === 'contact_info' && block.content.title}
                              {block.block_type === 'africa_focus' && block.content.title}
                              {block.block_type === 'stats_item' && `${block.content.value} - ${block.content.label}`}
                              {block.block_type === 'services_list' && `${block.content.services?.length || 0} services`}
                              {block.block_type === 'brand_name' && (block.content.src ? 'Logo image' : block.content.text || 'Brand name')}
                              {block.block_type === 'client' && block.content.name}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditBlock(block)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {Object.keys(content).length === 0 && (
                <Card>
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-4">No content blocks found for this page.</p>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Content Block
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Content Block</DialogTitle>
            <DialogDescription>
              Modify the content for this block. Changes will be reflected on the website.
            </DialogDescription>
          </DialogHeader>

          {editingBlock && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Block Type</Label>
                  <div className="mt-1">
                    <Badge>{editingBlock.block_type}</Badge>
                  </div>
                </div>
                <div>
                  <Label>Block Key</Label>
                  <div className="mt-1">
                    <Badge variant="outline">{editingBlock.block_key}</Badge>
                  </div>
                </div>
              </div>

              {renderContentEditor()}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleSaveBlock}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
