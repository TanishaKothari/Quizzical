import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeProvider from './contexts/ThemeContext.jsx'
import QuizProvider from './contexts/QuizContext.jsx'
import App from './App.jsx'
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <QuizProvider>
      <App />
      </QuizProvider>
    </ThemeProvider>
  </StrictMode>,
)
