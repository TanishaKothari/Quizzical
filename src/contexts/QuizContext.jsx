import { createContext, useState } from "react"

const QuizContext = createContext()

export default function QuizProvider({ children }) {
    const [scene, setScene] = useState('home')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [quizSettings, setQuizSettings] = useState({ 
    amount: 5, 
    category: 'any', 
    difficulty: 'any',
    mode: 'untimed'
  })

  async function fetchQuestions(amount, category, difficulty) {
    try {
      setError(null)
      // If category or difficulty are 'any', they should be omitted from the API request
      const res = await fetch(`https://opentdb.com/api.php?amount=${amount}${category !== 'any' ? `&category=${category}` : ''}${difficulty !== 'any' ? `&difficulty=${difficulty}` : ''}&type=multiple`)
      if (!res.ok) {
        throw new Error('Failed to fetch questions. Please try again.')
      }
      const data = await res.json()

      // Check if API returned an error response
      if (data.response_code !== 0) {
        if (data.response_code === 1) {
          throw new Error('Not enough questions available for your settings. Try different options.')
        } else if (data.response_code === 2) {
          throw new Error('Invalid settings. Please check your selections.')
        } else {
          throw new Error('Something went wrong. Please try again.')
        }
      }

      // Check if we got any results
      if (!data.results || data.results.length === 0) {
        throw new Error('No questions found. Please try different settings.')
      }
      
      const questionObjs = data.results.map((question) => {
        return {
          ...question,
          allAnswers: shuffleAnswers(question.correct_answer, question.incorrect_answers)
        }
      })
      setQuestions(questionObjs)
      return true
    } catch (error) {
      setError('Unable to connect to the server. Please check your internet connection and try again.')
      return false
    }
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
    
  async function startNewGame(amount, category, difficulty, mode) {
    setQuizSettings({ amount, category, difficulty, mode })
    setError(null)
    setIsLoading(true)

    const success = await fetchQuestions(amount, category, difficulty)
    setIsLoading(false)

    if (success) setScene('questions')
  }

  function retrieveAnswers(answers) {
    setSelectedAnswers(answers)
    setScene('answers')
  }

  function replay() {
    setSelectedAnswers([])
    setError(null)
    startNewGame(
      quizSettings.amount, 
      quizSettings.category, 
      quizSettings.difficulty,
      quizSettings.mode
    )
  }

  return (
    <QuizContext.Provider value={{
        scene, setScene,
        isLoading,
        error, setError,
        questions,
        selectedAnswers,
        quizSettings,
        startNewGame,
        retrieveAnswers,
        replay
    }}>
        {children}
    </QuizContext.Provider>
  )
}

export { QuizContext }