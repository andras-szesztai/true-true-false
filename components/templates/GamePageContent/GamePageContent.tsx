import { RoundStage } from '@prisma/client'
import { useAsync, useWindowSize } from 'react-use'
import { isNull } from 'lodash'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { RoomSlugSizes, RoomSlugText } from 'components/atoms/RoomSlugText'
import { PlayerTileSize } from 'components/molecules/PlayerTile'
import { AdminButton } from 'components/molecules/AdminButton'
import { PlayersBoard } from 'components/organisms/PlayersBoard'
import { GetStatementForQuestionResponse } from 'types/apiResponses'
import { designTokens } from 'styles/designTokens'

import { StatementSelectionBoard } from 'components/organisms/StatementSelectionBoard'
import { Props } from './types'

const { breakPoints } = designTokens

// TODO
// Get statements from selectedPlayerId and show on the screen
// 3. Store how many questions are left in the room (managed by admin with - button) visible to everyone
// 4. SelectedAnswer for each player stored when submit answer & showLoading set to false
// 5. Admin clicks reveal + add emojis on each statements as votes
// 6. Reveal which one was false (admin reveals - fetch isTrue statements for currentPlayerId)
// 7. Everyone gets or loses points (check submitted answers)
// 8. Player gets flag as 'done'
// 9. Admin clicks "next" (if there is anyone not done yet) - Otherwise changes stage to END page

const GamePageContent = ({ room, player, players }: Props) => {
    const { width } = useWindowSize()
    const isMobileSize = width <= breakPoints.md

    const shouldAdminButtonShow = () => {
        if (room.roundStage === RoundStage.SCORING) return true
    }

    const getAdminButtonText = () => {
        if (
            room.roundStage === RoundStage.SCORING &&
            isNull(room.selectedPlayerId)
        )
            return 'Start First Round'
        return 'Default'
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
            {shouldAdminButtonShow() && (
                <AdminButton
                    text={getAdminButtonText()}
                    role={player.role}
                    isDisabled={false}
                    slug={room.slug}
                    apiRoute="/start-round"
                />
            )}
            <StatementSelectionBoard
                statements={currStatements.value}
                isLoading={currStatements.loading}
                error={currStatements.error}
            />
        </HomeContentContainer>
    )
}

export default GamePageContent
