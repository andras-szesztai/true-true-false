import { Role, RoundStage } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

import {
    GetRevealAnswerResponse,
    GetRevealAnswerResponseSuccess,
    GetRoomResponseSuccess,
    GetStatementForQuestionResponse,
    GetStatementForQuestionResponseSuccess,
} from 'types/apiResponses'
import { PlayerPoint, Points } from 'types/points'
import { fetcher } from 'utils/fetcher'

import { usePrevious } from 'react-use'
import { getSelectedPlayerScore } from './utils'
import { Props } from './types'

export const useCalculatePoints = (
    revealData: GetRevealAnswerResponseSuccess | null
) => {
    const [points, setPoints] = useState<{
        selectedPlayer: number
        correctlyGuessed: number
        falselyGuessed: number
    } | null>(null)
    useEffect(() => {
        if (revealData && !points) {
            const validGuesses = revealData.guesses.filter(
                (g) => !!g.selectedAnswerId
            )
            const correctlyGuessedLength = validGuesses.filter(
                (d) => d.selectedAnswerId === revealData.falseStatement.id
            ).length
            const falselyGuessedLength = validGuesses.filter(
                (d) => d.selectedAnswerId !== revealData.falseStatement.id
            ).length
            setPoints({
                selectedPlayer: getSelectedPlayerScore(
                    validGuesses.map((d) => d.selectedAnswerId)
                ),
                correctlyGuessed:
                    correctlyGuessedLength && 1 + falselyGuessedLength,
                falselyGuessed:
                    falselyGuessedLength && -1 - correctlyGuessedLength,
            })
        }
    }, [revealData, points])

    return points
}

export const useFetchSelectedPlayerStatementsQuestion = (
    selectedPlayerId: GetRoomResponseSuccess['selectedPlayerId'],
    roomSlug: GetRoomResponseSuccess['slug']
) => {
    const [error, setError] = useState('')
    const [data, setData] =
        useState<null | GetStatementForQuestionResponseSuccess>(null)
    const prevSelectedPlayerId = usePrevious(selectedPlayerId)
    useSWR<GetStatementForQuestionResponse>(
        selectedPlayerId
            ? `/api/room/${roomSlug}/statement/${selectedPlayerId}/for-question`
            : null,
        fetcher,
        {
            onSuccess: (data) => {
                if ('error' in data) {
                    setData(null)
                    setError(data.error)
                } else {
                    setError('')
                    setData(data)
                }
            },
            onError: (err) => {
                setData(null)
                setError(err.message)
            },
            isPaused: () => selectedPlayerId === prevSelectedPlayerId,
        }
    )
    return { statementsError: error, statementsData: data }
}

export const useFetchSelectedPlayerStatementsReveal = (
    selectedPlayerId: GetRoomResponseSuccess['selectedPlayerId'],
    roundStage: GetRoomResponseSuccess['roundStage'],
    roomSlug: GetRoomResponseSuccess['slug']
) => {
    const shouldFetch =
        roundStage === RoundStage.QUESTION_END ||
        roundStage === RoundStage.GUESS_REVEAL ||
        roundStage === RoundStage.FALSE_REVEAL ||
        roundStage === RoundStage.SCORE_REVEAL ||
        roundStage === RoundStage.SCORING
    const prevShouldFetch = usePrevious(shouldFetch)
    const [error, setError] = useState('')
    const [data, setData] = useState<null | GetRevealAnswerResponseSuccess>(
        null
    )
    useSWR<GetRevealAnswerResponse>(
        shouldFetch
            ? `/api/room/${roomSlug}/statement/${selectedPlayerId}/for-reveal`
            : null,
        fetcher,
        {
            onSuccess: (data) => {
                if ('error' in data) {
                    setData(null)
                    setError(data.error)
                } else {
                    setError('')
                    setData(data)
                }
            },
            onError: (err) => {
                setData(null)
                setError(err.message)
            },
            isPaused: () => shouldFetch === prevShouldFetch,
        }
    )
    return { revealError: error, revealData: data }
}

export const useUpdatePlayerPointsRequest = (
    room: Props['room'],
    player: Props['player'],
    players: Props['players'],
    points: Points,
    revealData: GetRevealAnswerResponseSuccess | null
) => {
    const shouldFetch =
        room.roundStage === RoundStage.SCORING &&
        points &&
        player.role === Role.ADMIN &&
        revealData
    const prevShouldFetch = usePrevious(shouldFetch)
    const playerPoints = useMemo(() => {
        let newPlayerPoints: PlayerPoint[] = []
        if (shouldFetch) {
            const { guesses, falseStatement } = revealData
            newPlayerPoints = players.map((d) => {
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
                const newScore = d.score + pointsToReceive
                return { playerId: d.id, score: newScore < 0 ? 0 : newScore }
            })
        }
        return newPlayerPoints
    }, [room, points, players, revealData, shouldFetch])

    const [error, setError] = useState('')
    const [data, setData] = useState<null | { success: true }>(null)
    useSWR<{ success: true } | { error: string }>(
        shouldFetch
            ? `/api/room/${room.slug}/player/${player.slug}/update-points`
            : null,
        (url) =>
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playerPoints),
            }).then((res) => res.json()),
        {
            onSuccess: (data) => {
                if ('error' in data) {
                    setData(null)
                    setError(data.error)
                } else {
                    setError('')
                    setData(data)
                }
            },
            onError: (err) => {
                setData(null)
                setError(err.message)
            },
            isPaused: () => shouldFetch === prevShouldFetch,
        }
    )

    return { updateScoresSuccess: data, updateScoresError: error }
}
