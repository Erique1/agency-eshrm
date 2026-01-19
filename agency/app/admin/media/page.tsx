"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Upload, Image as ImageIcon, Edit, Trash2, Copy, Check } from "lucide-react"
import type { MediaAsset } from "@/lib/types"

export default function AdminMedia() {
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [editingAsset, setEditingAsset] = useState<MediaAsset | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
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
        await fetchMediaAssets()
      } catch (error) {
        console.error('Error loading media:', error)
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndFetchData()
  }, [router])

  const fetchMediaAssets = async () => {
    try {
      const response = await fetch('/api/media')
      const data = await response.json()
      if (data.success) {
        setAssets(data.data)
      }
    } catch (error) {
      console.error('Error fetching media assets:', error)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('uploadedBy', '1') // TODO: Get from session

        const response = await fetch('/api/media', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()
        if (data.success) {
          setAssets(prev => [data.data, ...prev])
        }

        setUploadProgress(((i + 1) / files.length) * 100)
      }
    } catch (error) {
      console.error('Error uploading files:', error)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleEditAsset = (asset: MediaAsset) => {
    setEditingAsset({ ...asset })
    setIsEditDialogOpen(true)
  }

  const handleSaveAsset = async () => {
    if (!editingAsset) return

    try {
      const response = await fetch(`/api/media/${editingAsset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alt_text: editingAsset.alt_text,
          tags: editingAsset.tags
        }),
      })

      const data = await response.json()
      if (data.success) {
        await fetchMediaAssets()
        setIsEditDialogOpen(false)
        setEditingAsset(null)
      }
    } catch (error) {
      console.error('Error saving asset:', error)
    }
  }

  const handleDeleteAsset = async (id: number) => {
    if (!confirm('Are you sure you want to delete this media asset?')) return

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (data.success) {
        setAssets(prev => prev.filter(asset => asset.id !== id))
      }
    } catch (error) {
      console.error('Error deleting asset:', error)
    }
  }

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedUrl(url)
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading media library...</span>
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
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground">Upload and manage images for your website</p>
        </div>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            Upload Images
          </Button>
        </div>
      </div>

      {isUploading && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Loader2 className="h-4 w-4 animate-spin" />
              <div className="flex-1">
                <div className="text-sm font-medium">Uploading files...</div>
                <div className="w-full bg-muted rounded-full h-2 mt-1">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {assets.map((asset) => (
          <Card key={asset.id} className="group overflow-hidden">
            <div className="aspect-square relative overflow-hidden bg-muted">
              <img
                src={asset.file_path}
                alt={asset.alt_text || asset.original_name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => copyToClipboard(asset.file_path)}
                  >
                    {copiedUrl === asset.file_path ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEditAsset(asset)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteAsset(asset.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {asset.mime_type.split('/')[1].toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(asset.file_size)}
                  </span>
                </div>
                <p className="text-sm font-medium truncate" title={asset.original_name}>
                  {asset.original_name}
                </p>
                {asset.alt_text && (
                  <p className="text-xs text-muted-foreground truncate" title={asset.alt_text}>
                    {asset.alt_text}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {new Date(asset.created_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        {assets.length === 0 && !isUploading && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No media assets yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Upload your first images to get started with your media library.
              </p>
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Images
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Media Asset</DialogTitle>
            <DialogDescription>
              Update the alt text and tags for this media asset.
            </DialogDescription>
          </DialogHeader>

          {editingAsset && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <img
                  src={editingAsset.file_path}
                  alt={editingAsset.alt_text || editingAsset.original_name}
                  className="max-w-full max-h-48 object-contain rounded"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="filename">Filename</Label>
                  <Input
                    id="filename"
                    value={editingAsset.original_name}
                    disabled
                  />
                </div>

                <div>
                  <Label htmlFor="alt_text">Alt Text</Label>
                  <Input
                    id="alt_text"
                    value={editingAsset.alt_text || ''}
                    onChange={(e) => setEditingAsset({ ...editingAsset, alt_text: e.target.value })}
                    placeholder="Describe the image for accessibility"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={editingAsset.tags.join(', ')}
                    onChange={(e) => setEditingAsset({
                      ...editingAsset,
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                    })}
                    placeholder="logo, hero, team, etc."
                  />
                </div>

                <div>
                  <Label>File URL</Label>
                  <div className="flex gap-2">
                    <Input value={editingAsset.file_path} readOnly />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(editingAsset.file_path)}
                    >
                      {copiedUrl === editingAsset.file_path ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveAsset}>
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
