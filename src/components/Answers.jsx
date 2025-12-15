import QuestionBlock from "./QuestionBlock"

export default function Answers(props) {
    const questions = props.questions.map((questionObj, index) => {
        return <QuestionBlock 
            key={index} 
            questionObj={questionObj} 
            index={index} 
            showResults={true} 
            selectedAnswer={props.selectedAnswers[index]}
        />
    })

    function calculateScore() {
        let countCorrect = 0
        for (let i = 0; i < props.questions.length; i++) {
            if (props.selectedAnswers[i] === props.questions[i].correct_answer) {
                countCorrect++
            }
        }
        return countCorrect
    }

    return (
        <section aria-labelledby="results-heading">
            <h2 id="results-heading" className="sr-only">Quiz Results</h2>
            {questions}
            <div className='score-replay' role='region' aria-label='Quiz results and actions'>
                <h3 aria-live="polite">You scored {calculateScore()}/{props.questions.length} correct answers</h3>
                <button className="replay-btn" onClick={props.onClick} aria-label="Start a new quiz with different questions">Play Again</button>
            </div>
        </section>
    )
}