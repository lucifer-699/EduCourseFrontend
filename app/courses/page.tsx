"use client"

import { useState, useEffect } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ProtectedRoute } from "@/components/protected-route"
import { CourseCard } from "@/components/course-card"
import { ErrorMessage } from "@/components/error-message"
import { CourseCardSkeleton } from "@/components/loading-skeleton"
import { courseApi, type Course, type ApiError } from "@/lib/api"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await courseApi.getAllCourses()
      setCourses(data)
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError.message || "Failed to load courses")
      console.error("Error fetching courses:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
                <p className="text-muted-foreground">Explore and continue your learning journey.</p>
              </div>
              <div className="hidden md:block">
                <SidebarTrigger />
              </div>
            </div>

            {error && (
              <ErrorMessage title="Failed to Load Courses" message={error} onRetry={fetchCourses} className="mb-6" />
            )}

            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CourseCardSkeleton key={index} />
                ))}
              </div>
            ) : courses.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              !error && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No courses available at the moment.</p>
                  <p className="text-muted-foreground text-sm mt-2">Check back later for new content!</p>
                </div>
              )
            )}
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
