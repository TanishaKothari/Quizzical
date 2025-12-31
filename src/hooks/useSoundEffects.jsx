import { useRef, useCallback } from 'react'

export default function useSoundEffects() {
    const soundsRef = useRef({
        start: null,
        win: null,
        lose: null
    })

    const playSound = useCallback((soundType) => {
        // Lazy load only the specific sound that's needed
        if (!soundsRef.current[soundType]) {
            const soundPaths = {
                start: '/sounds/start.wav',
                win: '/sounds/win.wav',
                lose: '/sounds/lose.wav'
            }

            const audio = new Audio(soundPaths[soundType])
            audio.volume = 0.5
            soundsRef.current[soundType] = audio
        }

        const sound = soundsRef.current[soundType]
        if (sound) {
            // Reset to start if already playing
            sound.currentTime = 0
            sound.play().catch(err => {
                console.error(`Error playing sound ${soundType}:`, err)
            })
        }
    }, [])

    return { playSound }
}