'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../app/contexts/AuthContext'
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Menu } from 'lucide-react'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetTitle></SheetTitle>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <nav className="flex flex-col gap-4">
          <Link href="/" onClick={() => setOpen(false)} className="block py-2 text-lg font-semibold">
            Home
          </Link>
          <Link href="/quizzes" onClick={() => setOpen(false)} className="block py-2 text-lg font-semibold">
            Quizzes
          </Link>
          {user && (
            <Link href="/create-quiz" onClick={() => setOpen(false)} className="block py-2 text-lg font-semibold">
              Create Quiz
            </Link>
          )}
          {!user && (
            <>
              <Link href="/login" onClick={() => setOpen(false)} passHref>
                <Button className="w-full" variant="outline">Login</Button>
              </Link>
              <Link href="/register" onClick={() => setOpen(false)} passHref>
                <Button className="w-full">Register</Button>
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

