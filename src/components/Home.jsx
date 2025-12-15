export default function Home(props) {
  return (
    <section className="home-container" aria-labelledby="app-title">
      <h1 id="app-title">Quizzical</h1>
      <p>Your ultimate quiz experience</p>
      <button className="start-quiz-button" onClick={props.onClick} aria-label="Start a new quiz">Start Quiz</button>
    </section>
  )
}