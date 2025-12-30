import { useContext, useState, useMemo, useCallback } from "react"
import { QuizContext } from '../contexts/QuizContext'
import QuestionBlock from "./QuestionBlock"
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon
} from 'react-share'

export default function Answers() {
    const { questions, selectedAnswers, setScene, replay } = useContext(QuizContext)
    const [copied, setCopied] = useState(false)

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

    function calculateScore() {
        let countCorrect = 0
        for (let i = 0; i < questions.length; i++) {
            if (selectedAnswers[i] === questions[i].correct_answer) {
                countCorrect++
            }
        }
        return countCorrect
    }

    const score = useMemo(() => calculateScore(), [selectedAnswers, questions])
    const total = questions.length
    const percentage = Math.round((score / total) * 100)

    const shareUrl = 'https://quizzical-gold-three.vercel.app/'
    const shareMessage = `I just scored ${score}/${total} (${percentage}%) on Quizzical! Can you beat my score? 🧠✨`

    const handleCopyToClipboard = useCallback(async () => {
        const textToCopy = `${shareMessage}\n${shareUrl}`
        try {
            await navigator.clipboard.writeText(textToCopy)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }, [shareMessage, shareUrl])

    return (
        <section aria-labelledby="results-heading">
            <h2 id="results-heading" className="sr-only">Quiz Results</h2>
            {questionElements}

            <div className='score-replay' role='region' aria-label='Quiz results and actions'>
                <h3 aria-live="polite">You scored {score}/{total} correct answers</h3>
                <div className="action-buttons">
                    <button className="change-settings-btn" onClick={() => setScene('settings')} aria-label="Change quiz settings and start a new quiz">Change Settings</button>
                    <button className="replay-btn" onClick={replay} aria-label="Start a new quiz with different questions">Play Again</button>
                </div>

                <div className="share-section" role="region" aria-label="Share your score on social media">
                    <p className="share-title">Share your score:</p>
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
                            Copied to clipboard!
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}