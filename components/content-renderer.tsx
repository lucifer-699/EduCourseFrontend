"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { Lesson } from "@/lib/data"
import { Play, FileText, ExternalLink, HelpCircle } from "lucide-react"

interface ContentRendererProps {
  lesson: Lesson
  onComplete?: () => void
  completing?: boolean
}

export function ContentRenderer({ lesson, onComplete, completing = false }: ContentRendererProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleQuizSubmit = () => {
    setShowResult(true)
    if (onComplete) onComplete()
  }

  const renderContent = () => {
    switch (lesson.type) {
      case "text":
        return (
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed">{lesson.content.text}</p>
          </div>
        )

      case "video":
        return (
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Video Player</p>
                <p className="text-xs text-muted-foreground mt-1">{lesson.content.videoUrl}</p>
              </div>
            </div>
            {lesson.content.transcript && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Transcript</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{lesson.content.transcript}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )

      case "pdf":
        return (
          <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">PDF Viewer</p>
              <p className="text-xs text-muted-foreground mt-1">{lesson.content.pdfUrl}</p>
            </div>
          </div>
        )

      case "embed":
        return (
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ExternalLink className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Embedded Content</p>
              <p className="text-xs text-muted-foreground mt-1">{lesson.content.embedUrl}</p>
            </div>
          </div>
        )

      case "quiz":
        return (
          <div className="space-y-6">
            {lesson.content.questions?.map((question: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Question {index + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-medium">{question.question}</p>
                  <div className="space-y-2">
                    {question.options?.map((option: string, optionIndex: number) => (
                      <label key={optionIndex} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={optionIndex}
                          checked={selectedAnswer === optionIndex}
                          onChange={() => setSelectedAnswer(optionIndex)}
                          className="text-primary"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                  {showResult && (
                    <div className="mt-4">
                      {selectedAnswer === question.correct ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Correct!
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          Incorrect. The correct answer is: {question.options?.[question.correct]}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {!showResult && (
              <Button onClick={handleQuizSubmit} disabled={selectedAnswer === null} className="w-full">
                Submit Quiz
              </Button>
            )}
          </div>
        )

      default:
        return <p>Unsupported content type</p>
    }
  }

  return (
    <div className="space-y-6">
      {renderContent()}
      {lesson.type !== "quiz" && (
        <div className="flex justify-end">
          <Button onClick={onComplete} disabled={completing}>
            {completing ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Marking Complete...
              </>
            ) : (
              "Mark as Complete"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
