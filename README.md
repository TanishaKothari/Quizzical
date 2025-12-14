# Quizzical 🎯

A fun and interactive quiz application built with React that tests your knowledge on computer science topics. Challenge yourself with 5 medium-difficulty questions and see how well you score!

## Features

- **Dynamic Quiz Generation**: Fetches questions from the Open Trivia Database API
- **Interactive UI**: Clean, modern interface with smooth transitions
- **Instant Feedback**: See correct and incorrect answers highlighted after submission
- **Score Tracking**: Get your final score and replay as many times as you want, with different question sets each time
- **Randomized Answers**: Answer options are shuffled using the Fisher-Yates algorithm for fairness

## Demo

The app has three main screens:
1. **Home Screen**: Welcome page with a "Start Quiz" button
2. **Questions Screen**: 5 multiple-choice questions about computer science
3. **Answers Screen**: Review your answers with correct/incorrect highlighting and your final score

## Technologies Used

- **React 19.2.0**: UI components and state management
- **Vite**: Fast build tool and dev server
- **HTML Entities**: Decoding special characters from API responses
- **Open Trivia Database API**: Question source
- **CSS3**: Custom styling

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
│   │   ├── Questions.jsx     # Quiz questions display
│   │   ├── Answers.jsx       # Answer review with scoring
│   │   └── QuestionBlock.jsx # Reusable question/answer component
│   ├── App.jsx               # Main app component with state management
│   ├── App.css               # Global styles
│   └── main.jsx              # React app entry point
├── public/                   # Static assets
├── index.html                # HTML template
└── package.json              # Project dependencies
```

## How It Works

1. **State Management**: The app uses React hooks (`useState`) to manage the current scene (home/questions/answers), loading state, questions data, and selected answers
2. **API Integration**: Questions are fetched from `https://opentdb.com/api.php` with parameters for amount, category (computer science), difficulty (medium), and type (multiple choice)
3. **Answer Shuffling**: The Fisher-Yates algorithm ensures random order of answer options
4. **Form Handling**: Uses React's form action to collect user answers
5. **Score Calculation**: Compares selected answers with correct answers to display the final score

## Upcoming Features

- **Improved Accessibility Support**: Enhanced keyboard navigation, screen reader compatibility, and ARIA labels for a more inclusive user experience
- **Customizable Quiz Settings**: Choose the number of questions (1-50)
- **Category Selection**: Pick from various trivia categories beyond computer science
- **Difficulty Levels**: Select easy, medium, or hard difficulty

## Acknowledgments

- Questions provided by [Open Trivia Database](https://opentdb.com/)
- Fonts from [Google Fonts](https://fonts.google.com/) (Inter & Karla)