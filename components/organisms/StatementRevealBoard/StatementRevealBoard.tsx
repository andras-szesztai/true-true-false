import { SquareLoader } from 'react-spinners'
import { RoundStage } from '@prisma/client'

import { StatementContainer } from 'components/atoms/containers/StatementContainer'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { PlayerTile, PlayerTileSize } from 'components/molecules/PlayerTile'
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
    statementsData,
    revealData,
    error,
    roundStage,
    players,
    selectedPlayer,
    points,
}: Props) => {
    if (!error && (!statementsData || !revealData)) {
        return <SquareLoader color={color.black} loading size={space.lg} />
    }

    if (error) {
        return <ScreenMessage text={error} />
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
                {statementsData?.map((s, i) => (
                    <StatementContainer
                        noBorderTop={!!i}
                        key={s.id}
                        isSelected={
                            (roundStage === RoundStage.FALSE_REVEAL ||
                                roundStage === RoundStage.SCORE_REVEAL ||
                                roundStage === RoundStage.SCORING) &&
                            s.id === revealData?.falseStatement.id
                        }
                    >
                        {roundStage === RoundStage.SCORE_REVEAL && (
                            <StatementScoreContainer>
                                {s.id === revealData?.falseStatement.id
                                    ? `${points?.correctlyGuessed ? '+' : ''}${
                                          points?.correctlyGuessed
                                      }`
                                    : points?.falselyGuessed}
                            </StatementScoreContainer>
                        )}
                        <p>{s.text}</p>
                        <GuessEmojiContainer>
                            {roundStage !== RoundStage.QUESTION_END &&
                                revealData?.guesses
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
