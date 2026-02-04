import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Analytics } from "@vercel/analytics/react"
import './App.css'
import { QuizContext } from './contexts/QuizContext.jsx'
import Home from './components/Home'
import Settings from './components/Settings'
import Questions from './components/Questions'
import Answers from './components/Answers'
import ThemeToggle from './components/ThemeToggle'
import Bookmarks from './components/Bookmarks'
import LanguageSwitcher from './components/LanguageSwitcher'

function App() {
  const { scene, setScene, isLoading, error, setError } = useContext(QuizContext)
  const { i18n, t } = useTranslation()

  function renderScene() {
    if (isLoading) {
      return (
        <div className='loading-container' role="status" aria-live="polite" aria-label="Loading quiz questions">
          <div className='loader'>
            <div className="question-mark q1">?</div>
            <div className="question-mark q2">?</div>
            <div className="question-mark q3">?</div>
          </div>
          <p className='loading-text'>{t('common.loading')}</p>
          {i18n.language !== 'en' && (
            <p className='loading-subtext'>{t('common.translationNote')}</p>
          )}
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
      answers: <Answers />,
      bookmarks: <Bookmarks />
    }
    
    return scenes[scene] || <Home />
  }

  return (
    <>
      <LanguageSwitcher />
      {i18n.language !== 'en' && (
        <p className="ai-disclaimer" role="note" aria-live="polite">
          {t('common.aiDisclaimer')}
        </p>
      )}
      <ThemeToggle />
      <main role="main">{renderScene()}</main>
      <Analytics />
    </>
  )
}

export default App