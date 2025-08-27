"use client"

import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth/auth-form"

type RegisterUser = {
  name: string
  email: string
  password: string
  userType: "customer" | "seller"
}

export default function RegisterPage() {
  const router = useRouter()
  const handleLogin = () => {
    router.push("/login")
  }

    const handleRegister = (userData: RegisterUser) => {
    console.log("Register:", userData)
    
    const accounts: RegisterUser[] = JSON.parse(localStorage.getItem("accounts") || "[]")
    accounts.push(userData)
    localStorage.setItem("accounts", JSON.stringify(accounts))
    

    localStorage.setItem("user", JSON.stringify(userData))
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
