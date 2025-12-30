import { useContext } from 'react'
import { QuizContext } from '../contexts/QuizContext'

export default function Settings() {
    const { startNewGame } = useContext(QuizContext)

    function handleSubmit(formData) {
        const numberOfQuestions = formData.get('number-of-questions')
        const category = formData.get('category-select')
        const difficulty = formData.get('difficulty-select')
        const mode = formData.get('timed-select')
        startNewGame(numberOfQuestions, category, difficulty, mode)
    }

    return (
        <form action={handleSubmit} className="settings-container" aria-labelledby="settings-title">
            <h2 id="settings-title">Settings</h2>
            <div className="setting-item">
                <label htmlFor="number-of-questions">Number of Questions:</label>
                <input
                    type="number"
                    id="number-of-questions"
                    name="number-of-questions"
                    defaultValue={5}
                    min="1"
                    max="50"
                />
            </div>
            <div className="setting-item">
                <label htmlFor="category-select">Category:</label>
                <select
                    id="category-select"
                    name="category-select"
                    defaultValue="any"
                >
                    <option value="any">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Books</option>
                    <option value="11">Film</option>
                    <option value="12">Music</option>
                    <option value="13">Musicals & Theatres</option>
                    <option value="14">Television</option>
                    <option value="15">Video Games</option>
                    <option value="16">Board Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Computers</option>
                    <option value="19">Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Comics</option>
                    <option value="30">Gadgets</option>
                    <option value="31">Japanese Anime & Manga</option>
                    <option value="32">Cartoon & Animations</option>
                </select>
            </div>
            <div className="setting-item">
                <label htmlFor="difficulty-select">Difficulty:</label>
                <select
                    id="difficulty-select"
                    name="difficulty-select"
                    defaultValue="any"
                >
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div className="setting-item">
                <label htmlFor="timed-select">Mode:</label>
                <select
                    id="timed-select"
                    name="timed-select"
                    defaultValue="untimed"
                >
                    <option value="untimed">Untimed</option>
                    <option value="timed">Timed</option>
                </select>
            </div>
            <button type="submit">Start Quiz</button>
        </form>
    )
}