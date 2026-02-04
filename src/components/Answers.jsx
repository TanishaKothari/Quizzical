import { useContext, useState, useMemo, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { QuizContext } from '../contexts/QuizContext'
import QuestionBlock from "./QuestionBlock"
import useSoundEffects from "../hooks/useSoundEffects"
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon
} from 'react-share'

export default function Answers() {
    const { questions, selectedAnswers, setScene, replay, bookmarks } = useContext(QuizContext)
    const { t } = useTranslation()
    const [copied, setCopied] = useState(false)
    const { playSound } = useSoundEffects()

    const questionElements = useMemo(() => 
        questions.map((questionObj, index) => (
            <QuestionBlock 
                key={index} 
                questionObj={questionObj} 
                index={index} 
                showResults={true} 
                selectedAnswer={selectedAnswers[index]}
            />
        )
    ), [questions, selectedAnswers])

    const score = useMemo(() => {
        let countCorrect = 0
        for (let i = 0; i < questions.length; i++) {
            if (selectedAnswers[i] === questions[i].correct_answer) {
                countCorrect++
            }
        }
        return countCorrect
    }, [selectedAnswers, questions])
    const total = questions.length
    const percentage = Math.round((score / total) * 100)

    useEffect(() => {
        if (score === total) {
            playSound('win')
        } else if (score === 0) {
            playSound('lose')
        }
    }, [score, total, playSound])

    const shareUrl = 'https://quizzical-gold-three.vercel.app/'
    const shareMessage = t('answers.score', { score, total }) + ' ' + 'Can you beat my score? 🧠✨'

    async function handleCopyToClipboard() {
        const textToCopy = `${shareMessage}\n${shareUrl}`
        try {
            await navigator.clipboard.writeText(textToCopy)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    return (
        <section aria-labelledby="results-heading">
            <h2 id="results-heading" className="sr-only">Quiz Results</h2>
            {questionElements}

            <div className='score-replay' role='region' aria-label='Quiz results and actions'>
                <h3 aria-live="polite">{t('answers.score', { score, total })}</h3>
                <div className="action-buttons">
                    <button className="change-settings-btn" onClick={() => setScene('settings')} aria-label={t('answers.changeSettings')}>{t('answers.changeSettings')}</button>
                    <button className="replay-btn" onClick={replay} aria-label={t('answers.playAgain')}>{t('answers.playAgain')}</button>
                    {bookmarks.length > 0 && (
                        <button className="view-bookmarks-btn" onClick={() => setScene('bookmarks')} aria-label={t('answers.viewBookmarks', { count: bookmarks.length })}>{t('answers.viewBookmarks', { count: bookmarks.length })}</button>
                    )}
                </div>

                <div className="share-section" role="region" aria-label="Share your score on social media">
                    <p className="share-title">{t('answers.shareTitle')}</p>
                    <div className="share-buttons">
                        <TwitterShareButton 
                            url={shareUrl} 
                            title={shareMessage}
                            hashtags={['Quizzical', 'Quiz', 'Trivia']}
                        >
                            <TwitterIcon size={40} round />
                        </TwitterShareButton>

                        <FacebookShareButton 
                            url={shareUrl} 
                            quote={shareMessage}
                        >
                            <FacebookIcon size={40} round />
                        </FacebookShareButton>

                        <WhatsappShareButton 
                            url={shareUrl} 
                            title={shareMessage}
                        >
                            <WhatsappIcon size={40} round />
                        </WhatsappShareButton>

                        <button 
                            onClick={handleCopyToClipboard}
                            className="copy-button"
                            aria-label="Copy score to clipboard"
                            title="Copy to clipboard"
                        >{copied ? "✓" : "📋"}</button>
                    </div>

                    {copied && (
                        <p className="copy-message" role="status" aria-live="polite">
                            {t('answers.copied')}
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}