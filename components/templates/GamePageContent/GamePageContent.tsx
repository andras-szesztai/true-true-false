import { RoomStage, RoundStage } from '@prisma/client'
import { useAsync, useWindowSize } from 'react-use'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { RoomSlugSizes, RoomSlugText } from 'components/atoms/RoomSlugText'
import { PlayerTileSize } from 'components/molecules/PlayerTile'
import { AdminButton } from 'components/molecules/AdminButton'
import { PlayersBoard } from 'components/organisms/PlayersBoard'
import { StatementSelectionBoard } from 'components/organisms/StatementSelectionBoard'
import { StatementRevealBoard } from 'components/organisms/StatementRevealBoard'
import {
    GetRevealAnswerResponse,
    GetStatementForQuestionResponse,
} from 'types/apiResponses'
import { designTokens } from 'styles/designTokens'

import { Props } from './types'

const { breakPoints } = designTokens

// TODO
// 0. Show selected Player on top of statements
// 0.5. Unable guessing if own statement
// 1. Store how many questions are left in the room (managed by admin with - button) visible to everyone
// 2. Admin clicks GUESS_REVEAL + add emojis on each statements as votes
// 3. Reveal which one was false (admin reveals - fetch isTrue statements for currentPlayerId)
// 4. Everyone gets or loses points (check submitted answers)
// 5. Player gets flag as 'isDone'
// 6. Admin clicks "next" (if there is anyone not done yet) - Otherwise changes stage to END page

const GamePageContent = ({ room, player, players }: Props) => {
    const { width } = useWindowSize()
    const isMobileSize = width <= breakPoints.md

    const getButtonProps = () => {
        if (room.roundStage === RoundStage.QUESTION) {
            return {
                text: 'End Questions Round',
                apiRoute: '/update-round-stage',
                postBody: { stage: RoundStage.QUESTION_END },
            }
        }
        if (room.roundStage === RoundStage.QUESTION_END) {
            return {
                text: 'Reveal Guesses',
                apiRoute: '/update-round-stage',
                postBody: { stage: RoundStage.GUESS_REVEAL },
            }
        }
        if (room.roundStage === RoundStage.GUESS_REVEAL) {
            return {
                text: 'Reveal False',
                apiRoute: '/update-round-stage',
                postBody: { stage: RoundStage.FALSE_REVEAL },
            }
        }
        if (room.roundStage === RoundStage.FALSE_REVEAL) {
            return {
                text: 'Calculate Scores',
                apiRoute: '/update-round-stage',
                postBody: { stage: RoundStage.SCORE_REVEAL },
            }
        }
        if (room.roundStage === RoundStage.SCORE_REVEAL) {
            return {
                text: 'Update Scores',
                apiRoute: '/update-round-stage',
                postBody: { stage: RoundStage.SCORING },
            }
        }
        if (room.roundStage === RoundStage.SCORING) {
            return room.isLastRound
                ? {
                      text: 'End Game',
                      apiRoute: '/update-room-stage',
                      postBody: { stage: RoomStage.END },
                  }
                : { text: 'Next Round', apiRoute: '/start-round' }
        }
        return { text: 'Start First Round', apiRoute: '/start-round' }
    }

    const statements = useAsync(async () => {
        if (room.selectedPlayerId) {
            const response = await fetch(
                `/api/room/${room.slug}/statement/${room.selectedPlayerId}/for-question`
            )
            const result: GetStatementForQuestionResponse =
                await response.json()
            return result
        }
    }, [room.selectedPlayerId])

    const revealAnswer = useAsync(async () => {
        if (
            room.roundStage === RoundStage.QUESTION_END ||
            room.roundStage === RoundStage.GUESS_REVEAL ||
            room.roundStage === RoundStage.FALSE_REVEAL ||
            room.roundStage === RoundStage.SCORE_REVEAL ||
            room.roundStage === RoundStage.SCORING
        ) {
            const response = await fetch(
                `/api/room/${room.slug}/statement/${room.selectedPlayerId}/for-reveal`
            )
            const result: GetRevealAnswerResponse = await response.json()
            return result
        }
    }, [room.selectedPlayerId])

    return (
        <HomeContentContainer>
            <RoomSlugText slug={room.slug} size={RoomSlugSizes.md} />
            <PlayersBoard
                player={player}
                players={players}
                size={PlayerTileSize.md}
                isFixed={!isMobileSize}
                fullWidth
                displayScore
            />
            {room.roundStage === RoundStage.QUESTION && (
                <StatementSelectionBoard
                    statements={statements.value}
                    isLoading={statements.loading}
                    error={statements.error}
                    roomSlug={room.slug}
                    playerSlug={player.slug}
                    isPlayerReady={!!player.selectedAnswerId}
                    isAllReady={!players.some((d) => d.showLoading)}
                />
            )}
            <StatementRevealBoard
                roundStage={room.roundStage}
                statements={statements.value}
                revealAnswer={revealAnswer.value}
                players={players}
                isLoading={revealAnswer.loading}
                error={revealAnswer.error}
            />
            {(room.roundStage === RoundStage.IDLE ||
                player.selectedAnswerId) && (
                <AdminButton
                    {...getButtonProps()}
                    role={player.role}
                    isDisabled={false}
                    slug={room.slug}
                />
            )}
        </HomeContentContainer>
    )
}

export default GamePageContent
