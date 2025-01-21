'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"

interface Question {
  question: string
  options: { index: number; option: string; isCorrect: boolean }[]
  answerIndex: number
}

const URL = process.env.API_URL

export default function CreateQuiz() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const router = useRouter()

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: [], answerIndex: -1 }])
  }

  const updateQuestion = (index: number, question: string) => {
    const newQuestions = [...questions]
    newQuestions[index].question = question
    setQuestions(newQuestions)
  }

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options.push({ index: newQuestions[questionIndex].options.length, option: '', isCorrect: false })
    setQuestions(newQuestions)
  }

  const updateOption = (questionIndex: number, optionIndex: number, option: string) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options[optionIndex].option = option
    setQuestions(newQuestions)
  }

  const setCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options.forEach((opt, idx) => {
      opt.isCorrect = idx === optionIndex
    })
    newQuestions[questionIndex].answerIndex = optionIndex
    setQuestions(newQuestions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const quizData = {
      title,
      description,
      questions: questions.map(q => ({
        question: q.question,
        options: q.options,
        answerIndex: q.answerIndex
      }))
    }

    try {
      const response = await fetch(URL + '/api/quizzes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(quizData),
      })
      if (response.ok) {
        router.push('/quizzes')
      } else {
        console.error('Failed to create quiz')
      }
    } catch (error) {
      console.error('Error creating quiz:', error)
    }
  }

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-primary">Create Quiz</CardTitle>
          <CardDescription>Fill in the details below to create a new quiz</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="border p-4 rounded space-y-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`question-${qIndex}`}>Question {qIndex + 1}</Label>
                  <Input
                    id={`question-${qIndex}`}
                    type="text"
                    value={question.question}
                    onChange={(e) => updateQuestion(qIndex, e.target.value)}
                    required
                  />
                </div>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center space-x-2">
                    <Input
                      type="text"
                      value={option.option}
                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                      placeholder={`Option ${oIndex + 1}`}
                      className="flex-grow"
                      required
                    />
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={option.isCorrect}
                      onChange={() => setCorrectAnswer(qIndex, oIndex)}
                      className="ml-2"
                    />
                    <Label>Correct</Label>
                  </div>
                ))}
                <Button type="button" onClick={() => addOption(qIndex)} className="w-full mt-2">Add Option</Button>
              </div>
            ))}
            <Button type="button" onClick={addQuestion} className="w-full">Add Question</Button>
            <CardFooter className="flex justify-between mt-4 px-0">
              <Button type="submit" className="w-full">Create Quiz</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

