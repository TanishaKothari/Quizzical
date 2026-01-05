import { useContext } from 'react'
import { QuizContext } from '../contexts/QuizContext'

export default function Home() {
  const { setScene, bookmarks } = useContext(QuizContext)

  return (
    <section className="home-container" aria-labelledby="app-title">
      <h1 id="app-title">Quizzical</h1>
      <p>Your ultimate quiz experience</p>
      <div className='home-buttons'>
        <button className="start-quiz-button" onClick={() => setScene('settings')} aria-label="Start a new quiz">Start Quiz</button>
        {bookmarks.length > 0 && (
            <button className="view-bookmarks-btn" onClick={() => setScene('bookmarks')} aria-label="View bookmarked questions">
                View Bookmarks ({bookmarks.length})
            </button>
        )}
      </div>
    </section>
  )
}