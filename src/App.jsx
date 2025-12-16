import { useState } from 'react'
import { Analytics } from "@vercel/analytics/react"
import './App.css'
import Home from './components/Home'
import Settings from './components/Settings'
import Questions from './components/Questions'
import Answers from './components/Answers'

function App() {
  const [scene, setScene] = useState('home')
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [quizSettings, setQuizSettings] = useState({ amount: 5, category: 'any', difficulty: 'any' })

  async function fetchQuestions(amount, category, difficulty) {
    // If category or difficulty are 'any', they should be omitted from the API request
    const res = await fetch(`https://opentdb.com/api.php?amount=${amount}${category !== 'any' ? `&category=${category}` : ''}${difficulty !== 'any' ? `&difficulty=${difficulty}` : ''}&type=multiple`)
    const data = await res.json()

    const questionObjs = data.results.map((question) => {
      return {
        ...question,
        allAnswers: shuffleAnswers(question.correct_answer, question.incorrect_answers)
      }
    })

    setQuestions(questionObjs)
  }

  function shuffleAnswers(correctAnswer, incorrectAnswers) {
      const allAnswers = [correctAnswer, ...incorrectAnswers]

      // Fisher-Yates shuffle algorithm
      for (let i = allAnswers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          const temp = allAnswers[i]
          allAnswers[i] = allAnswers[j]
          allAnswers[j] = temp
      }
      return allAnswers
  }
    
  async function startNewGame(amount, category, difficulty) {
    setQuizSettings({ amount, category, difficulty })

    setIsLoading(true)
    await fetchQuestions(amount, category, difficulty)
    setIsLoading(false)
    setScene('questions')
  }

  function retrieveAnswers(answers) {
    setSelectedAnswers(answers)
    setScene('answers')
  }

  function replay() {
    setSelectedAnswers([])
    startNewGame(quizSettings.amount, quizSettings.category, quizSettings.difficulty)
  }

  function renderScene() {
    if (isLoading) {
      return (
        <div className='loading-container' role="status" aria-live="polite" aria-label="Loading quiz questions">
          <p>Loading questions...</p>
        </div>
      )
    }
    
    if (scene === 'home') {
      return <Home onClick={() => setScene('settings')} />
    } 
    if (scene === 'settings') {
      return <Settings onStartQuiz={startNewGame} />
    }
    if (scene === 'questions') {
      return <Questions questions={questions} onSubmit={retrieveAnswers} />
    } 
    if (scene === 'answers') {
      return <Answers questions={questions} selectedAnswers={selectedAnswers} onChangeSettings={() => setScene('settings')} onReplay={replay} />
    }
  }

  return (
    <>
      <main role="main">{renderScene()}</main>
      <Analytics />
    </>
  )
}

export default App