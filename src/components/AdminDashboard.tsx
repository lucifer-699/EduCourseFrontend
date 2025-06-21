'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, BookOpen, FileText, PlayCircle, Users, BarChart3, UserPlus } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isCreateModuleOpen, setIsCreateModuleOpen] = useState(false);
  const [isCreateLessonOpen, setIsCreateLessonOpen] = useState(false);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [selectedCourseForModules, setSelectedCourseForModules] = useState('');
  const [selectedCourseForLessons, setSelectedCourseForLessons] = useState('');
  const [selectedModuleForLessons, setSelectedModuleForLessons] = useState('');

  // Sample admin data
  const stats = {
    totalCourses: 12,
    totalStudents: 4250,
    totalLessons: 156,
    completionRate: 78
  };

  const courses = [
    { id: 1, title: "React Development Mastery", students: 1250, status: "Published", modules: 8 },
    { id: 2, title: "Python for Data Science", students: 890, status: "Published", modules: 6 },
    { id: 3, title: "UI/UX Design Principles", students: 2100, status: "Draft", modules: 5 }
  ];

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active", enrolled: 3 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", enrolled: 2 },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "Admin", status: "Active", enrolled: 0 }
  ];

  // Sample modules data
  const allModules = [
    { id: 1, courseId: 1, title: "React Fundamentals", summary: "Learn the basics of React components and JSX", lessons: 8, enrolled: 1200, progress: 75 },
    { id: 2, courseId: 1, title: "Advanced React Patterns", summary: "Dive into hooks, context, and performance optimization", lessons: 6, enrolled: 950, progress: 60 },
    { id: 3, courseId: 1, title: "React Testing", summary: "Learn to test React components effectively", lessons: 5, enrolled: 800, progress: 40 },
    { id: 4, courseId: 2, title: "Python Basics", summary: "Learn Python syntax and fundamental concepts", lessons: 10, enrolled: 890, progress: 85 },
    { id: 5, courseId: 2, title: "Data Analysis with Pandas", summary: "Master data manipulation with Pandas", lessons: 8, enrolled: 750, progress: 55 },
    { id: 6, courseId: 3, title: "Design Fundamentals", summary: "Core principles of good design", lessons: 7, enrolled: 2100, progress: 70 }
  ];

  // Sample lessons data
  const allLessons = [
    { id: 1, moduleId: 1, title: "Introduction to React", type: "video", enrolled: 1200, completed: 900, duration: "15 min" },
    { id: 2, moduleId: 1, title: "JSX and Components", type: "text", enrolled: 1200, completed: 850, duration: "20 min" },
    { id: 3, moduleId: 1, title: "Props and State", type: "video", enrolled: 1200, completed: 750, duration: "25 min" },
    { id: 4, moduleId: 2, title: "React Hooks Deep Dive", type: "video", enrolled: 950, completed: 600, duration: "30 min" },
    { id: 5, moduleId: 2, title: "Context API", type: "text", enrolled: 950, completed: 550, duration: "18 min" },
    { id: 6, moduleId: 4, title: "Python Variables", type: "video", enrolled: 890, completed: 780, duration: "12 min" },
    { id: 7, moduleId: 4, title: "Data Types", type: "text", enrolled: 890, completed: 720, duration: "15 min" }
  ];

  // Filter modules based on selected course
  const filteredModules = selectedCourseForModules 
    ? allModules.filter(module => module.courseId === parseInt(selectedCourseForModules))
    : [];

  // Filter lessons based on selected course and module
  const availableModulesForLessons = selectedCourseForLessons 
    ? allModules.filter(module => module.courseId === parseInt(selectedCourseForLessons))
    : [];

  const filteredLessons = selectedModuleForLessons 
    ? allLessons.filter(lesson => lesson.moduleId === parseInt(selectedModuleForLessons))
    : [];

  const CreateCourseForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="course-title">Course Title</Label>
        <Input id="course-title" placeholder="Enter course title" />
      </div>
      <div>
        <Label htmlFor="course-description">Description</Label>
        <Textarea id="course-description" placeholder="Enter course description" />
      </div>
      <div>
        <Label htmlFor="course-price">Price</Label>
        <Input id="course-price" placeholder="$99" />
      </div>
      <div>
        <Label htmlFor="course-duration">Duration</Label>
        <Input id="course-duration" placeholder="8 weeks" />
      </div>
      <div>
        <Label htmlFor="course-thumbnail">Thumbnail URL</Label>
        <Input id="course-thumbnail" placeholder="https://example.com/image.jpg" />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setIsCreateCourseOpen(false)}>
          Cancel
        </Button>
        <Button>Create Course</Button>
      </div>
    </div>
  );

  const CreateModuleForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="module-course">Select Course</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose a course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">React Development Mastery</SelectItem>
            <SelectItem value="2">Python for Data Science</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="module-title">Module Title</Label>
        <Input id="module-title" placeholder="Enter module title" />
      </div>
      <div>
        <Label htmlFor="module-summary">Summary</Label>
        <Textarea id="module-summary" placeholder="Enter module summary" />
      </div>
      <div>
        <Label htmlFor="module-cover">Cover Image URL</Label>
        <Input id="module-cover" placeholder="https://example.com/image.jpg" />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setIsCreateModuleOpen(false)}>
          Cancel
        </Button>
        <Button>Create Module</Button>
      </div>
    </div>
  );

  const CreateLessonForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="lesson-module">Select Module</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose a module" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">React Fundamentals</SelectItem>
            <SelectItem value="2">Advanced React Patterns</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="lesson-title">Lesson Title</Label>
        <Input id="lesson-title" placeholder="Enter lesson title" />
      </div>
      <div>
        <Label htmlFor="lesson-type">Lesson Type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose lesson type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="quiz">Quiz</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="lesson-content">Content</Label>
        <Textarea id="lesson-content" placeholder="Enter lesson content or URL" />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setIsCreateLessonOpen(false)}>
          Cancel
        </Button>
        <Button>Create Lesson</Button>
      </div>
    </div>
  );

  const CreateUserForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="user-name">Full Name</Label>
        <Input id="user-name" placeholder="Enter full name" />
      </div>
      <div>
        <Label htmlFor="user-email">Email</Label>
        <Input id="user-email" type="email" placeholder="Enter email address" />
      </div>
      <div>
        <Label htmlFor="user-password">Password</Label>
        <Input id="user-password" type="password" placeholder="Enter password" />
      </div>
      <div>
        <Label htmlFor="user-role">Role</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select user role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
          Cancel
        </Button>
        <Button>Create User</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your courses, modules, lessons, and users</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCourses}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalLessons}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completionRate}%</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>New student enrolled in React Development Mastery</span>
                  <span className="text-muted-foreground text-sm">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Course "Python for Data Science" published</span>
                  <span className="text-muted-foreground text-sm">1 day ago</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>New lesson added to UI/UX Design module</span>
                  <span className="text-muted-foreground text-sm">3 days ago</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Courses</h2>
              <Dialog open={isCreateCourseOpen} onOpenChange={setIsCreateCourseOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Course
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Course</DialogTitle>
                    <DialogDescription>
                      Add a new course to your platform
                    </DialogDescription>
                  </DialogHeader>
                  <CreateCourseForm />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{course.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{course.students} students</span>
                          <span>{course.modules} modules</span>
                          <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
                            {course.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Modules</h2>
              <Dialog open={isCreateModuleOpen} onOpenChange={setIsCreateModuleOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Module
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Module</DialogTitle>
                    <DialogDescription>
                      Add a new module to an existing course
                    </DialogDescription>
                  </DialogHeader>
                  <CreateModuleForm />
                </DialogContent>
              </Dialog>
            </div>

            {/* Course Selection Dropdown */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <Label className="mb-2 block">Select Course to View Modules</Label>
                  <Select value={selectedCourseForModules} onValueChange={setSelectedCourseForModules}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Modules Display */}
            {selectedCourseForModules && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Modules in {courses.find(c => c.id === parseInt(selectedCourseForModules))?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredModules.map((module) => (
                      <Card key={module.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold">{module.title}</h3>
                              <p className="text-muted-foreground text-sm">{module.summary}</p>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>{module.lessons} lessons</span>
                                <span>{module.enrolled} enrolled</span>
                                <span>{module.progress}% avg progress</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {!selectedCourseForModules && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Select a course to view its modules</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="lessons" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Lessons</h2>
              <Dialog open={isCreateLessonOpen} onOpenChange={setIsCreateLessonOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Lesson
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Lesson</DialogTitle>
                    <DialogDescription>
                      Add a new lesson to an existing module
                    </DialogDescription>
                  </DialogHeader>
                  <CreateLessonForm />
                </DialogContent>
              </Dialog>
            </div>

            {/* Course and Module Selection Dropdowns */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block">Select Course</Label>
                    <Select value={selectedCourseForLessons} onValueChange={(value) => {
                      setSelectedCourseForLessons(value);
                      setSelectedModuleForLessons(''); // Reset module selection
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id.toString()}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Select Module</Label>
                    <Select 
                      value={selectedModuleForLessons} 
                      onValueChange={setSelectedModuleForLessons}
                      disabled={!selectedCourseForLessons}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a module" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableModulesForLessons.map((module) => (
                          <SelectItem key={module.id} value={module.id.toString()}>
                            {module.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lessons Display */}
            {selectedModuleForLessons && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Lessons in {availableModulesForLessons.find(m => m.id === parseInt(selectedModuleForLessons))?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Lesson Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Enrolled</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead>Completion Rate</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLessons.map((lesson) => (
                        <TableRow key={lesson.id}>
                          <TableCell>{lesson.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {lesson.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{lesson.duration}</TableCell>
                          <TableCell className="text-muted-foreground">{lesson.enrolled}</TableCell>
                          <TableCell className="text-muted-foreground">{lesson.completed}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {Math.round((lesson.completed / lesson.enrolled) * 100)}%
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {!selectedCourseForLessons && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Select a course and module to view lessons</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Users</h2>
              <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account with role assignment
                    </DialogDescription>
                  </DialogHeader>
                  <CreateUserForm />
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Enrolled Courses</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{user.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.enrolled}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}