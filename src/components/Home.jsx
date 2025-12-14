export default function Home(props) {
  return (
    <div className="home-container">
      <h1>Quizzical</h1>
      <p>Your ultimate quiz experience</p>
      <button className="start-quiz-button" onClick={props.onClick}>Start Quiz</button>
    </div>
  )
}