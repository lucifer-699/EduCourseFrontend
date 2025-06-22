'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Star, Menu, LogIn } from 'lucide-react';
import Image from 'next/image';

// Sample courses data moved to App.tsx, using subset for featured courses
const featuredCourses = [
  {
    id: 1,
    title: "React Development Mastery",
    description: "Master React from basics to advanced concepts",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    instructor: "John Doe",
    duration: "12 weeks",
    students: 1250,
    rating: 4.8,
    price: "$99",
    enrolled: true,
    progress: 65
  },
  {
    id: 2,
    title: "Python for Data Science", 
    description: "Complete guide to Python programming for data analysis",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
    instructor: "Jane Smith",
    duration: "8 weeks",
    students: 890,
    rating: 4.9,
    price: "$79",
    enrolled: false,
    progress: 0
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description: "Master the art of user interface and experience design", 
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
    instructor: "Alex Johnson",
    duration: "6 weeks", 
    students: 2100,
    rating: 4.7,
    price: "$129",
    enrolled: true,
    progress: 30
  }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">EduCourse</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-slate-300 hover:text-white transition-colors">
              Courses
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300" asChild>
                <Link href="/user/loginpage">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5 text-slate-300" />
            </Button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link href="/courses" className="text-slate-300 hover:text-white transition-colors py-2">
                Courses
              </Link>
              <Link href="/login" className="text-slate-300 hover:text-white transition-colors py-2">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const HeroSection = () => {
  const router = useRouter();
  
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Learn. Build. <span className="text-blue-400">Succeed.</span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Join thousands of students mastering cutting-edge technologies with our expertly crafted courses
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push('/courses')}>
            Explore Courses
          </Button>
          <Button size="lg" variant="outline" className="border-slate-600 text-slate-300">
            Watch Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeaturedCourses = () => {
  const router = useRouter();
  
  return (
    <div className="py-16 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Featured Courses</h2>
          <p className="text-slate-400">Start your learning journey with our most popular courses</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="bg-slate-700 border-slate-600 hover:bg-slate-600 transition-all duration-300 cursor-pointer group" 
                  onClick={() => router.push(`/courses/${course.id}`)}>
              <div className="relative overflow-hidden rounded-t-lg">
                <Image 
                  src={course.thumbnail} 
                  alt={course.title}
                  width={400}
                  height={192}
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
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-slate-600 text-slate-300" onClick={() => router.push('/courses')}>
            View All Courses
          </Button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <HeroSection />
      <FeaturedCourses />
    </div>
  );
};

export default Home;
