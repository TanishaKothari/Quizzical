import QuestionBlock from "./QuestionBlock"

export default function Questions(props) {
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

    return (
        <section aria-labelledby="quiz-heading">
            <h2 id="quiz-heading" className="sr-only">Quiz Questions</h2>
            <form action={handleSubmit} aria-label="Quiz form with 5 questions">
                {questions}
                <div style={{textAlign: 'center'}}>
                    <button type='submit' className="submit-btn" aria-label="Submit your answers and see results">Check Answers</button>
                </div>
            </form>
        </section>
    )
}