export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Quiz App</h1>
      <p className="text-xl mb-8">Test your knowledge with our quizzes!</p>
      <div className="space-x-4">
        <a href="/quizzes" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Quizzes
        </a>
        <a href="/create-quiz" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Create Quiz
        </a>
      </div>
    </div>
  )
}

