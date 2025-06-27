"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function CreateCoursePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    coverImage: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    console.log("Creating course:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <SidebarProvider>
        <AppSidebar />

        <main className="flex-1 overflow-auto">
          {/* ---------------- existing page content START ---------------- */}
          <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/courses">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Create Course</h1>
                  <p className="text-muted-foreground">Add a new course to the platform</p>
                </div>
              </div>
              <div className="hidden md:block">
                <SidebarTrigger />
              </div>
            </div>

            <div className="max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Course Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Enter course title"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Enter course description"
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="thumbnail">Thumbnail Image</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="thumbnail"
                          value={formData.thumbnail}
                          onChange={(e) => handleInputChange("thumbnail", e.target.value)}
                          placeholder="Enter thumbnail URL or upload"
                        />
                        <Button type="button" variant="outline" size="icon">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coverImage">Cover Image</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="coverImage"
                          value={formData.coverImage}
                          onChange={(e) => handleInputChange("coverImage", e.target.value)}
                          placeholder="Enter cover image URL or upload"
                        />
                        <Button type="button" variant="outline" size="icon">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit">Create Course</Button>
                      <Button type="button" variant="outline">
                        Save as Draft
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* ---------------- existing page content END ---------------- */}
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
