# Quizzical 🎯

A fun and interactive quiz application built with React that tests your knowledge on computer science topics. Challenge yourself with 5 medium-difficulty questions and see how well you score!

🔗 **[Live Demo](https://quizzical-gold-three.vercel.app/)**

## Features

- **Customizable Quiz Settings**: Choose from 1-50 questions, 30+ categories, and 3 difficulty levels
- **Dynamic Quiz Generation**: Fetches questions from the Open Trivia Database API
- **Interactive UI**: Clean, modern interface with smooth transitions
- **Instant Feedback**: See correct and incorrect answers highlighted after submission
- **Score Tracking**: Get your final score and replay as many times as you want, with different question sets each time
- **Randomized Answers**: Answer options are shuffled using the Fisher-Yates algorithm for fairness
- **Fully Accessible**: Keyboard navigation, screen reader support, and comprehensive ARIA labels
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## Demo

The app has four main screens:
1. **Home Screen**: Welcome page with a "Start Quiz" button
2. **Settings Screen**: Customize your quiz (number of questions, category, difficulty)
3. **Questions Screen**: Interactive quiz with multiple-choice questions
4. **Answers Screen**: Review your answers with correct/incorrect highlighting and your final score

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Compatible**: Comprehensive ARIA labels and semantic HTML
- **Focus Management**: Proper focus order and visual feedback
- **Descriptive Labels**: Clear context for all interactive elements
- **Live Regions**: Dynamic content updates announced to assistive technologies

## Technologies Used

- **React 19.2.0**: UI components and state management
- **Vite**: Fast build tool and dev server
- **HTML Entities**: Decoding special characters from API responses
- **Open Trivia Database API**: Question source
- **CSS3**: Custom styling with accessible focus states

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
│   │   ├── Home.jsx          # Landing page component
│   │   ├── Settings.jsx      # Quiz customization form
│   │   ├── Questions.jsx     # Quiz questions display
│   │   ├── Answers.jsx       # Answer review with scoring
│   │   └── QuestionBlock.jsx # Reusable question/answer component
│   ├── App.jsx               # Main app component with state management
│   ├── App.css               # Global styles
│   └── main.jsx              # React app entry point
├── public/                   # Static assets
├── index.html                # HTML template
├── package.json              # Project dependencies
└── vite.config.js            # Vite configuration
```

## How It Works

1. **State Management**: The app uses React hooks (`useState`) to manage the current scene (home/settings/questions/answers), loading state, questions data, selected answers, and quiz settings
2. **API Integration**: Questions are fetched from `https://opentdb.com/api.php` with parameters for amount, category, difficulty, and type (multiple choice)
3. **Answer Shuffling**: The Fisher-Yates algorithm shuffles answer options once when fetching questions, ensuring consistent order across Questions and Answers screens
4. **Form Handling**: Uses React's form action to collect user answers
5. **Score Calculation**: Compares selected answers with correct answers to display the final score
6. **Accessibility**: Implements proper ARIA attributes, semantic HTML, keyboard support, and screen reader compatibility

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

## Future Enhancements

- Timer mode for timed challenges
- Question bookmarking
- Dark mode support
- Social sharing of scores

## Acknowledgments

- Questions provided by [Open Trivia Database](https://opentdb.com/)
- Fonts from [Google Fonts](https://fonts.google.com/) (Inter & Karla)