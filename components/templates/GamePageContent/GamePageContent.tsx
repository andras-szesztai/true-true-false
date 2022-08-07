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
// 3. Store how many questions are left in the room (managed by admin with - button) visible to everyone
// 5. Admin clicks reveal + add emojis on each statements as votes
// 6. Reveal which one was false (admin reveals - fetch isTrue statements for currentPlayerId)
// 7. Everyone gets or loses points (check submitted answers)
// 8. Player gets flag as 'done'
// 9. Admin clicks "next" (if there is anyone not done yet) - Otherwise changes stage to END page

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
            }
        }
        if (room.roundStage === RoundStage.QUESS_REVEAL) {
            return {
                text: room.isLastRound ? 'See Final Scores' : 'Update Scores',
                apiRoute: '/start-round', // TODO Update
            }
        }
        if (room.roundStage === RoundStage.SCORING) {
            return { text: 'Next Round', apiRoute: '/start-round' }
        }
        return { text: 'Start First Round', apiRoute: '/start-round' }
    }

    const currStatements = useAsync(async () => {
        if (
            room.selectedPlayerId &&
            room.roundStage === RoundStage.QUESTIONING
        ) {
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
                />
            )}
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
