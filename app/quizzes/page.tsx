'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Quiz {
  id: string
  title: string
  description: string
}

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/quizzes/all')

        if (response.ok) {
          const data = await response.json()
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
            <p className="mb-4">{quiz.description}</p>
            <Link href={`/quizzes/${quiz.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Take Quiz
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

