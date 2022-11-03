import { Role, RoundStage } from '@prisma/client'
import { useWindowSize } from 'react-use'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { RoomSlugSizes, RoomSlugText } from 'components/atoms/RoomSlugText'
import { PlayerTileSize } from 'components/molecules/PlayerTile'
import { AdminButton } from 'components/molecules/AdminButton'
import { PlayersBoard } from 'components/organisms/PlayersBoard'
import { StatementSelectionBoard } from 'components/organisms/StatementSelectionBoard'
import { StatementRevealBoard } from 'components/organisms/StatementRevealBoard'
import { QuestionCounter } from 'components/organisms/QuestionCounter'
import { designTokens } from 'styles/designTokens'

import { getAdminButtonProps } from './utils'
import {
    useCalculatePoints,
    useFetchSelectedPlayerStatementsQuestion,
    useFetchSelectedPlayerStatementsReveal,
    useUpdatePlayerPointsRequest,
} from './hooks'
import { Props } from './types'

const GamePageContent = ({ room, player, players }: Props) => {
    const { width } = useWindowSize()
    const { selectedPlayerId, slug: roomSlug, roundStage } = room

    const { statementsData, statementsError } =
        useFetchSelectedPlayerStatementsQuestion(selectedPlayerId, roomSlug)
    const { revealData, revealError } = useFetchSelectedPlayerStatementsReveal(
        selectedPlayerId,
        roundStage,
        roomSlug
    )

    const points = useCalculatePoints(revealData, roundStage)
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
    const isMobileSize = width <= designTokens.breakPoints.md

    return (
        <HomeContentContainer>
            <RoomSlugText slug={roomSlug} size={RoomSlugSizes.md} />
            <PlayersBoard
                player={player}
                players={players}
                size={PlayerTileSize.md}
                fullWidth
                displayScore
                isFixed={!isMobileSize}
            />
            {roundStage === RoundStage.IDLE && player.role === Role.USER && (
                <ScreenMessage text="Waiting for Admin to Start First Round ⏳" />
            )}
            {roundStage === RoundStage.QUESTION && (
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
                    slug={roomSlug}
                />
            )}
            {roundStage !== RoundStage.IDLE && (
                <QuestionCounter
                    questionsLeft={room.questionsLeft}
                    roomSlug={roomSlug}
                    playerRole={player.role}
                    adminButtonIsEnabled={roundStage === RoundStage.QUESTION}
                />
            )}
        </HomeContentContainer>
    )
}

export default GamePageContent
