import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/progress-bar"
import type { Module } from "@/lib/data"
import { CheckCircle, Circle } from "lucide-react"

interface ModuleCardProps {
  module: Module
  courseId: string
}

export function ModuleCard({ module, courseId }: ModuleCardProps) {
  const isCompleted = module.progress === 100

  return (
    <Link href={`/courses/${courseId}/modules/${module.id}`}>
      <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{module.title}</h3>
              <p className="text-muted-foreground text-sm">{module.summary}</p>
            </div>
            <div className="ml-4">
              {isCompleted ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline">
              {module.completedLessons}/{module.totalLessons} lessons
            </Badge>
          </div>
          <ProgressBar progress={module.progress} showLabel={false} />
        </CardContent>
      </Card>
    </Link>
  )
}
