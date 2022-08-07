import { RoundStage } from '@prisma/client'
import { useAsync, useAsyncFn, useWindowSize } from 'react-use'

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
// 1. Store how many questions are left in the room (managed by admin with - button) visible to everyone
// 2. Admin clicks reveal + add emojis on each statements as votes
// 3. Reveal which one was false (admin reveals - fetch isTrue statements for currentPlayerId)
// 4. Everyone gets or loses points (check submitted answers)
// 5. Player gets flag as 'done'
// 6. Admin clicks "next" (if there is anyone not done yet) - Otherwise changes stage to END page

const GamePageContent = ({ room, player, players }: Props) => {
    const { width } = useWindowSize()
    const isMobileSize = width <= breakPoints.md

    const [revealAnswerState, getRevealAnswer] = useAsyncFn(async () => {
        const response = await fetch(
            `/api/room/${room.slug}/statement/${room.selectedPlayerId}/for-reveal`
        )
        const result: GetRevealAnswerResponse = await response.json()
        return result
    }, [room.selectedPlayerId])

    const getButtonProps = () => {
        if (room.roundStage === RoundStage.QUESTIONING) {
            return {
                text: 'Reveal',
                onClick: getRevealAnswer,
                isLoading: revealAnswerState.loading,
                isSuccess:
                    revealAnswerState.value &&
                    'success' in revealAnswerState.value,
                error: revealAnswerState.error?.message,
            }
        }
        if (room.roundStage === RoundStage.SCORING) {
            return { text: 'Next Round', apiRoute: '/start-round' }
        }
        return { text: 'Start First Round', apiRoute: '/start-round' }
    }

    const currStatements = useAsync(async () => {
        if (room.selectedPlayerId) {
            const response = await fetch(
                `/api/room/${room.slug}/statement/${room.selectedPlayerId}/for-question`
            )
            const result: GetStatementForQuestionResponse =
                await response.json()
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
            {room.roundStage === RoundStage.QUESTIONING && (
                <StatementSelectionBoard
                    statements={currStatements.value}
                    isLoading={currStatements.loading}
                    error={currStatements.error}
                    roomSlug={room.slug}
                    playerSlug={player.slug}
                    isPlayerReady={!!player.selectedAnswerId}
                    isAllReady={!players.some((d) => d.showLoading)}
                />
            )}
            {room.roundStage === RoundStage.QUESS_REVEAL && (
                <StatementRevealBoard
                    statements={currStatements.value}
                    revealAnswer={revealAnswerState.value}
                    isLoading={revealAnswerState.loading}
                    error={revealAnswerState.error}
                />
            )}
            {(room.roundStage === RoundStage.IDLE || player.selectedAnswerId) &&
                room.roundStage !== RoundStage.QUESS_REVEAL && (
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
