import { SquareLoader } from 'react-spinners'
import { RoundStage } from '@prisma/client'

import { StatementContainer } from 'components/atoms/containers/StatementContainer'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { PlayerTile, PlayerTileSize } from 'components/molecules/PlayerTile'
import { GENERAL_ERROR } from 'constants/messages'
import { designTokens } from 'styles/designTokens'

import { Props } from './types'
import {
    GuessEmojiContainer,
    PlayerTileContainer,
    SelectedPlayerScoreContainer,
    StatementScoreContainer,
} from './styles'

const { color, space } = designTokens

const StatementRevealBoard = ({
    statements,
    revealAnswer,
    isLoading,
    error,
    roundStage,
    players,
    selectedPlayer,
    points,
}: Props) => {
    if (isLoading && !revealAnswer) {
        return <SquareLoader color={color.black} loading size={space.lg} />
    }

    if (!statements || error || !revealAnswer) {
        return <ScreenMessage text={error?.message || GENERAL_ERROR} />
    }

    if ('error' in revealAnswer) {
        return <ScreenMessage text={revealAnswer.error} />
    }

    if ('error' in statements) {
        return <ScreenMessage text={statements.error} />
    }

    return (
        <>
            {selectedPlayer && (
                <PlayerTileContainer>
                    <PlayerTile
                        name={selectedPlayer.name}
                        size={PlayerTileSize.lg}
                        emoji={selectedPlayer.emoji}
                        isOffline={false}
                    />
                    {roundStage === RoundStage.SCORE_REVEAL && (
                        <SelectedPlayerScoreContainer>
                            {points?.selectedPlayer ? '+' : ''}
                            {points?.selectedPlayer}
                        </SelectedPlayerScoreContainer>
                    )}
                </PlayerTileContainer>
            )}
            <div>
                {statements.map((s, i) => (
                    <StatementContainer
                        noBorderTop={!!i}
                        key={s.id}
                        isSelected={
                            (roundStage === RoundStage.FALSE_REVEAL ||
                                roundStage === RoundStage.SCORE_REVEAL ||
                                roundStage === RoundStage.SCORING) &&
                            s.id === revealAnswer.falseStatement.id
                        }
                    >
                        {roundStage === RoundStage.SCORE_REVEAL && (
                            <StatementScoreContainer>
                                {s.id === revealAnswer.falseStatement.id
                                    ? `${points?.correctlyGuessed ? '+' : ''}${
                                          points?.correctlyGuessed
                                      }`
                                    : points?.falselyGuessed}
                            </StatementScoreContainer>
                        )}
                        <p>{s.text}</p>
                        <GuessEmojiContainer>
                            {roundStage !== RoundStage.QUESTION_END &&
                                revealAnswer.guesses
                                    .filter((g) => g.selectedAnswerId === s.id)
                                    .map((g) => (
                                        <span key={`emoji-${g.id}`}>
                                            {
                                                players.find(
                                                    (p) => p.id === g.id
                                                )?.emoji
                                            }
                                        </span>
                                    ))}
                        </GuessEmojiContainer>
                    </StatementContainer>
                ))}
            </div>
        </>
    )
}

export default StatementRevealBoard
