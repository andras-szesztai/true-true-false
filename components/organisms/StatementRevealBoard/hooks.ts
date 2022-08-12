import { useEffect, useState } from 'react'

import { getSelectedPlayerScore } from './utils'
import { Props } from './types'

export const useCalculatePoints = (revealAnswer: Props['revealAnswer']) => {
    const [points, setPoints] = useState<{
        selectedPlayer: number
        correctlyGuessed: number
        falselyGuessed: number
    } | null>(null)

    useEffect(() => {
        if (revealAnswer && 'guesses' in revealAnswer && !points) {
            const validGuesses = revealAnswer.guesses.filter(
                (g) => !!g.selectedAnswerId
            )
            const correctlyGuessedLength = validGuesses.filter(
                (d) => d.selectedAnswerId === revealAnswer.falseStatement.id
            ).length
            setPoints({
                selectedPlayer: getSelectedPlayerScore(
                    validGuesses.map((d) => d.selectedAnswerId)
                ),
                correctlyGuessed:
                    correctlyGuessedLength &&
                    validGuesses.filter(
                        (d) =>
                            d.selectedAnswerId !==
                            revealAnswer.falseStatement.id
                    ).length,
                falselyGuessed: -correctlyGuessedLength,
            })
        }
    }, [revealAnswer, points])

    return points
}
