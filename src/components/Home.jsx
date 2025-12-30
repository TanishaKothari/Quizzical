import { useContext } from 'react'
import { QuizContext } from '../contexts/QuizContext'

export default function Home() {
  const { setScene } = useContext(QuizContext)

  return (
    <section className="home-container" aria-labelledby="app-title">
      <h1 id="app-title">Quizzical</h1>
      <p>Your ultimate quiz experience</p>
      <button className="start-quiz-button" onClick={() => setScene('settings')} aria-label="Start a new quiz">Start Quiz</button>
    </section>
  )
}