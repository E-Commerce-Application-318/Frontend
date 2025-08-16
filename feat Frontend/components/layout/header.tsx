"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, ShoppingCart, User, Menu, X, Settings, LogOut, Package } from "lucide-react"

interface HeaderProps {
  user?: {
    name: string
    userType: "customer" | "seller"
  } | null
  cartItemCount?: number
  onAuthClick: (mode?: "login" | "register") => void // Added mode parameter
  onCartClick: () => void
  onSearch?: (query: string) => void
  onDashboardClick?: () => void
  onLogout?: () => void
  onHomeClick?: () => void
}

export function Header({
  user,
  cartItemCount = 0,
  onAuthClick,
  onCartClick,
  onSearch,
  onDashboardClick,
  onLogout,
  onHomeClick,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  const handleLogoClick = () => {
    if (onHomeClick) {
      onHomeClick()
    }
  }

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H4</span>
            </div>
            <span className="text-xl font-bold text-primary">H4 Fashion</span>
          </button>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search fashion items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
              <Button type="submit" className="ml-2">
                Search
              </Button>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button - Only show for customers */}
            {(!user || user.userType === "customer") && (
              <Button variant="outline" size="sm" className="relative bg-transparent" onClick={onCartClick}>
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Welcome, {user.name}</span>
                    <span className="sm:hidden">{user.name}</span>
                    <Badge variant={user.userType === "seller" ? "secondary" : "outline"}>{user.userType}</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={onDashboardClick}>
                    {user.userType === "seller" ? (
                      <>
                        <Package className="mr-2 h-4 w-4" />
                        Seller Dashboard
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAuthClick("login")} // Pass login mode
                  className="bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => onAuthClick("register")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {" "}
                  {/* Pass register mode */}
                  Register
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search fashion items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" size="sm">
                Search
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
