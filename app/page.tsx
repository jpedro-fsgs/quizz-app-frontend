import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-6 text-primary">Welcome to Quiz App</h1>
      <p className="text-2xl mb-8 text-muted-foreground">Test your knowledge with our exciting quizzes!</p>
      <div className="space-y-4 md:space-y-0 md:space-x-4">
        <Link href="/quizzes" passHref>
          <Button variant="default" size="lg" className="text-lg px-8 py-6">
          View Quizzes
          </Button>
        </Link>
        <Link href="/create-quiz" passHref>
          <Button variant="accent" size="lg" className="text-lg px-8 py-6">
            Create a Quiz
          </Button>
        </Link>
      </div>
    </div>
  )
}

