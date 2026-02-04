import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { QuizContext } from '../contexts/QuizContext'
import QuestionBlock from './QuestionBlock'

export default function Bookmarks() {
    const { bookmarks, setScene } = useContext(QuizContext)
    const { t } = useTranslation()
    return (
        <section className="bookmarks-page" aria-labelledby="bookmarks-title">
            <div className="bookmarks-header">
                <button 
                    className="back-btn" 
                    onClick={() => setScene('home')}
                    aria-label={t('common.back')}
                >{t('common.back')}</button>
                <h2 id="bookmarks-title">{t('bookmarks.heading')}</h2>
            </div>

            {bookmarks.length === 0 ? (
                <div className="no-bookmarks">
                    <p>{t('bookmarks.empty')}</p>
                    <button className="start-quiz-button" onClick={() => setScene('settings')}>{t('settings.findQuestions')}</button>
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