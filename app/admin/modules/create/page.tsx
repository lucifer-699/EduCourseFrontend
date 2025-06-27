"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCourses } from "@/lib/data"
import { ArrowLeft } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function CreateModulePage() {
  const courses = getCourses()
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    courseId: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    console.log("Creating module:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <SidebarProvider>
        <AppSidebar />

        <main className="flex-1 overflow-auto">
          {/* -------- existing content START -------- */}
          <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/courses">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Create Module</h1>
                  <p className="text-muted-foreground">Add a new module to a course</p>
                </div>
              </div>
              <div className="hidden md:block">
                <SidebarTrigger />
              </div>
            </div>

            <div className="max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Module Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="courseId">Select Course</Label>
                      <Select value={formData.courseId} onValueChange={(value) => handleInputChange("courseId", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Module Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Enter module title"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="summary">Summary</Label>
                      <Textarea
                        id="summary"
                        value={formData.summary}
                        onChange={(e) => handleInputChange("summary", e.target.value)}
                        placeholder="Enter module summary"
                        rows={4}
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit">Create Module</Button>
                      <Button type="button" variant="outline">
                        Save as Draft
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* -------- existing content END -------- */}
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
