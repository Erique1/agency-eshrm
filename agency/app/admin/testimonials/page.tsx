"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, Plus, Edit, Trash2, Eye, Save, X, MessageSquare, Star } from "lucide-react"
import type { Testimonial } from "@/lib/types"

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: '',
    role: '',
    company: '',
    content: '',
    image: '',
    published: true
  })
  const router = useRouter()

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
        await fetchTestimonials()
      } catch (error) {
        console.error('Error loading testimonials:', error)
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndFetchData()
  }, [router])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials?all=true')
      const data = await response.json()
      if (data.success) {
        setTestimonials(data.data)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    }
  }

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial({ ...testimonial })
    setIsEditDialogOpen(true)
  }

  const handleCreateTestimonial = () => {
    setNewTestimonial({
      name: '',
      role: '',
      company: '',
      content: '',
      image: '',
      published: true
    })
    setIsCreateDialogOpen(true)
  }

  const handleSaveTestimonial = async () => {
    if (!editingTestimonial) return

    try {
      const response = await fetch(`/api/testimonials/${editingTestimonial.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTestimonial),
      })

      const data = await response.json()
      if (data.success) {
        await fetchTestimonials()
        setIsEditDialogOpen(false)
        setEditingTestimonial(null)
      }
    } catch (error) {
      console.error('Error saving testimonial:', error)
    }
  }

  const handleCreateNewTestimonial = async () => {
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTestimonial),
      })

      const data = await response.json()
      if (data.success) {
        await fetchTestimonials()
        setIsCreateDialogOpen(false)
      }
    } catch (error) {
      console.error('Error creating testimonial:', error)
    }
  }

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (data.success) {
        setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id))
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error)
    }
  }

  const handleTestimonialChange = (field: string, value: any) => {
    if (editingTestimonial) {
      setEditingTestimonial({ ...editingTestimonial, [field]: value })
    } else {
      setNewTestimonial({ ...newTestimonial, [field]: value })
    }
  }

  const renderTestimonialForm = (testimonial: Testimonial | null, isCreate = false) => {
    const currentTestimonial = testimonial || newTestimonial

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={currentTestimonial.name || ''}
              onChange={(e) => handleTestimonialChange('name', e.target.value)}
              placeholder="Client name"
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={currentTestimonial.role || ''}
              onChange={(e) => handleTestimonialChange('role', e.target.value)}
              placeholder="Job title"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={currentTestimonial.company || ''}
            onChange={(e) => handleTestimonialChange('company', e.target.value)}
            placeholder="Company name"
          />
        </div>

        <div>
          <Label htmlFor="content">Testimonial Content</Label>
          <Textarea
            id="content"
            value={currentTestimonial.content || ''}
            onChange={(e) => handleTestimonialChange('content', e.target.value)}
            rows={4}
            placeholder="The testimonial text"
          />
        </div>

        <div>
          <Label htmlFor="image">Image URL</Label>
          <div className="flex gap-2">
            <Input
              id="image"
              value={currentTestimonial.image || ''}
              onChange={(e) => handleTestimonialChange('image', e.target.value)}
              placeholder="Profile image URL"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => alert('Media picker coming soon!')}
            >
              Browse
            </Button>
          </div>
        </div>

        {currentTestimonial.image && (
          <div>
            <Label>Preview</Label>
            <div className="mt-2 flex justify-center">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name || 'Preview'}
                className="w-20 h-20 rounded-full object-cover border"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-user.jpg'
                }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={currentTestimonial.published || false}
            onCheckedChange={(checked: boolean) => handleTestimonialChange('published', checked)}
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
          <span>Loading testimonials...</span>
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
          <h1 className="text-3xl font-bold">Testimonials Management</h1>
          <p className="text-muted-foreground">Manage customer testimonials and reviews</p>
        </div>
        <Button onClick={handleCreateTestimonial}>
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimonials.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {testimonials.filter(t => t.published).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
            <div className="h-2 w-2 rounded-full bg-gray-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {testimonials.filter(t => !t.published).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="group overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-user.jpg'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold text-lg">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.role && testimonial.company && ' at '}
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditTestimonial(testimonial)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={testimonial.published ? "default" : "secondary"}>
                    {testimonial.published ? "Published" : "Draft"}
                  </Badge>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-sm text-muted-foreground italic border-l-2 border-primary pl-4">
                  "{testimonial.content}"
                </blockquote>

                <div className="text-xs text-muted-foreground">
                  Updated {new Date(testimonial.updated_at).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {testimonials.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No testimonials yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Start collecting customer testimonials to showcase social proof.
              </p>
              <Button onClick={handleCreateTestimonial}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Testimonial
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
            <DialogDescription>
              Update the testimonial information. Changes will be reflected on the website.
            </DialogDescription>
          </DialogHeader>

          {editingTestimonial && renderTestimonialForm(editingTestimonial)}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveTestimonial}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Testimonial</DialogTitle>
            <DialogDescription>
              Add a new customer testimonial.
            </DialogDescription>
          </DialogHeader>

          {renderTestimonialForm(null, true)}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleCreateNewTestimonial}>
              <Save className="mr-2 h-4 w-4" />
              Create Testimonial
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
