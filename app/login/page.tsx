'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"

const URL = process.env.API_URL

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch(URL + '/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      if (response.ok) {
        console.log("teste");
        const data = await response.json()
        // access_token is now set by the server in an HttpOnly cookie
        // Keep user info in context/localStorage for UI, but do not store tokens
        login({
          id: data.uuid,
          name: data.name,
          email: data.email
        })
        router.push('/quizzes')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Login failed')
      }
    } catch (error) {
      console.error('Error during login:', error)
      setError('An error occurred during login. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-primary">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-destructive mt-2">{error}</p>}
            <CardFooter className="flex justify-between mt-4 px-0">
              <Button type="submit" className="w-full">Login</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

