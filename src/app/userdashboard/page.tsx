'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Users, Star, PlayCircle } from 'lucide-react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('enrolled');
  const router = useRouter();

  // Hardcoded data - would normally come from an API
  const enrolledCourses = [
    {
      id: 1,
      title: "React Development Mastery",
      description: "Master React from basics to advanced concepts",
      thumbnail: "/react-course.jpg",
      instructor: "John Doe",
      duration: "12 weeks",
      progress: 65,
      enrolled: true
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      description: "Master the art of user interface and experience design",
      thumbnail: "/uiux-course.jpg",
      instructor: "Alex Johnson",
      duration: "6 weeks",
      progress: 30,
      enrolled: true
    }
  ];

  const availableCourses = [
    {
      id: 2,
      title: "Python for Data Science",
      description: "Complete guide to Python programming for data analysis",
      thumbnail: "/python-course.jpg",
      instructor: "Jane Smith",
      duration: "8 weeks",
      students: 890,
      rating: 4.9,
      price: "$79"
    },
    {
      id: 4,
      title: "JavaScript Fundamentals",
      description: "Learn JavaScript from scratch to advanced concepts",
      thumbnail: "/js-course.jpg",
      instructor: "Mike Wilson",
      duration: "10 weeks",
      students: 1450,
      rating: 4.6,
      price: "$89"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">My Learning Dashboard</h1>
              <p className="text-slate-400 mt-2">Continue your learning journey</p>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold text-white">EduCourse</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="enrolled" className="data-[state=active]:bg-blue-600">My Courses</TabsTrigger>
            <TabsTrigger value="explore" className="data-[state=active]:bg-blue-600">Explore Courses</TabsTrigger>
          </TabsList>

          {/* Enrolled Courses */}
          <TabsContent value="enrolled" className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Enrolled Courses</h2>
              <p className="text-slate-400">Continue learning where you left off</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                      Enrolled
                    </Badge>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-white">{course.title}</CardTitle>
                    <CardDescription className="text-slate-300">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>Instructor: {course.instructor}</span>
                      <span>{course.duration}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Progress</span>
                        <span className="text-blue-400">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => router.push(`/courses/${course.id}`)}
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Explore Courses */}
          <TabsContent value="explore" className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Explore New Courses</h2>
              <p className="text-slate-400">Discover courses to expand your skills</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 cursor-pointer"
                  onClick={() => router.push(`/courses/${course.id}`)}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  <CardHeader>
                    <CardTitle className="text-white">{course.title}</CardTitle>
                    <CardDescription className="text-slate-300">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {course.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">{course.price}</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;