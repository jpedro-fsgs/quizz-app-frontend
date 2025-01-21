export interface Option {
  index: number
  option: string
  isCorrect: boolean
}

export interface Question {
  question: string
  options: Option[]
  answerIndex: number
}

export interface Quiz {
  id: string
  title: string
  description: string
  questions: Question[]
}
