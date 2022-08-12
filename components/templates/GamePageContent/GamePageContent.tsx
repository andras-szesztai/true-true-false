import { useAsync, useWindowSize } from 'react-use'
import { Role, RoundStage } from '@prisma/client'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
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

import { getAdminButtonProps } from './utils'
import { Props } from './types'

const { breakPoints } = designTokens

// TODO
// 1. Store how many questions are left in the room (managed by admin with - button) visible to everyone
// 2. Everyone gets or loses points (check submitted answers)
// 3. Admin clicks "next" (if there is anyone not done yet) - Otherwise changes stage to END page

const GamePageContent = ({ room, player, players }: Props) => {
    const { width } = useWindowSize()
    const isMobileSize = width <= breakPoints.md

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
    }, [room.selectedPlayerId, room.roundStage])

    const isAllPlayersReady = !players
        .filter((d) => d.id !== player.id)
        .some((d) => d.showLoading)
    const isCurrentPlayerStatements = player.id === room.selectedPlayerId
    const isPlayerReadyWithAnswer = isCurrentPlayerStatements
        ? isAllPlayersReady
        : !!player.selectedAnswerId
    const selectedPlayer = players.find((p) => p.id === room.selectedPlayerId)

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
            {room.roundStage === RoundStage.IDLE &&
                player.role === Role.USER && (
                    <ScreenMessage text="Waiting for Admin to Start First Round ⏳" />
                )}
            {room.roundStage === RoundStage.QUESTION && (
                <StatementSelectionBoard
                    isCurrentPlayerStatements={isCurrentPlayerStatements}
                    statements={statements.value}
                    isLoading={statements.loading}
                    error={statements.error}
                    roomSlug={room.slug}
                    playerSlug={player.slug}
                    isPlayerReady={isPlayerReadyWithAnswer}
                    isAllReady={isAllPlayersReady}
                    selectedPlayer={selectedPlayer}
                />
            )}
            {(room.roundStage === RoundStage.QUESTION_END ||
                room.roundStage === RoundStage.GUESS_REVEAL ||
                room.roundStage === RoundStage.FALSE_REVEAL ||
                room.roundStage === RoundStage.SCORE_REVEAL ||
                room.roundStage === RoundStage.SCORING) && (
                <StatementRevealBoard
                    roundStage={room.roundStage}
                    statements={statements.value}
                    revealAnswer={revealAnswer.value}
                    players={players}
                    isLoading={revealAnswer.loading}
                    error={revealAnswer.error}
                    selectedPlayer={selectedPlayer}
                />
            )}
            {(room.roundStage === RoundStage.IDLE ||
                isPlayerReadyWithAnswer) && (
                <AdminButton
                    {...getAdminButtonProps(room.roundStage, room.isLastRound)}
                    role={player.role}
                    isDisabled={false}
                    slug={room.slug}
                />
            )}
        </HomeContentContainer>
    )
}

export default GamePageContent
