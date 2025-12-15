import { decode } from 'html-entities';

export default function QuestionBlock(props) {
    function getAnswerInfo(answer) {
        if (!props.showResults) return { className: '', ariaLabel: undefined }
        if (answer === props.questionObj.correct_answer) {
            return {
                className: 'correct-answer',
                ariaLabel: `${decode(answer)} - Correct answer`
            }
        }
        if (props.selectedAnswer === answer) {
            return {
                className: 'wrong-answer',
                ariaLabel: `${decode(answer)} - Your incorrect answer`
            }
        }
        return {
            className: 'unselected-answer',
            ariaLabel: `${decode(answer)} - Not selected`
        }
    }

    return (
        <div>
            <fieldset className="question-block" aria-labelledby={`question-${props.index}-legend`}>
                <legend id={`question-${props.index}-legend`}>
                    <h3>
                        <span className="sr-only">Question {props.index + 1}: </span>
                        {decode(props.questionObj.question)}
                    </h3>
                </legend>
                <div className="answers-container"
                    role={props.showResults ? "list" : "radiogroup"}
                    aria-label={props.showResults ? "Answer options with results" : "Select one answer"}
                >
                    {props.questionObj.allAnswers.map((answer, idx) => {
                        const answerInfo = getAnswerInfo(answer)

                        return (
                            <div key={idx} role={props.showResults ? "listitem" : undefined}>
                                {props.showResults ? (
                                    // Render as disabled button for results view
                                    <button disabled className={answerInfo.className} aria-label={answerInfo.ariaLabel} aria-disabled="true">
                                        {decode(answer)}
                                    </button>
                                ) : (
                                    // Render as radio input for question view
                                    <>
                                        <input type='radio' id={`${props.index}-${idx}`} name={`question-${props.index}`} value={decode(answer)} required aria-required="true" />
                                        <label
                                            htmlFor={`${props.index}-${idx}`}
                                            tabIndex={0} 
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault()
                                                    document.getElementById(`${props.index}-${idx}`).click()
                                                }
                                            }}
                                        >
                                            {decode(answer)}
                                        </label>
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </fieldset>
            <hr aria-hidden="true" />
        </div>
    )
}