export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  coverImage: string
  progress: number
  totalModules: number
  completedModules: number
  modules: Module[]
}

export interface Module {
  id: string
  courseId: string
  title: string
  summary: string
  progress: number
  totalLessons: number
  completedLessons: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  moduleId: string
  title: string
  type: "text" | "video" | "pdf" | "embed" | "quiz"
  content: any
  completed: boolean
  duration?: number
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Learn the fundamentals of React development",
    thumbnail: "/placeholder.svg?height=200&width=300",
    coverImage: "/placeholder.svg?height=400&width=800",
    progress: 65,
    totalModules: 4,
    completedModules: 2,
    modules: [
      {
        id: "1",
        courseId: "1",
        title: "Getting Started",
        summary: "Introduction to React concepts and setup",
        progress: 100,
        totalLessons: 3,
        completedLessons: 3,
        lessons: [
          {
            id: "1",
            moduleId: "1",
            title: "What is React?",
            type: "text",
            content: {
              text: "React is a JavaScript library for building user interfaces...",
            },
            completed: true,
            duration: 10,
          },
          {
            id: "2",
            moduleId: "1",
            title: "Setting up React",
            type: "video",
            content: {
              videoUrl: "https://example.com/video.mp4",
              transcript: "In this video, we will learn how to set up React...",
            },
            completed: true,
            duration: 15,
          },
          {
            id: "3",
            moduleId: "1",
            title: "Your First Component",
            type: "text",
            content: {
              text: "Let's create your first React component...",
            },
            completed: true,
            duration: 12,
          },
        ],
      },
      {
        id: "2",
        courseId: "1",
        title: "Components and Props",
        summary: "Understanding React components and props",
        progress: 67,
        totalLessons: 3,
        completedLessons: 2,
        lessons: [
          {
            id: "4",
            moduleId: "2",
            title: "Understanding Components",
            type: "video",
            content: {
              videoUrl: "https://example.com/video2.mp4",
            },
            completed: true,
            duration: 20,
          },
          {
            id: "5",
            moduleId: "2",
            title: "Working with Props",
            type: "text",
            content: {
              text: "Props are how we pass data to components...",
            },
            completed: true,
            duration: 15,
          },
          {
            id: "6",
            moduleId: "2",
            title: "Props Quiz",
            type: "quiz",
            content: {
              questions: [
                {
                  question: "What are props in React?",
                  options: ["Properties", "Functions", "Components", "States"],
                  correct: 0,
                },
              ],
            },
            completed: false,
            duration: 10,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    description: "Master advanced JavaScript concepts and patterns",
    thumbnail: "/placeholder.svg?height=200&width=300",
    coverImage: "/placeholder.svg?height=400&width=800",
    progress: 30,
    totalModules: 5,
    completedModules: 1,
    modules: [
      {
        id: "3",
        courseId: "2",
        title: "Async JavaScript",
        summary: "Promises, async/await, and asynchronous patterns",
        progress: 100,
        totalLessons: 4,
        completedLessons: 4,
        lessons: [
          {
            id: "7",
            moduleId: "3",
            title: "Understanding Promises",
            type: "text",
            content: {
              text: "Promises are a way to handle asynchronous operations...",
            },
            completed: true,
            duration: 18,
          },
          {
            id: "8",
            moduleId: "3",
            title: "Async/Await Syntax",
            type: "video",
            content: {
              videoUrl: "https://example.com/async-video.mp4",
            },
            completed: true,
            duration: 25,
          },
          {
            id: "9",
            moduleId: "3",
            title: "Error Handling",
            type: "text",
            content: {
              text: "Proper error handling in async code...",
            },
            completed: true,
            duration: 12,
          },
          {
            id: "10",
            moduleId: "3",
            title: "Async Quiz",
            type: "quiz",
            content: {
              questions: [
                {
                  question: "What does async/await do?",
                  options: ["Makes code synchronous", "Handles promises", "Creates functions", "None"],
                  correct: 1,
                },
              ],
            },
            completed: true,
            duration: 8,
          },
        ],
      },
    ],
  },
]

export function getCourses(): Course[] {
  return mockCourses
}

export function getCourse(id: string): Course | undefined {
  return mockCourses.find((course) => course.id === id)
}

export function getModule(courseId: string, moduleId: string): Module | undefined {
  const course = getCourse(courseId)
  return course?.modules.find((module) => module.id === moduleId)
}

export function getLesson(lessonId: string): Lesson | undefined {
  for (const course of mockCourses) {
    for (const module of course.modules) {
      const lesson = module.lessons.find((lesson) => lesson.id === lessonId)
      if (lesson) return lesson
    }
  }
  return undefined
}
