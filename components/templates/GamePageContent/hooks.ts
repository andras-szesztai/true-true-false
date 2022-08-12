import { Role, RoundStage } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useAsync } from 'react-use'
import { AsyncState } from 'react-use/lib/useAsyncFn'

import { GetRevealAnswerResponse } from 'types/apiResponses'
import { Points } from 'types/points'

import { getSelectedPlayerScore } from './utils'
import { Props } from './types'

export const useCalculatePoints = (
    revealAnswer: GetRevealAnswerResponse | undefined
) => {
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

export const useUpdatePlayerPointsRequest = (
    room: Props['room'],
    player: Props['player'],
    players: Props['players'],
    points: Points,
    revealAnswer: AsyncState<GetRevealAnswerResponse | undefined>
) => {
    const updateScoresStatus = useAsync(async () => {
        if (
            room.roundStage === RoundStage.SCORING &&
            points &&
            player.role === Role.ADMIN &&
            revealAnswer.value &&
            'falseStatement' in revealAnswer.value
        ) {
            const { guesses, falseStatement } = revealAnswer.value
            const playerPoints = players.map((d) => {
                let pointsToReceive = points?.falselyGuessed
                const selectedAnswerId = guesses.find(
                    (g) => g.id === d.id
                )?.selectedAnswerId
                pointsToReceive = points?.falselyGuessed
                if (d.id === room.selectedPlayerId) {
                    pointsToReceive = points?.selectedPlayer
                }
                if (selectedAnswerId === falseStatement.id) {
                    pointsToReceive = points?.correctlyGuessed
                }
                return { playerId: d.id, score: d.score + pointsToReceive }
            })
            const response = await fetch(
                `/api/room/${room.slug}/player/${player.slug}/update-points`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(playerPoints),
                }
            )
            const result = await response.json()
            return result
        }
    }, [room.roundStage, revealAnswer.value, points])

    return updateScoresStatus
}
