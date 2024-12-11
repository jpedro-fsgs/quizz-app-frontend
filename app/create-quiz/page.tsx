'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Question {
  question: string
  options: { index: number; option: string; isCorrect: boolean }[]
  answerIndex: number
}

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
    // const userId = localStorage.getItem('userId')
    // if (!userId) {
    //   console.error('User ID not found')
    //   return
    // }

    const quizData = {
      // userId,
      title,
      description,
      questions: questions.map(q => ({
        question: q.question,
        options: q.options,
        answerIndex: q.answerIndex
      }))
    }

    try {
      const response = await fetch('http://localhost:8080/api/quizzes/create', {
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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="border p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Question {qIndex + 1}</h3>
            <input
              type="text"
              value={question.question}
              onChange={(e) => updateQuestion(qIndex, e.target.value)}
              placeholder="Enter question"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={option.option}
                  onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                  placeholder={`Option ${oIndex + 1}`}
                  className="flex-grow px-3 py-2 border rounded"
                />
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={option.isCorrect}
                  onChange={() => setCorrectAnswer(qIndex, oIndex)}
                  className="ml-2"
                />
                <label>Correct</label>
              </div>
            ))}
            <button type="button" onClick={() => addOption(qIndex)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mt-2">
              Add Option
            </button>
          </div>
        ))}
        <button type="button" onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Question
        </button>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Create Quiz
        </button>
      </form>
    </div>
  )
}

