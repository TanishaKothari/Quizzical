import { useContext } from 'react'
import { Analytics } from "@vercel/analytics/react"
import './App.css'
import { QuizContext } from './contexts/QuizContext.jsx'
import Home from './components/Home'
import Settings from './components/Settings'
import Questions from './components/Questions'
import Answers from './components/Answers'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const { scene, setScene, isLoading, error, setError } = useContext(QuizContext)

  function renderScene() {
    if (isLoading) {
      return (
        <div className='loading-container' role="status" aria-live="polite" aria-label="Loading quiz questions">
          <div className='loader'>
            <div className="question-mark q1">?</div>
            <div className="question-mark q2">?</div>
            <div className="question-mark q3">?</div>
          </div>
          <p className='loading-text'>Loading questions...</p>
        </div>
      )
    }

    const scenes = {
      home: <Home />,
      settings: (
        <>
          {error && (
            <div className='error-banner' role='alert' aria-live='assertive'>
              <p className='error-message'>{error}</p>
              <button className='error-close' onClick={() => setError(null)} aria-label='Close error message'>×</button>
            </div>
          )}
          <Settings />
        </>
      ),
      questions: <Questions />,
      answers: <Answers />
    }
    
    return scenes[scene] || <Home />
  }

  return (
    <>
      <ThemeToggle />
      <main role="main">{renderScene()}</main>
      <Analytics />
    </>
  )
}

export default App