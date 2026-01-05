import {  useContext } from 'react'
import { QuizContext } from '../contexts/QuizContext'
import QuestionBlock from './QuestionBlock'

export default function Bookmarks() {
    const { bookmarks, setScene } = useContext(QuizContext)
    return (
        <section className="bookmarks-page" aria-labelledby="bookmarks-title">
            <div className="bookmarks-header">
                <button 
                    className="back-btn" 
                    onClick={() => setScene('home')}
                    aria-label="Back to home"
                >← Back</button>
                <h2 id="bookmarks-title">Your Bookmarks</h2>
            </div>

            {bookmarks.length === 0 ? (
                <div className="no-bookmarks">
                    <p>You haven't bookmarked any questions yet.</p>
                    <button className="start-quiz-button" onClick={() => setScene('settings')}>Find Questions</button>
                </div>
            ) : (
                <div className="bookmarks-list">
                    {bookmarks.map((q, index) => (
                        <QuestionBlock 
                            key={index}
                            questionObj={q}
                            index={index}
                            showResults={true}
                            selectedAnswer={q.correct_answer} // Show correct answer in bookmarks
                        />
                    ))}
                </div>
            )}
        </section>
    )
}