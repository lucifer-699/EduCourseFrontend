"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/progress-bar"
import { ModuleCard } from "@/components/module-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { ModuleCardSkeleton } from "@/components/loading-skeleton"
import { courseApi, moduleApi, type Course, type Module, type ApiError } from "@/lib/api"
import { ArrowLeft, BookOpen, Clock, Users } from "lucide-react"

interface CoursePageProps {
  params: {
    courseId: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const [course, setCourse] = useState<Course | null>(null)
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [modulesLoading, setModulesLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modulesError, setModulesError] = useState<string | null>(null)
  const [courseNotFound, setCourseNotFound] = useState(false)

  const fetchCourse = async () => {
    try {
      setLoading(true)
      setError(null)
      setCourseNotFound(false)
      const data = await courseApi.getCourseById(params.courseId)
      setCourse(data)
    } catch (err) {
      const apiError = err as ApiError
      if (apiError.status === 404) {
        setCourseNotFound(true)
      } else {
        setError(apiError.message || "Failed to load course")
      }
      console.error("Error fetching course:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchModules = async () => {
    try {
      setModulesLoading(true)
      setModulesError(null)
      const data = await moduleApi.getModulesByCourseId(params.courseId)
      setModules(data)
    } catch (err) {
      const apiError = err as ApiError
      setModulesError(apiError.message || "Failed to load modules")
      console.error("Error fetching modules:", err)
    } finally {
      setModulesLoading(false)
    }
  }

  useEffect(() => {
    fetchCourse()
    fetchModules()
  }, [params.courseId])

  if (courseNotFound) {
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

  if (error || !course) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-auto">
            <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
              <ErrorMessage title="Failed to Load Course" message={error || "Course not found"} onRetry={fetchCourse} />
            </div>
          </main>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  const totalLessons = modules.reduce((acc, module) => acc + (module.totalLessons || 0), 0)
  const completedLessons = modules.reduce((acc, module) => acc + (module.completedLessons || 0), 0)
  const totalDuration = modules.reduce((acc, module) => {
    return (
      acc +
      (module.lessons?.reduce((lessonAcc, lesson) => {
        return lessonAcc + (lesson.duration || 0)
      }, 0) || 0)
    )
  }, 0)

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/courses">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>
              </div>
              <div className="hidden md:block">
                <SidebarTrigger />
              </div>
            </div>

            <div className="relative aspect-[2/1] md:aspect-[3/1] rounded-lg overflow-hidden">
              <Image
                src={course.coverImage || "/placeholder.svg?height=400&width=800"}
                alt={course.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Course Progress</h2>
                  <ProgressBar progress={course.progress || 0} />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Modules</h2>

                  {modulesError && (
                    <ErrorMessage
                      title="Failed to Load Modules"
                      message={modulesError}
                      onRetry={fetchModules}
                      className="mb-4"
                    />
                  )}

                  {modulesLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <ModuleCardSkeleton key={index} />
                      ))}
                    </div>
                  ) : modules.length > 0 ? (
                    <div className="space-y-4">
                      {modules.map((module) => (
                        <ModuleCard key={module.id} module={module} courseId={course.id} />
                      ))}
                    </div>
                  ) : (
                    !modulesError && (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No modules available for this course yet.</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Course Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {completedLessons}/{totalLessons} lessons completed
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {Math.round(totalDuration / 60)}h {totalDuration % 60}m total
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{modules.length} modules</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Module Progress</h3>
                  {modules.map((module) => (
                    <div key={module.id} className="flex items-center justify-between text-sm">
                      <span className="truncate">{module.title}</span>
                      <Badge variant="outline">{module.progress || 0}%</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
