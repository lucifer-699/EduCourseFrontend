// Central API configuration
export const API_BASE_URL = "http://localhost:8449";

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface ApiError {
  message: string
  status: number
  details?: any
}

// Generic fetcher function with error handling
async function fetcher<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}/${endpoint}`

  // Get JWT token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = {};
      }

      // Handle 401 Unauthorized - token might be expired
      if (response.status === 401 && typeof window !== "undefined") {
        // Clear invalid token and redirect to login
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }

      throw {
        message: errorData.message || errorData || `HTTP ${response.status}: ${response.statusText}`,
        status: response.status,
        details: errorData,
      } as ApiError;
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw {
        message: "Network error: Unable to connect to the server",
        status: 0,
        details: error,
      } as ApiError
    }
    throw error
  }
}

// Course API functions
export const courseApi = {
  // Get all courses
  getAllCourses: async (): Promise<any[]> => {
    return fetcher<any[]>("/courses")
  },

  // Get course by ID
  getCourseById: async (id: string): Promise<any> => {
    return fetcher<any>(`/courses/${id}`)
  },

  // Create new course (for admin)
  createCourse: async (courseData: any): Promise<any> => {
    return fetcher<any>("/courses", {
      method: "POST",
      body: JSON.stringify(courseData),
    })
  },

  // Update course
  updateCourse: async (id: string, courseData: any): Promise<any> => {
    return fetcher<any>(`/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(courseData),
    })
  },

  // Delete course
  deleteCourse: async (id: string): Promise<void> => {
    return fetcher<void>(`/courses/${id}`, {
      method: "DELETE",
    })
  },
}

// Module API functions
export const moduleApi = {
  // Get modules by course ID
  getModulesByCourseId: async (courseId: string): Promise<any[]> => {
    return fetcher<any[]>(`/modules?courseId=${courseId}`)
  },

  // Get module by ID
  getModuleById: async (id: string): Promise<any> => {
    return fetcher<any>(`/modules/${id}`)
  },

  // Create new module
  createModule: async (moduleData: any): Promise<any> => {
    return fetcher<any>("/modules", {
      method: "POST",
      body: JSON.stringify(moduleData),
    })
  },

  // Update module
  updateModule: async (id: string, moduleData: any): Promise<any> => {
    return fetcher<any>(`/modules/${id}`, {
      method: "PUT",
      body: JSON.stringify(moduleData),
    })
  },

  // Delete module
  deleteModule: async (id: string): Promise<void> => {
    return fetcher<void>(`/modules/${id}`, {
      method: "DELETE",
    })
  },
}

// Lesson API functions
export const lessonApi = {
  // Get lessons by module ID
  getLessonsByModuleId: async (moduleId: string): Promise<any[]> => {
    return fetcher<any[]>(`/lessons?moduleId=${moduleId}`)
  },

  // Get lesson by ID
  getLessonById: async (id: string): Promise<any> => {
    return fetcher<any>(`/lessons/${id}`)
  },

  // Create new lesson
  createLesson: async (lessonData: any): Promise<any> => {
    return fetcher<any>("/lessons", {
      method: "POST",
      body: JSON.stringify(lessonData),
    })
  },

  // Update lesson
  updateLesson: async (id: string, lessonData: any): Promise<any> => {
    return fetcher<any>(`/lessons/${id}`, {
      method: "PUT",
      body: JSON.stringify(lessonData),
    })
  },

  // Delete lesson
  deleteLesson: async (id: string): Promise<void> => {
    return fetcher<void>(`/lessons/${id}`, {
      method: "DELETE",
    })
  },

  // Mark lesson as complete
  markLessonComplete: async (id: string): Promise<void> => {
    return fetcher<void>(`/lessons/${id}/complete`, {
      method: "POST",
    })
  },
}

// User API functions (for admin)
export const userApi = {
  // Get all users
  getAllUsers: async (): Promise<any[]> => {
    return fetcher<any[]>("/users")
  },

  // Get user by ID
  getUserById: async (id: string): Promise<any> => {
    return fetcher<any>(`/users/${id}`)
  },

  // Update user
  updateUser: async (id: string, userData: any): Promise<any> => {
    return fetcher<any>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  },

  // Delete user
  deleteUser: async (id: string): Promise<void> => {
    return fetcher<void>(`/users/${id}`, {
      method: "DELETE",
    })
  },
}

// Authentication API functions
export const authApi = {
  // Login - now expects only token and role
  login: async (email: string, password: string): Promise<{ token: string; role: "admin" | "user" }> => {
    return fetcher<{ token: string; role: "admin" | "user" }>("auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  // Register
  register: async (userData: { name: string; email: string; password: string }): Promise<{
    token: string
    role: "admin" | "user"
  }> => {
    return fetcher<{ token: string; role: "admin" | "user" }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  // Refresh token
  refreshToken: async (token: string): Promise<{ token: string }> => {
    return fetcher<{ token: string }>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
  },

  // Logout
  logout: async (): Promise<void> => {
    const token = localStorage.getItem("jwt_token")
    if (token) {
      return fetcher<void>("/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }
  },
}

// Progress API functions
export const progressApi = {
  // Get user progress for a course
  getCourseProgress: async (courseId: string): Promise<{ progress: number; completedModules: number }> => {
    return fetcher<{ progress: number; completedModules: number }>(`/progress/course/${courseId}`)
  },

  // Get user progress for a module
  getModuleProgress: async (moduleId: string): Promise<{ progress: number; completedLessons: number }> => {
    return fetcher<{ progress: number; completedLessons: number }>(`/progress/module/${moduleId}`)
  },

  // Update progress
  updateProgress: async (lessonId: string, completed: boolean): Promise<void> => {
    return fetcher<void>(`/progress/lesson/${lessonId}`, {
      method: "POST",
      body: JSON.stringify({ completed }),
    })
  },
}

// Export types from data.ts for consistency
export type { Course, Module, Lesson} from "./data"
