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
        <>
            {questions}
            <div className='score-replay'>
                <h3>You scored {calculateScore()}/{props.questions.length} correct answers</h3>
                <button className="replay-btn" onClick={props.onClick}>Play Again</button>
            </div>
        </>
    )
}