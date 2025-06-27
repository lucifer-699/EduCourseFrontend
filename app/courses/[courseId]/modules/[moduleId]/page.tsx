"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/progress-bar"
import { LessonCard } from "@/components/lesson-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { LessonCardSkeleton } from "@/components/loading-skeleton"
import { moduleApi, lessonApi, type Module, type Lesson, type ApiError } from "@/lib/api"
import { ArrowLeft, BookOpen, Clock } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

interface ModulePageProps {
  params: {
    courseId: string
    moduleId: string
  }
}

export default function ModulePage({ params }: ModulePageProps) {
  const [module, setModule] = useState<Module | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [lessonsLoading, setLessonsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lessonsError, setLessonsError] = useState<string | null>(null)
  const [moduleNotFound, setModuleNotFound] = useState(false)

  const fetchModule = async () => {
    try {
      setLoading(true)
      setError(null)
      setModuleNotFound(false)
      const data = await moduleApi.getModuleById(params.moduleId)
      setModule(data)
    } catch (err) {
      const apiError = err as ApiError
      if (apiError.status === 404) {
        setModuleNotFound(true)
      } else {
        setError(apiError.message || "Failed to load module")
      }
      console.error("Error fetching module:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchLessons = async () => {
    try {
      setLessonsLoading(true)
      setLessonsError(null)
      const data = await lessonApi.getLessonsByModuleId(params.moduleId)
      setLessons(data)
    } catch (err) {
      const apiError = err as ApiError
      setLessonsError(apiError.message || "Failed to load lessons")
      console.error("Error fetching lessons:", err)
    } finally {
      setLessonsLoading(false)
    }
  }

  useEffect(() => {
    fetchModule()
    fetchLessons()
  }, [params.moduleId])

  if (moduleNotFound) {
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

  if (error || !module) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-auto">
            <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
              <ErrorMessage title="Failed to Load Module" message={error || "Module not found"} onRetry={fetchModule} />
            </div>
          </main>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  const totalDuration = lessons.reduce((acc, lesson) => acc + (lesson.duration || 0), 0)

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href={`/courses/${params.courseId}`}>
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{module.title}</h1>
                  <p className="text-muted-foreground">{module.summary}</p>
                </div>
              </div>
              <div className="hidden md:block">
                <SidebarTrigger />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Module Progress</h2>
                  <ProgressBar progress={module.progress || 0} />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Lessons</h2>

                  {lessonsError && (
                    <ErrorMessage
                      title="Failed to Load Lessons"
                      message={lessonsError}
                      onRetry={fetchLessons}
                      className="mb-4"
                    />
                  )}

                  {lessonsLoading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <LessonCardSkeleton key={index} />
                      ))}
                    </div>
                  ) : lessons.length > 0 ? (
                    <div className="space-y-3">
                      {lessons.map((lesson) => (
                        <LessonCard key={lesson.id} lesson={lesson} />
                      ))}
                    </div>
                  ) : (
                    !lessonsError && (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No lessons available for this module yet.</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Module Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {module.completedLessons || 0}/{module.totalLessons || lessons.length} lessons completed
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {Math.round(totalDuration / 60)}h {totalDuration % 60}m total
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Lesson Types</h3>
                  <div className="space-y-2">
                    {["text", "video", "pdf", "embed", "quiz"].map((type) => {
                      const count = lessons.filter((lesson) => lesson.type === type).length
                      if (count === 0) return null
                      return (
                        <div key={type} className="flex items-center justify-between text-sm">
                          <span className="capitalize">{type}</span>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
