import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Lesson } from "@/lib/data"
import { FileText, Play, FileImage, ExternalLink, HelpCircle, CheckCircle, Circle, Clock } from "lucide-react"

interface LessonCardProps {
  lesson: Lesson
}

const lessonTypeIcons = {
  text: FileText,
  video: Play,
  pdf: FileImage,
  embed: ExternalLink,
  quiz: HelpCircle,
}

const lessonTypeColors = {
  text: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  video: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  pdf: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  embed: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  quiz: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
}

export function LessonCard({ lesson }: LessonCardProps) {
  const Icon = lessonTypeIcons[lesson.type]
  const colorClass = lessonTypeColors[lesson.type]

  return (
    <Link href={`/lessons/${lesson.id}`}>
      <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${colorClass}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">{lesson.title}</h4>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {lesson.type}
                </Badge>
                {lesson.duration && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {lesson.duration}min
                  </div>
                )}
              </div>
            </div>
            <div>
              {lesson.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
