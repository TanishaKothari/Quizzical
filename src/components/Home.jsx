import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { QuizContext } from '../contexts/QuizContext'

export default function Home() {
  const { setScene, bookmarks } = useContext(QuizContext)
  const { t } = useTranslation()
  return (
    <section className="home-container" aria-labelledby="app-title">
      <h1 id="app-title">{t('common.title')}</h1>
      <p>{t('common.tagline')}</p>
      <div className='home-buttons'>
        <button className="start-quiz-button" onClick={() => setScene('settings')} aria-label={t('common.startQuiz')}>{t('common.startQuiz')}</button>
        {bookmarks.length > 0 && (
            <button className="view-bookmarks-btn" onClick={() => setScene('bookmarks')} aria-label={t('common.viewBookmarks', { count: bookmarks.length })}>
                {t('common.viewBookmarks', { count: bookmarks.length })}
            </button>
        )}
      </div>
    </section>
  )
}