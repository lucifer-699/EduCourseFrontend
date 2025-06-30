export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// JWT token management
export function getJwtToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("jwt_token")
}

export function setJwtToken(token: string): void {
  localStorage.setItem("jwt_token", token)
}

export function clearJwtToken(): void {
  localStorage.removeItem("jwt_token")
}

// User management - now handles caching of login credentials
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("user")
  return userData ? JSON.parse(userData) : null
}

export function setCurrentUser(user: User): void {
  localStorage.setItem("user", JSON.stringify(user))
}

export function clearCurrentUser(): void {
  localStorage.removeItem("user")
  clearJwtToken()
}

// Cache user credentials from login form
export function cacheUserCredentials(email: string, name?: string): void {
  const existingUser = getCurrentUser()

  // Generate a simple ID from email if not exists
  const userId =
    existingUser?.id ||
    btoa(email)
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 8)

  const userData = {
    id: userId,
    email: email,
    name: name || email.split("@")[0], // Use email prefix as fallback name
    role: existingUser?.role || "user", // Will be updated when we get role from API
  }

  setCurrentUser(userData)
}

// Update user role after API response
export function updateUserRole(role: "admin" | "user"): void {
  const currentUser = getCurrentUser()
  if (currentUser) {
    const updatedUser = { ...currentUser, role }
    setCurrentUser(updatedUser)
  }
}

// Remove the mock authentication function since we're using real API
export function getAllUsers(): User[] {
  // This should now come from the API
  return []
}
