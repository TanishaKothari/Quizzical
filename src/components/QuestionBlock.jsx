import { decode } from 'html-entities';

export default function QuestionBlock(props) {
    function getAnswerClass(answer) {
        if (!props.showResults) return ''
        if (answer === props.questionObj.correct_answer) return 'correct-answer'
        if (props.selectedAnswer === answer) return 'wrong-answer'
        return 'unselected-answer'
    }

    return (
        <div>
            <fieldset className="question-block">
                <h3>{decode(props.questionObj.question)}</h3>
                <div className="answers-container">
                    {props.questionObj.allAnswers.map((answer, idx) => (
                        <div key={idx}>
                            {props.showResults ? (
                                // Render as disabled button for results view
                                <button disabled className={getAnswerClass(answer)}>
                                    {decode(answer)}
                                </button>
                            ) : (
                                // Render as radio input for question view
                                <>
                                    <input type='radio' id={`${props.index}-${idx}`} name={`question-${props.index}`} value={decode(answer)} required />
                                    <label htmlFor={`${props.index}-${idx}`}>{decode(answer)}</label>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </fieldset>
            <hr />
        </div>
    )
}