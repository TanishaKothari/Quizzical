# Quizzical 🎯

A fun and interactive quiz application built with React that tests your knowledge across various topics. Customize your quiz experience and challenge yourself!

🔗 **[Live Demo](https://quizzical-gold-three.vercel.app/)**

## Features

- **Customizable Quiz Settings**: Choose from 1-50 questions, 30+ categories, and 3 difficulty levels
- **Timed Mode**: Challenge yourself with a countdown timer
- **Question Bookmarking**: Save interesting questions to review later, persisted via localStorage
- **Dynamic Quiz Generation**: Fetches questions from the Open Trivia Database API
- **Interactive UI**: Clean, modern interface with smooth transitions
- **Sound Effects**: Audio feedback for game start, answer selection, timer warning, win, and lose events
- **Dark Mode Support**: Toggle between light and dark themes
- **Instant Feedback**: See correct and incorrect answers highlighted after submission
- **Score Tracking**: Get your final score and replay as many times as you want, with different question sets each time
- **Social Sharing**: Share your scores on X, Facebook, WhatsApp, or copy to clipboard
- **Randomized Answers**: Answer options are shuffled using the Fisher-Yates algorithm for fairness
- **Multi-language**: English base plus auto-generated locales; shows an AI translation disclaimer for non-English languages
- **Fully Accessible**: Keyboard navigation, screen reader support, and comprehensive ARIA labels
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## Demo

The app has five main screens:
1. **Home Screen**: Welcome page with a "Start Quiz" button
2. **Settings Screen**: Customize your quiz (number of questions, category, difficulty)
3. **Questions Screen**: Interactive quiz with multiple-choice questions
4. **Answers Screen**: Review your answers with correct/incorrect highlighting and your final score
5. **Bookmarks Screen**: Review your saved questions and their correct answers

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Compatible**: Comprehensive ARIA labels and semantic HTML
- **Focus Management**: Proper focus order and visual feedback
- **Descriptive Labels**: Clear context for all interactive elements
- **Live Regions**: Dynamic content updates announced to assistive technologies
- **Theme Toggle**: Accessible dark mode toggle with clear state indication

## Technologies Used

- **React 19.2.0**: UI components and state management
- **Context API**: Global theme state management
- **Local Storage API**: Persistent storage for user bookmarks
- **React Share**: Social media sharing functionality
- **Vite**: Fast build tool and dev server
- **HTML Entities**: Decoding special characters from API responses
- **Open Trivia Database API**: Question source
- **CSS3**: Custom styling with accessible focus states and dark mode support
- **HTML5 Audio API**: Sound effects for enhanced user experience
- **Clipboard API**: Copy-to-clipboard functionality
- **i18next + react-i18next**: UI translations and local management
- **MyMemory Translation API**: Machine translation API for questions/options and locale generation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TanishaKothari/Quizzical
cd Quizzical
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
Quizzical/
├── src/
│   ├── components/
│   │   ├── Home.jsx              # Landing page component
│   │   ├── Settings.jsx          # Quiz customization form
│   │   ├── Questions.jsx         # Quiz questions display with timer
│   │   ├── Answers.jsx           # Answer review with scoring and sharing
│   │   ├── Bookmarks.jsx         # Saved questions review screen
│   │   ├── QuestionBlock.jsx     # Reusable question/answer component (memoized)
│   │   ├── ThemeToggle.jsx       # Dark mode toggle button
│   │   ├── Timer.jsx             # Countdown timer component
│   │   └── LanguageSwitcher.jsx  # Language change option
│   ├── contexts/
│   │   ├── QuizContext.jsx       # Quiz state management with Context API
│   │   └── ThemeContext.jsx      # Theme state management with Context API
│   ├── hooks/
│   │   └── useSoundEffects.jsx   # Custom hook for sound effects (lazy loading)
│   ├── scripts/
│   │   └── generate-locale.js    # Script to auto-generate translations
│   ├── locales/
│   │   └── en.json               # English (base) strings for translation
│   │   └── es.json               # Spanish (generated) translation
│   ├── i18n.js                   # i18next initialization and resources
│   ├── App.jsx                   # Main app component with scene routing
│   ├── App.css                   # Global styles with dark mode support
│   └── main.jsx                  # React app entry point with providers
├── public/
│   └── sounds/                   # Audio files for game events
│       ├── start.wav
│       ├── win.wav
│       ├── lose.wav
│       ├── select.wav
│       └── timer-warning.mp3
├── index.html                    # HTML template
├── package.json                  # Project dependencies
└── vite.config.js                # Vite configuration
```

## How It Works

1. **State Management**: The app uses React hooks (`useState`) to manage the current scene (home/settings/questions/answers), loading state, questions data, selected answers, and quiz settings
2. **Theme Management**: Context API provides global theme state accessible to all components
3. **API Integration**: Questions are fetched from `https://opentdb.com/api.php` with parameters for amount, category, difficulty, and type (multiple choice)
4. **Timer System**: In timed mode, a countdown timer allocates 20 seconds per question and auto-submits when time expires
5. **Answer Shuffling**: The Fisher-Yates algorithm shuffles answer options once when fetching questions, ensuring consistent order across Questions and Answers screens
6. **Form Handling**: Uses React's form action to collect user answers
7. **Score Calculation**: Compares selected answers with correct answers to display the final score
8. **Sound Effects**: Lazy-loaded audio files provide feedback for game start, answer selection, timer warning, perfect scores (win), and failing scores (lose)
9. **Social Sharing**: Uses react-share library for platform-specific sharing and Clipboard API for copy functionality
10. **Translation Flow**:
  - User selects language via [LanguageSwitcher](src/components/LanguageSwitcher.jsx)
  - UI strings loaded from pre-generated locale files via i18next
  - Quiz questions/answers translated in real-time via MyMemory Translation API
  - Translated content cached in state for the session
11. **Performance**: Uses `memo`, `useMemo`, and `useCallback` to optimize rendering and prevent unnecessary calculations
12. **Accessibility**: Implements proper ARIA attributes, semantic HTML, keyboard support, and screen reader compatibility
13. **Persistence**: Bookmarks are saved to the browser's `localStorage`, allowing them to persist across sessions.

## Categories Available

- General Knowledge
- Books
- Film
- Music
- Television
- Video Games
- Science & Nature
- Computers
- Mathematics
- Sports
- Geography
- History
- And 12 more!

## Known Limitations

- **Translation Quality**: AI translations may have inaccuracies; disclaimer displayed for non-English languages
- **Rate Limits**: MyMemory API free tier limited to 1000 requests/day; translations may fail if limit exceeded

## Acknowledgments

- Questions provided by [Open Trivia Database](https://opentdb.com/)
- Fonts from [Google Fonts](https://fonts.google.com/) (Inter & Karla)
- Social sharing powered by [react-share](https://github.com/nygardk/react-share)
- Translation powered by [MyMemory Translation API](https://mymemory.translated.net/)