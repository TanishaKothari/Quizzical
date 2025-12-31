import { memo } from 'react';
import { decode } from 'html-entities';

function QuestionBlock({questionObj, index, showResults, selectedAnswer}) {
    function getAnswerInfo(answer) {
        if (!showResults) return { className: '', ariaLabel: undefined }
        if (answer === questionObj.correct_answer) {
            return {
                className: 'correct-answer',
                ariaLabel: `${answer} - Correct answer`
            }
        }
        if (selectedAnswer === answer) {
            return {
                className: 'wrong-answer',
                ariaLabel: `${answer} - Your incorrect answer`
            }
        }
        return {
            className: 'unselected-answer',
            ariaLabel: `${answer} - Not selected`
        }
    }

    return (
        <div>
            <fieldset className="question-block" aria-labelledby={`question-${index}-legend`}>
                <legend id={`question-${index}-legend`}>
                    <h3>
                        <span className="sr-only">Question {index + 1}: </span>
                        {questionObj.question}
                    </h3>
                </legend>
                <div className="answers-container"
                    role={showResults ? "list" : "radiogroup"}
                    aria-label={showResults ? "Answer options with results" : "Select one answer"}
                >
                    {questionObj.allAnswers.map((answer, idx) => {
                        const answerInfo = getAnswerInfo(answer)

                        return (
                            <div key={idx} role={showResults ? "listitem" : undefined}>
                                {showResults ? (
                                    // Render as disabled button for results view
                                    <button disabled className={answerInfo.className} aria-label={answerInfo.ariaLabel} aria-disabled="true">
                                        {answer}
                                    </button>
                                ) : (
                                    // Render as radio input for question view
                                    <>
                                        <input type='radio' id={`${index}-${idx}`} name={`question-${index}`} value={answer} required aria-required="true" />
                                        <label
                                            htmlFor={`${index}-${idx}`}
                                            tabIndex={0} 
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault()
                                                    document.getElementById(`${index}-${idx}`).click()
                                                }
                                            }}
                                        >
                                            {answer}
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

export default memo(QuestionBlock);