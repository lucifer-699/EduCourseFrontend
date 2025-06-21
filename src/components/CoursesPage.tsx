'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Clock, Users, Star } from 'lucide-react';

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
}

interface Props {
  courses: Course[];
}

const CoursesPage = ({ courses }: Props) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'enrolled' | 'available'>('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterBy === 'all' ||
      (filterBy === 'enrolled' && course.enrolled) ||
      (filterBy === 'available' && !course.enrolled);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">All Courses</h1>
          <p className="text-slate-400">Discover your next learning adventure</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterBy === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterBy('all')}
              className={filterBy === 'all' ? 'bg-blue-600' : 'border-slate-600 text-slate-300'}
            >
              All
            </Button>
            <Button
              variant={filterBy === 'enrolled' ? 'default' : 'outline'}
              onClick={() => setFilterBy('enrolled')}
              className={filterBy === 'enrolled' ? 'bg-blue-600' : 'border-slate-600 text-slate-300'}
            >
              Enrolled
            </Button>
            <Button
              variant={filterBy === 'available' ? 'default' : 'outline'}
              onClick={() => setFilterBy('available')}
              className={filterBy === 'available' ? 'bg-blue-600' : 'border-slate-600 text-slate-300'}
            >
              Available
            </Button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 cursor-pointer group"
              onClick={() => router.push(`/courses/${course.id}`)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {course.enrolled && (
                  <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                    Enrolled
                  </Badge>
                )}
              </div>

              <CardHeader>
                <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-slate-300">
                  {course.description}
                </CardDescription>
                <p className="text-sm text-slate-400">by {course.instructor}</p>
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

                {course.enrolled && course.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Progress</span>
                      <span className="text-blue-400">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">{course.price}</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    {course.enrolled ? 'Continue' : 'Enroll Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
