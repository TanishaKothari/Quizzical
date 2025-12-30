import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext.jsx"

export default function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button 
            type="button" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="theme-toggle-btn"
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    )
}