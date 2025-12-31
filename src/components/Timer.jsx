import { useState, useEffect, useRef } from "react"
import useSoundEffects from "../hooks/useSoundEffects"

export default function Timer({ totalSeconds, onTimeUp }) {
    const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
    const { playSound } = useSoundEffects()
    const warningSoundPlayed = useRef(false)

    useEffect(() => {
        if (secondsLeft <= 0) {
            onTimeUp()
            return
        }

        // Play warning sound once when 17 seconds are left
        if (secondsLeft === 17 && !warningSoundPlayed.current) {
            playSound('timerWarning')
            warningSoundPlayed.current = true
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