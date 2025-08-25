"use client"

import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth/auth-form"

export default function RegisterPage() {
  const router = useRouter()

  const handleLogin = () => {
    router.push("/login")
  }

  const handleRegister = (userData: any) => {
    console.log("Register:", userData)
    // TODO: Implement proper registration and global state management
    // For now, just redirect to home after registration
    router.push("/")
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <AuthForm 
        onLogin={handleLogin} 
        onRegister={handleRegister} 
        initialMode="register" 
      />
    </div>
  )
}
