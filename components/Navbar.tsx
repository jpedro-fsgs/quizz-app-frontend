'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Button } from "@/components/ui/button"
import UserMenu from './UserMenu'
import { MobileMenu } from './MobileMenu'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <MobileMenu />
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold">Quiz App</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Home
              </Link>
              <Link href="/quizzes" className="hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Quizzes
              </Link>
              {user && (
                <Link href="/create-quiz" className="hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Create Quiz
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block ml-4">
              {user ? (
                <UserMenu />
              ) : (
                <div className="space-x-4">
                  <Link href="/login" passHref>
                    <Button variant="secondary">Login</Button>
                  </Link>
                  <Link href="/register" passHref>
                    <Button variant="accent">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

