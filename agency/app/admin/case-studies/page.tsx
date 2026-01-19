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
import { Loader2, Plus, Edit, Trash2, Eye, Save, X, FolderOpen, Building, Target } from "lucide-react"
import type { CaseStudy } from "@/lib/types"

export default function AdminCaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCaseStudy, setNewCaseStudy] = useState<Partial<CaseStudy>>({
    title: '',
    client: '',
    industry: '',
    challenge: '',
    solution: '',
    results: [],
    testimonial: '',
    image: '',
    published: true
  })
  const router = useRouter()

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail',
    'Education', 'Agriculture', 'Telecommunications', 'Energy', 'Government'
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
        await fetchCaseStudies()
      } catch (error) {
        console.error('Error loading case studies:', error)
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndFetchData()
  }, [router])

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch('/api/case-studies?all=true')
      const data = await response.json()
      if (data.success) {
        setCaseStudies(data.data)
      }
    } catch (error) {
      console.error('Error fetching case studies:', error)
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

  const handleEditCaseStudy = (caseStudy: CaseStudy) => {
    setEditingCaseStudy({ ...caseStudy })
    setIsEditDialogOpen(true)
  }

  const handleCreateCaseStudy = () => {
    setNewCaseStudy({
      title: '',
      client: '',
      industry: '',
      challenge: '',
      solution: '',
      results: [],
      testimonial: '',
      image: '',
      published: true
    })
    setIsCreateDialogOpen(true)
  }

  const handleSaveCaseStudy = async () => {
    if (!editingCaseStudy) return

    try {
      const response = await fetch(`/api/case-studies/${editingCaseStudy.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCaseStudy),
      })

      const data = await response.json()
      if (data.success) {
        await fetchCaseStudies()
        setIsEditDialogOpen(false)
        setEditingCaseStudy(null)
      }
    } catch (error) {
      console.error('Error saving case study:', error)
    }
  }

  const handleCreateNewCaseStudy = async () => {
    try {
      const response = await fetch('/api/case-studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCaseStudy),
      })

      const data = await response.json()
      if (data.success) {
        await fetchCaseStudies()
        setIsCreateDialogOpen(false)
      }
    } catch (error) {
      console.error('Error creating case study:', error)
    }
  }

  const handleDeleteCaseStudy = async (id: number) => {
    if (!confirm('Are you sure you want to delete this case study?')) return

    try {
      const response = await fetch(`/api/case-studies/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (data.success) {
        setCaseStudies(prev => prev.filter(cs => cs.id !== id))
      }
    } catch (error) {
      console.error('Error deleting case study:', error)
    }
  }

  const handleCaseStudyChange = (field: string, value: any) => {
    if (editingCaseStudy) {
      setEditingCaseStudy({ ...editingCaseStudy, [field]: value })
    } else {
      setNewCaseStudy({ ...newCaseStudy, [field]: value })
    }
  }

  const handleTitleChange = (title: string) => {
    const slug = generateSlug(title)
    handleCaseStudyChange('title', title)
    handleCaseStudyChange('slug', slug)
  }

  const handleResultsChange = (resultsText: string) => {
    const results = resultsText.split('\n').filter(line => line.trim())
    handleCaseStudyChange('results', results)
  }

  const renderCaseStudyForm = (caseStudy: CaseStudy | null, isCreate = false) => {
    const currentCaseStudy = caseStudy || newCaseStudy

    return (
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={currentCaseStudy.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Case study title"
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={currentCaseStudy.slug || ''}
              onChange={(e) => handleCaseStudyChange('slug', e.target.value)}
              placeholder="url-friendly-slug"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client">Client</Label>
            <Input
              id="client"
              value={currentCaseStudy.client || ''}
              onChange={(e) => handleCaseStudyChange('client', e.target.value)}
              placeholder="Client company name"
            />
          </div>
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Select value={currentCaseStudy.industry || ''} onValueChange={(value: string) => handleCaseStudyChange('industry', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="challenge">Challenge</Label>
          <Textarea
            id="challenge"
            value={currentCaseStudy.challenge || ''}
            onChange={(e) => handleCaseStudyChange('challenge', e.target.value)}
            rows={3}
            placeholder="Describe the client's challenge"
          />
        </div>

        <div>
          <Label htmlFor="solution">Solution</Label>
          <Textarea
            id="solution"
            value={currentCaseStudy.solution || ''}
            onChange={(e) => handleCaseStudyChange('solution', e.target.value)}
            rows={3}
            placeholder="Describe the solution provided"
          />
        </div>

        <div>
          <Label htmlFor="results">Results (one per line)</Label>
          <Textarea
            id="results"
            value={(currentCaseStudy.results || []).join('\n')}
            onChange={(e) => handleResultsChange(e.target.value)}
            rows={4}
            placeholder="Key results and outcomes"
          />
        </div>

        <div>
          <Label htmlFor="testimonial">Client Testimonial</Label>
          <Textarea
            id="testimonial"
            value={currentCaseStudy.testimonial || ''}
            onChange={(e) => handleCaseStudyChange('testimonial', e.target.value)}
            rows={3}
            placeholder="Client testimonial or quote"
          />
        </div>

        <div>
          <Label htmlFor="image">Featured Image URL</Label>
          <div className="flex gap-2">
            <Input
              id="image"
              value={currentCaseStudy.image || ''}
              onChange={(e) => handleCaseStudyChange('image', e.target.value)}
              placeholder="Image URL"
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

        {currentCaseStudy.image && (
          <div>
            <Label>Preview</Label>
            <div className="mt-2 border rounded-lg overflow-hidden">
              <img
                src={currentCaseStudy.image}
                alt={currentCaseStudy.title || 'Preview'}
                className="w-full h-32 object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.jpg'
                }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={currentCaseStudy.published || false}
            onCheckedChange={(checked: boolean) => handleCaseStudyChange('published', checked)}
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
          <span>Loading case studies...</span>
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
          <h1 className="text-3xl font-bold">Case Studies Management</h1>
          <p className="text-muted-foreground">Showcase your successful client projects and transformations</p>
        </div>
        <Button onClick={handleCreateCaseStudy}>
          <Plus className="mr-2 h-4 w-4" />
          Add Case Study
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Case Studies</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseStudies.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {caseStudies.filter(cs => cs.published).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Industries Served</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(caseStudies.map(cs => cs.industry).filter(Boolean)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Case Studies Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((caseStudy) => (
          <Card key={caseStudy.id} className="group overflow-hidden">
            <div className="aspect-video relative overflow-hidden bg-muted">
              {caseStudy.image ? (
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <FolderOpen className="h-12 w-12 text-primary/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => window.open(`/case-studies/${caseStudy.slug}`, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEditCaseStudy(caseStudy)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteCaseStudy(caseStudy.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 line-clamp-2">{caseStudy.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={caseStudy.published ? "default" : "secondary"}>
                      {caseStudy.published ? "Published" : "Draft"}
                    </Badge>
                    {caseStudy.industry && (
                      <Badge variant="outline">
                        <Building className="h-3 w-3 mr-1" />
                        {caseStudy.industry}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium text-primary">{caseStudy.client}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {caseStudy.challenge && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    <strong>Challenge:</strong> {caseStudy.challenge}
                  </p>
                )}
                {caseStudy.results && caseStudy.results.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {caseStudy.results.slice(0, 2).map((result, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {result.length > 20 ? `${result.substring(0, 20)}...` : result}
                      </Badge>
                    ))}
                    {caseStudy.results.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{caseStudy.results.length - 2} more
                      </Badge>
                    )}
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  Updated {new Date(caseStudy.updated_at).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {caseStudies.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No case studies yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Showcase your successful projects and client transformations.
              </p>
              <Button onClick={handleCreateCaseStudy}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Case Study
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Case Study</DialogTitle>
            <DialogDescription>
              Update the case study information. Changes will be reflected on the website.
            </DialogDescription>
          </DialogHeader>

          {editingCaseStudy && renderCaseStudyForm(editingCaseStudy)}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveCaseStudy}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Case Study</DialogTitle>
            <DialogDescription>
              Add a new client success story to showcase your work.
            </DialogDescription>
          </DialogHeader>

          {renderCaseStudyForm(null, true)}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleCreateNewCaseStudy}>
              <Save className="mr-2 h-4 w-4" />
              Create Case Study
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
