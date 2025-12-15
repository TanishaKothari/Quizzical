import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Questions from './components/Questions'
import Answers from './components/Answers'

function App() {
  const [scene, setScene] = useState('home')
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])

  async function fetchQuestions() {
    const res = await fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple')
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
    
  async function showQuestions() {
    setIsLoading(true)
    await fetchQuestions()
    setIsLoading(false)
    setScene('questions')
  }

  function retrieveAnswers(answers) {
    setSelectedAnswers(answers)
    setScene('answers')
  }

  function replay() {
    setSelectedAnswers([])
    showQuestions()
  }

  function renderScene() {
    if (isLoading) {
      return (
        <div role="status" aria-live="polite" aria-label="Loading quiz questions">
          <p>Loading questions...</p>
        </div>
      )
    }
    
    if (scene === 'home') {
      return <Home onClick={showQuestions} />
    } 
    if (scene === 'questions') {
      return <Questions questions={questions} onSubmit={retrieveAnswers} />
    } 
    if (scene === 'answers') {
      return <Answers questions={questions} selectedAnswers={selectedAnswers} onClick={replay} />
    }
  }

  return (
    <main role="main">{renderScene()}</main>
  )
}

export default App