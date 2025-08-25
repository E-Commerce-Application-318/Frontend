"use client"

import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth/auth-form"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (email: string, password: string, userType: "customer" | "seller") => {
    console.log("Login:", { email, password, userType })
    // TODO: Implement proper authentication and global state management
    // For now, just redirect to home

    // using to save user to localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({ name: email.split("@")[0], email, userType })
    )

    router.push("/")
  }

  const handleRegister = () => {
    router.push("/register")
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <AuthForm 
        onLogin={handleLogin} 
        onRegister={handleRegister} 
        initialMode="login" 
      />
    </div>
  )
}
