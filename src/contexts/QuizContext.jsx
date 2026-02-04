import { createContext, useState, useEffect } from "react"
import { decode } from "html-entities"
import useSoundEffects from "../hooks/useSoundEffects"
import i18n from "../i18n"

const QuizContext = createContext()

export default function QuizProvider({ children }) {
  const { playSound } = useSoundEffects()

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
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bookmarks')
    return saved ? JSON.parse(saved) : []
  })

  // Persist bookmarks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  function toggleBookmark(questionObj) {
    setBookmarks(prevBookmarks => {
      const isBookmarked = prevBookmarks.find(q => q.question === questionObj.question)
      if (isBookmarked) {
        // Remove bookmark
        return prevBookmarks.filter(q => q.question !== questionObj.question)
      } else {
        // Add bookmark
        return [...prevBookmarks, questionObj]
      }
    })
  }

  async function translateText(text, targetLang) {
    const res = await fetch(import.meta.env.VITE_TRANSLATE_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ q: text, source: 'en', target: targetLang, format: 'text' })
    })
    if (!res.ok) throw new Error('translate failed')
    const data = await res.json()
    return data.translatedText || text
  }

  async function translateQuestions(questionObjs, targetLang) {
    if (targetLang === 'en') return questionObjs
    return Promise.all(questionObjs.map(async (q) => {
      try {
        const question = await translateText(q.question, targetLang)
        const correct_answer = await translateText(q.correct_answer, targetLang)
        const incorrect_answers = await Promise.all(q.incorrect_answers.map(ans => translateText(ans, targetLang)))
        return {
          ...q,
          question,
          correct_answer,
          incorrect_answers,
          allAnswers: shuffleAnswers(correct_answer, incorrect_answers)
        }
      } catch {
        return q
      }
    }))
  }  

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
        // Decode the correct answer so it matches the form values
        const decodedCorrectAnswer = decode(question.correct_answer)
        const decodedIncorrectAnswers = question.incorrect_answers.map(ans => decode(ans))

        return {
          ...question,
          question: decode(question.question),
          correct_answer: decodedCorrectAnswer,
          incorrect_answers: decodedIncorrectAnswers,
          allAnswers: shuffleAnswers(decodedCorrectAnswer, decodedIncorrectAnswers)
        }
      })

      const localized = await translateQuestions(questionObjs, i18n.language)
      setQuestions(localized)
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

    if (success) {
      playSound('start')
      setScene('questions')
    }
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
        bookmarks,
        toggleBookmark,
        startNewGame,
        retrieveAnswers,
        replay
    }}>
        {children}
    </QuizContext.Provider>
  )
}

export { QuizContext }