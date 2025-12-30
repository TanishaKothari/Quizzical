import { useState, useEffect } from "react"

export default function Timer({ totalSeconds, onTimeUp }) {
    const [secondsLeft, setSecondsLeft] = useState(totalSeconds)

    useEffect(() => {
        if (secondsLeft <= 0) {
            onTimeUp()
            return
        }

        const timer = setInterval(() => {
            setSecondsLeft(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [secondsLeft, onTimeUp])

    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft % 60

    // Change color when time is running low
    const isLowTime = secondsLeft <= 30
    const isCritical = secondsLeft <= 10

    return (
        <div
            className={`timer ${isLowTime ? 'timer-warning' : ''} ${isCritical ? 'timer-critical' : ''}`}
            role="timer" 
            aria-live="polite"
            aria-label={`Time remaining: ${minutes} minutes and ${seconds} seconds`}
        >
            <span className="timer-icon">⏱️</span>
            <span className="timer-text">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
        </div>
    )
}