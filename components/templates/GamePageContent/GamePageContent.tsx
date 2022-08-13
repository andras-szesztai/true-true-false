import { useWindowSize } from 'react-use'
import { Role, RoundStage } from '@prisma/client'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { RoomSlugSizes, RoomSlugText } from 'components/atoms/RoomSlugText'
import { PlayerTileSize } from 'components/molecules/PlayerTile'
import { AdminButton } from 'components/molecules/AdminButton'
import { PlayersBoard } from 'components/organisms/PlayersBoard'
import { StatementSelectionBoard } from 'components/organisms/StatementSelectionBoard'
import { StatementRevealBoard } from 'components/organisms/StatementRevealBoard'
import { designTokens } from 'styles/designTokens'

import { getAdminButtonProps } from './utils'
import { Props } from './types'
import {
    useCalculatePoints,
    useFetchSelectedPlayerStatementsQuestion,
    useFetchSelectedPlayerStatementsReveal,
    useUpdatePlayerPointsRequest,
} from './hooks'

const { breakPoints } = designTokens

// TODO
// 1. Store how many questions are left in the room (managed by admin with - button) visible to everyone
// 2. Admin clicks "next" (if there is anyone not done yet) - Otherwise changes stage to END page

const GamePageContent = ({ room, player, players }: Props) => {
    const { selectedPlayerId, slug: roomSlug, roundStage } = room
    const { width } = useWindowSize()
    const isMobileSize = width <= breakPoints.md

    const { statementsData, statementsError } =
        useFetchSelectedPlayerStatementsQuestion(selectedPlayerId, roomSlug)

    const { revealData, revealError } = useFetchSelectedPlayerStatementsReveal(
        selectedPlayerId,
        roundStage,
        roomSlug
    )

    const points = useCalculatePoints(revealData)

    const { updateScoresSuccess, updateScoresError } =
        useUpdatePlayerPointsRequest(room, player, players, points, revealData)

    const isAllPlayersReady = !players
        .filter((d) => d.id !== player.id)
        .some((d) => d.showLoading)
    const isCurrentPlayerSelected = player.id === selectedPlayerId
    const isPlayerReadyWithAnswer = isCurrentPlayerSelected
        ? isAllPlayersReady
        : !!player.selectedAnswerId
    const selectedPlayer = players.find((p) => p.id === selectedPlayerId)

    return (
        <HomeContentContainer>
            <RoomSlugText slug={roomSlug} size={RoomSlugSizes.md} />
            <PlayersBoard
                player={player}
                players={players}
                size={PlayerTileSize.md}
                isFixed={!isMobileSize}
                fullWidth
                displayScore
            />
            {roundStage === RoundStage.IDLE && player.role === Role.USER && (
                <ScreenMessage text="Waiting for Admin to Start First Round ⏳" />
            )}
            {roundStage === RoundStage.QUESTION && (
                // TODO See if prop types can be shared?
                <StatementSelectionBoard
                    statements={statementsData}
                    error={statementsError}
                    roomSlug={roomSlug}
                    playerSlug={player.slug}
                    isPlayerReady={isPlayerReadyWithAnswer}
                    isAllReady={isAllPlayersReady}
                    selectedPlayer={selectedPlayer}
                    isCurrentPlayerSelected={isCurrentPlayerSelected}
                />
            )}
            {(roundStage === RoundStage.QUESTION_END ||
                roundStage === RoundStage.GUESS_REVEAL ||
                roundStage === RoundStage.FALSE_REVEAL ||
                roundStage === RoundStage.SCORE_REVEAL ||
                roundStage === RoundStage.SCORING) && (
                <StatementRevealBoard
                    statementsData={statementsData}
                    revealData={revealData}
                    error={revealError || statementsError}
                    roundStage={roundStage}
                    players={players}
                    selectedPlayer={selectedPlayer}
                    points={points}
                />
            )}
            {player.role === Role.ADMIN && updateScoresError && (
                <ScreenMessage text="Something Went Wrong While Trying to Update Player Scores, Please Try Again" />
            )}
            {(roundStage === RoundStage.IDLE || isPlayerReadyWithAnswer) && (
                <AdminButton
                    {...getAdminButtonProps(
                        roundStage,
                        room.isLastRound,
                        !!updateScoresSuccess,
                        !!updateScoresError
                    )}
                    role={player.role}
                    isDisabled={false}
                    slug={roomSlug}
                />
            )}
        </HomeContentContainer>
    )
}

export default GamePageContent
