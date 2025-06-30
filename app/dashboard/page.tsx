"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/components/auth-provider"
import { AdminDashboard } from "@/components/admin-dashboard"
import { StudentDashboard } from "@/components/student-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  {user?.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
                </h2>
                <p className="text-muted-foreground">
                  {user?.role === "admin"
                    ? "Manage your learning platform and users"
                    : `Welcome back, ${user?.name}! Continue your learning journey.`}
                </p>
              </div>
              <div className="hidden md:block">
                <SidebarTrigger />
              </div>
            </div>

            {user?.role === "admin" ? <AdminDashboard /> : <StudentDashboard />}
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
