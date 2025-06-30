"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ContentRenderer } from "@/components/content-renderer"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { lessonApi, type Lesson, type ApiError } from "@/lib/api"
import { ArrowLeft, Clock } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

interface LessonPageProps {
  params: {
    lessonId: string
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lessonNotFound, setLessonNotFound] = useState(false)
  const [completing, setCompleting] = useState(false)

  const fetchLesson = async () => {
    try {
      setLoading(true)
      setError(null)
      setLessonNotFound(false)
      const data = await lessonApi.getLessonById(params.lessonId)
      setLesson(data)
    } catch (err) {
      const apiError = err as ApiError
      if (apiError.status === 404) {
        setLessonNotFound(true)
      } else {
        setError(apiError.message || "Failed to load lesson")
      }
      console.error("Error fetching lesson:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async () => {
    if (!lesson) return

    try {
      setCompleting(true)
      await lessonApi.markLessonComplete(lesson.id)
      // Update local state
      setLesson((prev) => (prev ? { ...prev, completed: true } : null))
    } catch (err) {
      const apiError = err as ApiError
      console.error("Error marking lesson complete:", err)
      // You could show a toast notification here
    } finally {
      setCompleting(false)
    }
  }

  useEffect(() => {
    fetchLesson()
  }, [params.lessonId])

  if (lessonNotFound) {
    notFound()
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-auto">
            <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            </div>
          </main>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  if (error || !lesson) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-auto">
            <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
              <ErrorMessage title="Failed to Load Lesson" message={error || "Lesson not found"} onRetry={fetchLesson} />
            </div>
          </main>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  // For navigation back to module, you might need to store this info
  // or make an additional API call to find the module
  const moduleId = lesson.moduleId || "unknown"
  const courseId = "unknown" // You might need to get this from the lesson or make another API call

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href={`/courses/${courseId}/modules/${moduleId}`}>
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="capitalize">
                      {lesson.type}
                    </Badge>
                    {lesson.duration && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {lesson.duration}min
                      </div>
                    )}
                    {lesson.completed && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <SidebarTrigger />
              </div>
            </div>

            <div className="max-w-4xl">
              <ContentRenderer lesson={lesson} onComplete={handleComplete} completing={completing} />
            </div>
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
