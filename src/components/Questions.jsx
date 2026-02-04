import { useContext, useRef } from "react"
import { useTranslation } from 'react-i18next'
import { QuizContext } from '../contexts/QuizContext'
import QuestionBlock from "./QuestionBlock"
import Timer from "./Timer"

export default function Questions() {
    const { questions, retrieveAnswers, quizSettings, setScene } = useContext(QuizContext)
    const { t } = useTranslation()
    const formRef = useRef(null)

    // Calculate time: 20 seconds per question
    const SECONDS_PER_QUESTION = 20
    const totalTime = quizSettings.amount * SECONDS_PER_QUESTION

    const questionElements = questions.map((questionObj, index) => {
        return <QuestionBlock 
            key={index} 
            questionObj={questionObj} 
            index={index} 
            showResults={false} 
        />
    })

    function handleSubmit(formData) {    
        const answers = []
        for (let i = 0; i < questions.length; i++) {
            answers.push(formData.get(`question-${i}`))
        }
        retrieveAnswers(answers)
    }

    function handleTimeUp() {
        // Auto-submit the form when time is up
        if (formRef.current) {
            const formData = new FormData(formRef.current)
            handleSubmit(formData)
        }
    }

    function handleChangeSettings() {
        if (window.confirm(t('questions.confirmChange'))) {
            setScene('settings')
        }
    }

    return (
        <section aria-labelledby="quiz-heading">
            <h2 id="quiz-heading" className="sr-only">Quiz Questions</h2>

            {quizSettings.mode === 'timed' && (
                <div className="timer-container">
                    <Timer totalSeconds={totalTime} onTimeUp={handleTimeUp} />
                </div>
            )}

            <form ref={formRef} action={handleSubmit} aria-label={t('questions.formLabel', { count: quizSettings.amount })}>
                {questionElements}
                <div className="action-buttons">
                    <button 
                        type="button"
                        className="change-settings-btn" 
                        onClick={handleChangeSettings}
                        aria-label={t('common.changeSettings')}
                    >
                        {t('common.changeSettings')}
                    </button>
                    <button 
                        type='submit' 
                        className="submit-btn" 
                        aria-label={t('common.submitAnswers')}
                    >
                        {t('common.submitAnswers')}
                    </button>
                </div>
            </form>
        </section>
    )
}