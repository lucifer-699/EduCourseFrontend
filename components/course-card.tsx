import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/progress-bar"
import type { Course } from "@/lib/data"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <CardHeader className="p-0">
          <div className="relative aspect-video">
            <Image src={course.thumbnail || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">
              {course.completedModules}/{course.totalModules} modules
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <ProgressBar progress={course.progress} showLabel={false} />
        </CardFooter>
      </Card>
    </Link>
  )
}
