import { SquareLoader } from 'react-spinners'
import { RoundStage } from '@prisma/client'

import { StatementContainer } from 'components/atoms/containers/StatementContainer'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { GENERAL_ERROR } from 'constants/messages'
import { designTokens } from 'styles/designTokens'

import { Props } from './types'
import { GuessEmojiContainer } from './styles'

const { color, space } = designTokens

const StatementRevealBoard = ({
    statements,
    revealAnswer,
    isLoading,
    error,
    roundStage,
    players,
}: Props) => {
    if (
        roundStage !== RoundStage.QUESTION_END &&
        roundStage !== RoundStage.GUESS_REVEAL &&
        roundStage !== RoundStage.FALSE_REVEAL &&
        roundStage !== RoundStage.SCORE_REVEAL &&
        roundStage !== RoundStage.SCORING
    )
        return null

    if (isLoading)
        return <SquareLoader color={color.black} loading size={space.lg} />

    if (!statements || error || !revealAnswer)
        return <ScreenMessage text={error?.message || GENERAL_ERROR} />

    if ('error' in revealAnswer)
        return <ScreenMessage text={revealAnswer.error} />

    if ('error' in statements) return <ScreenMessage text={statements.error} />

    return (
        <div>
            {statements.map((s, i) => (
                <StatementContainer noBorderTop={!!i} key={s.id}>
                    <p>{s.text}</p>
                    <GuessEmojiContainer>
                        {roundStage !== RoundStage.QUESTION_END &&
                            revealAnswer.guesses
                                .filter((g) => g.selectedAnswerId === s.id)
                                .map((g) => (
                                    <span>
                                        {
                                            players.find((p) => p.id === g.id)
                                                ?.emoji
                                        }
                                    </span>
                                ))}
                    </GuessEmojiContainer>
                </StatementContainer>
            ))}
        </div>
    )
}

export default StatementRevealBoard
