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
import { Switch } from "@/components/ui/switch"
import { Loader2, Plus, Edit, Trash2, Eye, Save, X, Briefcase } from "lucide-react"
import type { Service } from "@/lib/types"

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newService, setNewService] = useState<Partial<Service>>({
    title: '',
    slug: '',
    description: '',
    long_description: '',
    icon: 'settings',
    features: [],
    published: true
  })
  const router = useRouter()

  const iconOptions = [
    'settings', 'users', 'bar-chart', 'shield', 'target', 'lightbulb',
    'cog', 'briefcase', 'graduation-cap', 'handshake', 'trending-up', 'globe'
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
        await fetchServices()
      } catch (error) {
        console.error('Error loading services:', error)
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndFetchData()
  }, [router])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services?all=true')
      const data = await response.json()
      if (data.success) {
        setServices(data.data)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleEditService = (service: Service) => {
    setEditingService({ ...service })
    setIsEditDialogOpen(true)
  }

  const handleCreateService = () => {
    setNewService({
      title: '',
      slug: '',
      description: '',
      long_description: '',
      icon: 'settings',
      features: [],
      published: true
    })
    setIsCreateDialogOpen(true)
  }

  const handleSaveService = async () => {
    if (!editingService) return

    try {
      const response = await fetch(`/api/services/${editingService.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      })

      const data = await response.json()
      if (data.success) {
        await fetchServices()
        setIsEditDialogOpen(false)
        setEditingService(null)
      }
    } catch (error) {
      console.error('Error saving service:', error)
    }
  }

  const handleCreateNewService = async () => {
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      })

      const data = await response.json()
      if (data.success) {
        await fetchServices()
        setIsCreateDialogOpen(false)
      }
    } catch (error) {
      console.error('Error creating service:', error)
    }
  }

  const handleDeleteService = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (data.success) {
        setServices(prev => prev.filter(service => service.id !== id))
      }
    } catch (error) {
      console.error('Error deleting service:', error)
    }
  }

  const handleServiceChange = (field: string, value: any) => {
    if (editingService) {
      setEditingService({ ...editingService, [field]: value })
    } else {
      setNewService({ ...newService, [field]: value })
    }
  }

  const handleTitleChange = (title: string) => {
    const slug = generateSlug(title)
    handleServiceChange('title', title)
    handleServiceChange('slug', slug)
  }

  const handleFeaturesChange = (featuresText: string) => {
    const features = featuresText.split('\n').filter(line => line.trim())
    handleServiceChange('features', features)
  }

  const renderServiceForm = (service: Service | null, isCreate = false) => {
    const currentService = service || newService

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={currentService.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Service title"
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={currentService.slug || ''}
              onChange={(e) => handleServiceChange('slug', e.target.value)}
              placeholder="url-friendly-slug"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="icon">Icon</Label>
          <Select value={currentService.icon || 'settings'} onValueChange={(value: string) => handleServiceChange('icon', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {icon}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            value={currentService.description || ''}
            onChange={(e) => handleServiceChange('description', e.target.value)}
            rows={3}
            placeholder="Brief description for service cards"
          />
        </div>

        <div>
          <Label htmlFor="long_description">Detailed Description</Label>
          <Textarea
            id="long_description"
            value={currentService.long_description || ''}
            onChange={(e) => handleServiceChange('long_description', e.target.value)}
            rows={5}
            placeholder="Detailed service description for individual pages"
          />
        </div>

        <div>
          <Label htmlFor="features">Features (one per line)</Label>
          <Textarea
            id="features"
            value={(currentService.features || []).join('\n')}
            onChange={(e) => handleFeaturesChange(e.target.value)}
            rows={6}
            placeholder="Key features or benefits"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={currentService.published || false}
            onCheckedChange={(checked: boolean) => handleServiceChange('published', checked)}
          />
          <Label htmlFor="published">Published</Label>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading services...</span>
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
          <h1 className="text-3xl font-bold">Services Management</h1>
          <p className="text-muted-foreground">Create and manage your service offerings</p>
        </div>
        <Button onClick={handleCreateService}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="group overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={service.published ? "default" : "secondary"}>
                      {service.published ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="outline">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {service.icon}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => window.open(`/services/${service.slug}`, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditService(service)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {service.description}
                </p>
                <div className="text-xs text-muted-foreground">
                  {service.features?.length || 0} features • Updated {new Date(service.updated_at).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {services.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No services yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Get started by creating your first service offering.
              </p>
              <Button onClick={handleCreateService}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Service
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update the service information. Changes will be reflected on the website.
            </DialogDescription>
          </DialogHeader>

          {editingService && renderServiceForm(editingService)}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveService}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Service</DialogTitle>
            <DialogDescription>
              Add a new service to your offerings.
            </DialogDescription>
          </DialogHeader>

          {renderServiceForm(null, true)}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleCreateNewService}>
              <Save className="mr-2 h-4 w-4" />
              Create Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
