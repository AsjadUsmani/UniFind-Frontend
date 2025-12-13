"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories, buildings } from "@/lib/mock-data"
import { ArrowLeft, Upload, X } from "lucide-react"

export default function ReportPage() {
  const [reportType, setReportType] = useState<"lost" | "found">("lost")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages].slice(0, 4))
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    // Would redirect on success
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={true} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Report an Item</CardTitle>
              <CardDescription>
                Fill in the details below to report a lost or found item. The more details you provide, the better
                chances of matching.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Report Type */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Report Type</Label>
                  <RadioGroup
                    value={reportType}
                    onValueChange={(v) => setReportType(v as "lost" | "found")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lost" id="lost" />
                      <Label htmlFor="lost" className="font-normal cursor-pointer">
                        I lost an item
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="found" id="found" />
                      <Label htmlFor="found" className="font-normal cursor-pointer">
                        I found an item
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Item Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Item Details</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Item Title *</Label>
                      <Input id="title" placeholder="e.g., Black iPhone 15 Pro" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide a detailed description of the item including any identifying features, color, brand, etc."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                </div>

                {/* Location & Time */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Location & Time</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="building">Building *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select building" />
                        </SelectTrigger>
                        <SelectContent>
                          {buildings.map((building) => (
                            <SelectItem key={building} value={building}>
                              {building}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Specific Location</Label>
                      <Input id="location" placeholder="e.g., Room 201, Near entrance" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input type="date" id="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Approximate Time</Label>
                      <Input type="time" id="time" />
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Images (Optional)</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload up to 4 images of the item. Clear photos help with identification.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg border border-border overflow-hidden group"
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {images.length < 4 && (
                      <label className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Upload</span>
                        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                {/* Contact Preferences */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Contact Preferences</h3>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Additional Contact Info (Optional)</Label>
                    <Input id="contact" placeholder="Phone number or preferred contact method" />
                    <p className="text-xs text-muted-foreground">
                      Your registered email will be used as the primary contact. This is optional additional info.
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
