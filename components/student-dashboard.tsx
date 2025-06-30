"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getCourses } from "@/lib/data"
import { BookOpen, Clock, TrendingUp, Award, Play, CheckCircle } from "lucide-react"

export function StudentDashboard() {
  const courses = getCourses()
  const enrolledCourses = courses // In a real app, this would be filtered by enrollment
  const completedCourses = enrolledCourses.filter((course) => course.progress === 100)
  const inProgressCourses = enrolledCourses.filter((course) => course.progress > 0 && course.progress < 100)

  // Mock recent activity
  const recentActivity = [
    {
      id: "1",
      type: "lesson_completed",
      title: "What is React?",
      course: "Introduction to React",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "quiz_passed",
      title: "Props Quiz",
      course: "Introduction to React",
      timestamp: "1 day ago",
    },
    {
      id: "3",
      type: "module_completed",
      title: "Getting Started",
      course: "Introduction to React",
      timestamp: "2 days ago",
    },
  ]

  // Mock recommended lessons
  const recommendedLessons = [
    {
      id: "6",
      title: "Props Quiz",
      course: "Introduction to React",
      type: "quiz",
      duration: 10,
    },
    {
      id: "8",
      title: "Async/Await Syntax",
      course: "Advanced JavaScript",
      type: "video",
      duration: 25,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrolledCourses.length}</div>
            <p className="text-xs text-muted-foreground">Active enrollments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCourses.length}</div>
            <p className="text-xs text-muted-foreground">Courses finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCourses.length}</div>
            <p className="text-xs text-muted-foreground">Currently learning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Enrolled Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              My Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="space-y-3 p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                  </div>
                  <Badge variant={course.progress === 100 ? "default" : "secondary"}>{course.progress}%</Badge>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {course.completedModules}/{course.totalModules} modules
                  </span>
                  <Link href={`/courses/${course.id}`}>
                    <Button size="sm" variant="outline">
                      {course.progress === 0 ? "Start" : "Continue"}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === "lesson_completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {activity.type === "quiz_passed" && <Award className="h-5 w-5 text-blue-500" />}
                  {activity.type === "module_completed" && <BookOpen className="h-5 w-5 text-purple-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.course}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recommended Lessons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {recommendedLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center gap-3 p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0">
                  {lesson.type === "video" && <Play className="h-5 w-5 text-red-500" />}
                  {lesson.type === "quiz" && <Award className="h-5 w-5 text-orange-500" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{lesson.title}</h4>
                  <p className="text-sm text-muted-foreground">{lesson.course}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {lesson.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{lesson.duration}min</span>
                  </div>
                </div>
                <Link href={`/lessons/${lesson.id}`}>
                  <Button size="sm">Start</Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
