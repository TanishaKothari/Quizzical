import { useRef } from "react"
import QuestionBlock from "./QuestionBlock"
import Timer from "./Timer"

export default function Questions(props) {
    const formRef = useRef(null)

    // Calculate time: 20 seconds per question
    const SECONDS_PER_QUESTION = 20
    const totalTime = props.numberOfQuestions * SECONDS_PER_QUESTION

    const questions = props.questions.map((questionObj, index) => {
        return <QuestionBlock 
            key={index} 
            questionObj={questionObj} 
            index={index} 
            showResults={false} 
        />
    })

    function handleSubmit(formData) {    
        const answers = []
        for (let i = 0; i < props.questions.length; i++) {
            answers.push(formData.get(`question-${i}`))
        }
        props.onSubmit(answers)
    }

    function handleTimeUp() {
        // Auto-submit the form when time is up
        if (formRef.current) {
            const formData = new FormData(formRef.current)
            handleSubmit(formData)
        }
    }

    return (
        <section aria-labelledby="quiz-heading">
            <h2 id="quiz-heading" className="sr-only">Quiz Questions</h2>

            {props.isTimed && (
                <div style={{ textAlign: 'center' }}>
                    <Timer totalSeconds={totalTime} onTimeUp={handleTimeUp} />
                </div>
            )}

            <form ref={formRef} action={handleSubmit} aria-label={`Quiz form with ${props.numberOfQuestions} questions`}>
                {questions}
                <div style={{textAlign: 'center'}}>
                    <button type='submit' className="submit-btn" aria-label="Submit your answers and see results">Check Answers</button>
                </div>
            </form>
        </section>
    )
}