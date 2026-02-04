import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { QuizContext } from '../contexts/QuizContext'

export default function Settings() {
    const { startNewGame, setScene } = useContext(QuizContext)
    const { t } = useTranslation()
    
    function handleSubmit(formData) {
        const numberOfQuestions = formData.get('number-of-questions')
        const category = formData.get('category-select')
        const difficulty = formData.get('difficulty-select')
        const mode = formData.get('timed-select')
        startNewGame(numberOfQuestions, category, difficulty, mode)
    }

    return (
        <form action={handleSubmit} className="settings-container" aria-labelledby="settings-title">
            <button 
                type="button"
                className="back-btn" 
                onClick={() => setScene('home')}
                aria-label={t('common.home')}
            >
                {t('common.home')}
            </button>
            
            <h2 id="settings-title">{t('settings.heading')}</h2>
            <div className="setting-item">
                <label htmlFor="number-of-questions">{t('settings.numberOfQuestions')}</label>
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
                <label htmlFor="category-select">{t('settings.category')}</label>
                <select
                    id="category-select"
                    name="category-select"
                    defaultValue="any"
                >
                    <option value="any">{t('settings.anyCategory')}</option>
                    <option value="9">{t('settings.categories.generalKnowledge')}</option>
                    <option value="10">{t('settings.categories.books')}</option>
                    <option value="11">{t('settings.categories.film')}</option>
                    <option value="12">{t('settings.categories.music')}</option>
                    <option value="13">{t('settings.categories.musicals')}</option>
                    <option value="14">{t('settings.categories.television')}</option>
                    <option value="15">{t('settings.categories.videoGames')}</option>
                    <option value="16">{t('settings.categories.boardGames')}</option>
                    <option value="17">{t('settings.categories.science')}</option>
                    <option value="18">{t('settings.categories.computers')}</option>
                    <option value="19">{t('settings.categories.mathematics')}</option>
                    <option value="20">{t('settings.categories.mythology')}</option>
                    <option value="21">{t('settings.categories.sports')}</option>
                    <option value="22">{t('settings.categories.geography')}</option>
                    <option value="23">{t('settings.categories.history')}</option>
                    <option value="24">{t('settings.categories.politics')}</option>
                    <option value="25">{t('settings.categories.art')}</option>
                    <option value="26">{t('settings.categories.celebrities')}</option>
                    <option value="27">{t('settings.categories.animals')}</option>
                    <option value="28">{t('settings.categories.vehicles')}</option>
                    <option value="29">{t('settings.categories.comics')}</option>
                    <option value="30">{t('settings.categories.gadgets')}</option>
                    <option value="31">{t('settings.categories.anime')}</option>
                    <option value="32">{t('settings.categories.cartoons')}</option>
                </select>
            </div>
            <div className="setting-item">
                <label htmlFor="difficulty-select">{t('settings.difficulty')}</label>
                <select
                    id="difficulty-select"
                    name="difficulty-select"
                    defaultValue="any"
                >
                    <option value="any">{t('settings.anyDifficulty')}</option>
                    <option value="easy">{t('settings.difficultyEasy')}</option>
                    <option value="medium">{t('settings.difficultyMedium')}</option>
                    <option value="hard">{t('settings.difficultyHard')}</option>
                </select>
            </div>
            <div className="setting-item">
                <label htmlFor="timed-select">{t('settings.mode')}</label>
                <select
                    id="timed-select"
                    name="timed-select"
                    defaultValue="untimed"
                >
                    <option value="untimed">{t('settings.untimed')}</option>
                    <option value="timed">{t('settings.timed')}</option>
                </select>
            </div>
            <button type="submit">{t('settings.start')}</button>
        </form>
    )
}