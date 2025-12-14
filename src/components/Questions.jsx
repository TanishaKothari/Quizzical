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
        <form action={handleSubmit}>
            {questions}
            <div style={{textAlign: 'center'}}>
                <button type='submit' className="submit-btn">Check Answers</button>
            </div>
        </form>
    )
}