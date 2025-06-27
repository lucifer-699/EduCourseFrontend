import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCourses } from "@/lib/data"
import { User, BookOpen, Clock, Award } from "lucide-react"

export default function ProfilePage() {
  const courses = getCourses()
  const completedCourses = courses.filter((course) => course.progress === 100)
  const inProgressCourses = courses.filter((course) => course.progress > 0 && course.progress < 100)
  const totalHours = courses.reduce((acc, course) => {
    return (
      acc +
      course.modules.reduce((moduleAcc, module) => {
        return (
          moduleAcc +
          module.lessons.reduce((lessonAcc, lesson) => {
            return lessonAcc + (lesson.duration || 0)
          }, 0)
        )
      }, 0)
    )
  }, 0)

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your learning profile and track progress</p>
        </div>
        <div className="hidden md:block">
          <SidebarTrigger />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">John Doe</h3>
                <p className="text-sm text-muted-foreground">Student</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Email:</strong> john.doe@example.com
              </p>
              <p className="text-sm">
                <strong>Joined:</strong> January 2024
              </p>
              <p className="text-sm">
                <strong>Last Active:</strong> Today
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedCourses.length}</div>
                <p className="text-xs text-muted-foreground">Out of {courses.length} total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inProgressCourses.length}</div>
                <p className="text-xs text-muted-foreground">Currently learning</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(totalHours / 60)}h</div>
                <p className="text-xs text-muted-foreground">Total content time</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{course.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-full bg-secondary rounded-full h-2 max-w-xs">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground min-w-[3rem]">{course.progress}%</span>
                    </div>
                  </div>
                  <Badge variant={course.progress === 100 ? "default" : "secondary"}>
                    {course.progress === 100 ? "Completed" : "In Progress"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
