"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Image as ImageIcon, Upload, X } from "lucide-react"
import type { MediaAsset } from "@/lib/types"

interface MediaPickerProps {
  value?: string
  onSelect: (url: string) => void
  trigger?: React.ReactNode
}

export function MediaPicker({ value, onSelect, trigger }: MediaPickerProps) {
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (isOpen) {
      fetchMediaAssets()
    }
  }, [isOpen])

  const fetchMediaAssets = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/media')
      const data = await response.json()
      if (data.success) {
        setAssets(data.data)
      }
    } catch (error) {
      console.error('Error fetching media assets:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

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
      }
    } catch (error) {
      console.error('Error uploading files:', error)
    } finally {
      setIsUploading(false)
      // Reset file input
      event.target.value = ''
    }
  }

  const filteredAssets = assets.filter(asset =>
    asset.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.alt_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleSelect = (asset: MediaAsset) => {
    onSelect(asset.file_path)
    setIsOpen(false)
  }

  const defaultTrigger = (
    <Button type="button" variant="outline" size="sm">
      {value ? "Change Image" : "Select Image"}
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Select Media Asset</DialogTitle>
          <DialogDescription>
            Choose an image from your media library or upload a new one.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Section */}
          <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="media-upload"
            />
            <Button
              onClick={() => document.getElementById('media-upload')?.click()}
              disabled={isUploading}
              className="flex-shrink-0"
            >
              {isUploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Upload New
            </Button>

            <div className="flex-1">
              <Label htmlFor="search">Search images</Label>
              <Input
                id="search"
                placeholder="Search by filename, alt text, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="col-span-full flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading media...</span>
              </div>
            ) : filteredAssets.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-8">
                <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No media found</h3>
                <p className="text-muted-foreground text-center">
                  {searchTerm ? "Try adjusting your search terms." : "Upload some images to get started."}
                </p>
              </div>
            ) : (
              filteredAssets.map((asset) => (
                <Card
                  key={asset.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    value === asset.file_path ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleSelect(asset)}
                >
                  <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted">
                    <img
                      src={asset.file_path}
                      alt={asset.alt_text || asset.original_name}
                      className="w-full h-full object-cover"
                    />
                    {value === asset.file_path && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          ✓
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs font-medium truncate" title={asset.original_name}>
                      {asset.original_name}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs">
                        {asset.mime_type.split('/')[1].toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(asset.file_size / 1024)}KB
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
