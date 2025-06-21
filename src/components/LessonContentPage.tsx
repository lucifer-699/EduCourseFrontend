'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, ArrowRight, CheckCircle, PlayCircle, FileText, HelpCircle
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'text' | 'quiz';
  completed?: boolean;
}

interface Module {
  id: number;
  title: string;
  coverImage?: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  title: string;
  modules: Module[];
}

interface Props {
  courses: Course[];
}

const LessonContentPage = ({ courses }: Props) => {
  const router = useRouter();
  const { courseId, moduleId, lessonId } = useParams();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const course = courses.find(c => c.id === parseInt(courseId as string));
  const module = course?.modules.find(m => m.id === parseInt(moduleId as string));
  const lesson = module?.lessons.find(l => l.id === parseInt(lessonId as string));

  if (!course || !module || !lesson) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Lesson Not Found</h1>
          <Button onClick={() => router.push('/courses')} className="bg-blue-600 hover:bg-blue-700">
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  const currentLessonIndex = module.lessons.findIndex(l => l.id === lesson.id);
  const nextLesson = module.lessons[currentLessonIndex + 1];
  const prevLesson = module.lessons[currentLessonIndex - 1];

  const getTypeIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-5 h-5 text-blue-400" />;
      case 'text': return <FileText className="w-5 h-5 text-green-400" />;
      case 'quiz': return <HelpCircle className="w-5 h-5 text-purple-400" />;
      default: return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  const renderLessonContent = () => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center">
              <PlayCircle className="w-16 h-16 text-white mb-4 mx-auto" />
              <p className="text-white">Video: {lesson.title}</p>
              <p className="text-slate-400 text-sm mt-2">Duration: 15:30</p>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">{lesson.title}</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                Welcome to this comprehensive lesson on {lesson.title.toLowerCase()}.
              </p>
              <p>
                This is sample content for a text-based lesson. In a real implementation, this would contain rich content.
              </p>
              <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-blue-400 my-6">
                <h4 className="text-blue-400 font-semibold mb-2">Key Takeaway</h4>
                <p className="text-slate-300">
                  Practice the concepts covered in this lesson to reinforce understanding.
                </p>
              </div>
              <p>Continue reading and take notes as you progress.</p>
            </div>
          </div>
        );
      case 'quiz':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">
                What is the primary benefit of using React hooks?
              </h3>
              <div className="space-y-3">
                {[
                  'Better performance optimization',
                  'Simplified state management in functional components',
                  'Easier component styling',
                  'Automatic error handling',
                ].map((option, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="quiz-answer"
                      checked={selectedAnswer === index}
                      onChange={() => setSelectedAnswer(index)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-slate-300">{option}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6">
                <Button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={selectedAnswer === null || quizSubmitted}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Submit Answer
                </Button>
              </div>
              {quizSubmitted && (
                <div className="mt-4 p-4 bg-green-900 border border-green-600 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-semibold">Correct!</span>
                  </div>
                  <p className="text-slate-300 mt-2">
                    Hooks simplify state management in functional components.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <p className="text-slate-400">Content type not supported yet.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push(`/courses/${courseId}/modules/${moduleId}`)}
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Module
          </Button>

          <div className="flex items-center space-x-2">
            {getTypeIcon(lesson.type)}
            <Badge className={`${
              lesson.type === 'video' ? 'bg-blue-600' :
              lesson.type === 'text' ? 'bg-green-600' :
              'bg-purple-600'
            } text-white`}>
              {lesson.type}
            </Badge>
          </div>
        </div>

        {/* Lesson Info */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <span>{course.title}</span>
            <span>•</span>
            <span>{module.title}</span>
            <span>•</span>
            <span>Lesson {currentLessonIndex + 1} of {module.lessons.length}</span>
          </div>
        </div>

        {/* Content */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardContent className="p-8">
            {renderLessonContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {prevLesson ? (
            <Button
              variant="outline"
              onClick={() => router.push(`/courses/${courseId}/modules/${moduleId}/lessons/${prevLesson.id}`)}
              className="border-slate-600 text-slate-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: {prevLesson.title}
            </Button>
          ) : <div />}

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Complete
            </Button>

            {nextLesson && (
              <Button
                onClick={() => router.push(`/courses/${courseId}/modules/${moduleId}/lessons/${nextLesson.id}`)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next: {nextLesson.title}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonContentPage;
