import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
    const { i18n } = useTranslation()

    return (
        <select
            aria-label="Select language"
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
            style={{ position: 'fixed', top: 20, left: 20, zIndex: 1000 }}
        >
            <option value="en">English</option>
            <option value="es">Español</option>
        </select>
    )
}