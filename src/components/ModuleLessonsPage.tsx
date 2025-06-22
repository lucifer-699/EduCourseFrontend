'use client';

import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, PlayCircle, FileText, HelpCircle, CheckCircle, Clock } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'text' | 'quiz';
  completed?: boolean;
}

interface ModuleType {
  id: number;
  title: string;
  summary?: string;
  coverImage?: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  title: string;
  modules: ModuleType[];
}

interface Props {
  courses: Course[];
}

const ModuleLessonsPage = ({ courses }: Props) => {
  const router = useRouter();
  const { courseId, moduleId } = useParams();

  const course = courses.find((c) => c.id === parseInt(courseId as string));
  const module = course?.modules.find((m) => m.id === parseInt(moduleId as string));

  if (!course || !module) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Module Not Found</h1>
          <Button onClick={() => router.push('/courses')} className="bg-blue-600 hover:bg-blue-700">
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-5 h-5 text-blue-400" />;
      case 'text': return <FileText className="w-5 h-5 text-green-400" />;
      case 'quiz': return <HelpCircle className="w-5 h-5 text-purple-400" />;
      default: return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  const getTypeBadge = (type: Lesson['type']) => {
    const colors = {
      video: 'bg-blue-600',
      text: 'bg-green-600',
      quiz: 'bg-purple-600'
    };
    return colors[type] || 'bg-slate-600';
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push(`/courses/${courseId}`)}
          className="text-slate-300 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>

        {/* Module Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {module.coverImage && (
              <img
                src={module.coverImage}
                alt={module.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-white">{module.title}</h1>
              <p className="text-slate-400">{course.title}</p>
            </div>
          </div>
          {module.summary && <p className="text-lg text-slate-300 mb-4">{module.summary}</p>}

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {module.lessons.length} lessons
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              {module.lessons.filter((lesson) => lesson.completed).length} completed
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Lessons</h2>

          {module.lessons.map((lesson, index) => (
            <Card
              key={lesson.id}
              className={`bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 cursor-pointer group ${
                lesson.completed ? 'border-green-600' : ''
              }`}
              onClick={() => router.push(`/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        lesson.completed ? 'bg-green-600 text-white' : 'bg-slate-600 text-slate-300'
                      }`}>
                        {lesson.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getTypeIcon(lesson.type)}
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {lesson.title}
                        </h3>
                        <Badge className={`${getTypeBadge(lesson.type)} text-white text-xs`}>
                          {lesson.type}
                        </Badge>
                      </div>

                      <p className="text-slate-400 text-sm">
                        {lesson.completed ? 'Completed' : 'Not started'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {lesson.completed && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                    <Button
                      size="sm"
                      className={`${lesson.completed ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                      {lesson.completed ? 'Review' : 'Start'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Module Summary */}
        <Card className="mt-8 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Module Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-300">
                {module.lessons.filter((lesson) => lesson.completed).length} of {module.lessons.length} lessons completed
              </span>
              <span className="text-blue-400 font-semibold">
                {Math.round((module.lessons.filter((lesson) => lesson.completed).length / module.lessons.length) * 100)}%
              </span>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300"
                onClick={() => router.push(`/courses/${courseId}`)}
              >
                Back to Course
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
