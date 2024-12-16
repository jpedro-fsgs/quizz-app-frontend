'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Option {
  index: number
  option: string
  isCorrect: boolean
}

interface Question {
  question: string
  options: Option[]
  answerIndex: number
}

interface Quiz {
  id: string
  title: string
  description: string
  questions: Question[]
}

const URL = process.env.API_URL

export default function PlayQuiz() {
  const params = useParams()
  const router = useRouter()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(URL + `/api/quizzes/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setQuiz(data)
        } else {
          console.error('Failed to fetch quiz')
        }
      } catch (error) {
        console.error('Error fetching quiz:', error)
        alert('Error fetching quiz:' + error)
      }
    }

    fetchQuiz()
  }, [params.id])

  const handleAnswerSelection = (index: number) => {
    setSelectedAnswer(index)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === quiz?.questions[currentQuestionIndex].answerIndex) {
        setScore(score + 1)
      }

      if (currentQuestionIndex < quiz!.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
      } else {
        setQuizCompleted(true)
      }
    }
  }

  const handleRetry = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizCompleted(false)
  }

  const handleBackToQuizzes = () => {
    router.push('/quizzes')
  }

  if (!quiz) {
    return <div className="text-center mt-8">Loading quiz...</div>
  }

  if (quizCompleted) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">Your score: {score} out of {quiz.questions.length}</p>
          <p className="mb-4">Percentage: {((score / quiz.questions.length) * 100).toFixed(2)}%</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleRetry}>Retry Quiz</Button>
          <Button onClick={handleBackToQuizzes}>Back to Quizzes</Button>
        </CardFooter>
      </Card>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
        <p className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
        <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelection(parseInt(value))}>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={index.toString()} id={`${currentQuestionIndex}-option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option.option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleNextQuestion} 
          disabled={selectedAnswer === null}
          className="w-full"
        >
          {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </CardFooter>
    </Card>
  )
}

