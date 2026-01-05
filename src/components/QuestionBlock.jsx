import { memo, useContext } from 'react';
import { QuizContext } from '../contexts/QuizContext';
import useSoundEffects from '../hooks/useSoundEffects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

function QuestionBlock({questionObj, index, showResults, selectedAnswer}) {
    const { playSound } = useSoundEffects()
    const { bookmarks, toggleBookmark } = useContext(QuizContext)

    const isBookmarked = bookmarks.some(q => q.question === questionObj.question)

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
        <div className="question-container">
            <fieldset className="question-block" aria-labelledby={`question-${index}-legend`}>
                <div className="question-header">
                    <legend id={`question-${index}-legend`}>
                        <h3>
                            <span className="sr-only">Question {index + 1}: </span>
                            {questionObj.question}
                        </h3>
                    </legend>
                    <button 
                        type="button"
                        className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
                        onClick={() => toggleBookmark(questionObj)}
                        aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                        title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                    >
                        <FontAwesomeIcon icon={isBookmarked ? solidBookmark : regularBookmark} />
                    </button>
                </div>
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
                                        <input 
                                            type='radio' 
                                            id={`${index}-${idx}`} 
                                            name={`question-${index}`} 
                                            value={answer} 
                                            onChange={() => playSound('select')}
                                            required 
                                            aria-required="true" 
                                        />
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