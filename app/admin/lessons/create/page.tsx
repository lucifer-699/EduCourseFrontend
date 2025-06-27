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
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function CreateLessonPage() {
  const courses = getCourses()
  const [formData, setFormData] = useState({
    title: "",
    type: "text" as "text" | "video" | "pdf" | "embed" | "quiz",
    courseId: "",
    moduleId: "",
    duration: "",
    content: {
      text: "",
      videoUrl: "",
      pdfUrl: "",
      embedUrl: "",
      questions: [{ question: "", options: ["", "", "", ""], correct: 0 }],
    },
  })

  const selectedCourse = courses.find((c) => c.id === formData.courseId)
  const modules = selectedCourse?.modules || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    console.log("Creating lesson:", formData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleContentChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      content: { ...prev.content, [field]: value },
    }))
  }

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        questions: [...prev.content.questions, { question: "", options: ["", "", "", ""], correct: 0 }],
      },
    }))
  }

  const removeQuestion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        questions: prev.content.questions.filter((_, i) => i !== index),
      },
    }))
  }

  const updateQuestion = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        questions: prev.content.questions.map((q, i) => (i === index ? { ...q, [field]: value } : q)),
      },
    }))
  }

  const renderContentFields = () => {
    switch (formData.type) {
      case "text":
        return (
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content.text}
              onChange={(e) => handleContentChange("text", e.target.value)}
              placeholder="Enter lesson content"
              rows={8}
              required
            />
          </div>
        )

      case "video":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                value={formData.content.videoUrl}
                onChange={(e) => handleContentChange("videoUrl", e.target.value)}
                placeholder="Enter video URL"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transcript">Transcript (Optional)</Label>
              <Textarea
                id="transcript"
                value={formData.content.transcript || ""}
                onChange={(e) => handleContentChange("transcript", e.target.value)}
                placeholder="Enter video transcript"
                rows={4}
              />
            </div>
          </div>
        )

      case "pdf":
        return (
          <div className="space-y-2">
            <Label htmlFor="pdfUrl">PDF URL</Label>
            <Input
              id="pdfUrl"
              value={formData.content.pdfUrl}
              onChange={(e) => handleContentChange("pdfUrl", e.target.value)}
              placeholder="Enter PDF URL"
              required
            />
          </div>
        )

      case "embed":
        return (
          <div className="space-y-2">
            <Label htmlFor="embedUrl">Embed URL</Label>
            <Input
              id="embedUrl"
              value={formData.content.embedUrl}
              onChange={(e) => handleContentChange("embedUrl", e.target.value)}
              placeholder="Enter embed URL"
              required
            />
          </div>
        )

      case "quiz":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Quiz Questions</Label>
              <Button type="button" onClick={addQuestion} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Question
              </Button>
            </div>
            {formData.content.questions.map((question, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Question {index + 1}</CardTitle>
                    {formData.content.questions.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    value={question.question}
                    onChange={(e) => updateQuestion(index, "question", e.target.value)}
                    placeholder="Enter question"
                    required
                  />
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...question.options]
                          newOptions[optionIndex] = e.target.value
                          updateQuestion(index, "options", newOptions)
                        }}
                        placeholder={`Option ${optionIndex + 1}`}
                        required
                      />
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={question.correct === optionIndex}
                        onChange={() => updateQuestion(index, "correct", optionIndex)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )

      default:
        return null
    }
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
                  <h1 className="text-3xl font-bold tracking-tight">Create Lesson</h1>
                  <p className="text-muted-foreground">Add a new lesson to a module</p>
                </div>
              </div>
              <div className="hidden md:block">
                <SidebarTrigger />
              </div>
            </div>

            <div className="max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="courseId">Select Course</Label>
                        <Select
                          value={formData.courseId}
                          onValueChange={(value) => handleInputChange("courseId", value)}
                        >
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
                        <Label htmlFor="moduleId">Select Module</Label>
                        <Select
                          value={formData.moduleId}
                          onValueChange={(value) => handleInputChange("moduleId", value)}
                          disabled={!formData.courseId}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a module" />
                          </SelectTrigger>
                          <SelectContent>
                            {modules.map((module) => (
                              <SelectItem key={module.id} value={module.id}>
                                {module.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Lesson Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Enter lesson title"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Lesson Type</Label>
                        <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="embed">Embed</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={formData.duration}
                          onChange={(e) => handleInputChange("duration", e.target.value)}
                          placeholder="Enter duration"
                        />
                      </div>
                    </div>

                    {renderContentFields()}

                    <div className="flex gap-4">
                      <Button type="submit">Create Lesson</Button>
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
