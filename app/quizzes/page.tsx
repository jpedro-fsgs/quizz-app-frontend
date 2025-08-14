'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Quiz {
  id: string
  title: string
  description: string
}

const URL = process.env.API_URL

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(URL + `/api/quizzes/all`)
        if (response.ok) {
          const data = await response.json()
          console.log(data);
          setQuizzes(data)
        } else {
          console.error('Failed to fetch quizzes')
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error)
      }
    }

    fetchQuizzes()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id}>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{quiz.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/quizzes/${quiz.id}`} passHref>
                <Button className="w-full">Take Quiz</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

