'use client';

import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, Users, Star, PlayCircle, BookOpen, CheckCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface Lesson {
  completed: boolean;
}

interface Module {
  id: number;
  title: string;
  summary: string;
  coverImage: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  price: string;
  thumbnail: string;
  progress: number;
  enrolled: boolean;
  instructor: string;
  modules: Module[];
}

interface Props {
  courses: Course[];
}

const CourseDetailPage = ({ courses }: Props) => {
  const router = useRouter();
  const params = useParams();
  const courseId = useMemo(() => Number(params?.courseId), [params]);

  const [course, setCourse] = useState<Course | undefined>(undefined);

  useEffect(() => {
    if (courses && courseId) {
      const foundCourse = courses.find((c) => c.id === courseId);
      setCourse(foundCourse);
    }
  }, [courseId, courses]);

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Course Not Found</h1>
          <Button onClick={() => router.push('/courses')} className="bg-blue-600 hover:bg-blue-700">
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce((acc, module) =>
    acc + module.lessons.filter((lesson) => lesson.completed).length, 0
  );

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <Button 
          variant="ghost" 
          onClick={() => router.push('/courses')}
          className="text-slate-300 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              {course.enrolled && (
                <Badge className="bg-green-600 text-white mb-4">Enrolled</Badge>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-lg text-slate-300 mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {course.students} students
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                  {course.rating} rating
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {totalLessons} lessons
                </div>
              </div>

              <p className="text-slate-300">
                <span className="font-semibold">Instructor:</span> {course.instructor}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700 sticky top-8">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white opacity-80" />
                </div>
              </div>

              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-white">{course.price}</span>
                </div>

                {course.enrolled ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Progress</span>
                        <span className="text-blue-400">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-3" />
                      <p className="text-xs text-slate-400 mt-2">
                        {completedLessons} of {totalLessons} lessons completed
                      </p>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Continue Learning
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Enroll Now
                    </Button>
                    <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                      Add to Wishlist
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Course Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.modules.map((module, index) => (
              <Card 
                key={module.id} 
                className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 cursor-pointer group"
                onClick={() => router.push(`/courses/${courseId}/modules/${module.id}`)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={module.coverImage} 
                    alt={module.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-600 text-white">
                      Module {index + 1}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {module.summary}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span>{module.lessons.length} lessons</span>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                      {module.lessons.filter((lesson) => lesson.completed).length} completed
                    </div>
                  </div>

                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    {course.enrolled ? 'Start Module' : 'Preview'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
