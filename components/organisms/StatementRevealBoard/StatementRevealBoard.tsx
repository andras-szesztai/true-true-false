import { SquareLoader } from 'react-spinners'

import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { GENERAL_ERROR } from 'constants/messages'

import { designTokens } from 'styles/designTokens'

import { StatementContainer } from 'components/atoms/containers/StatementContainer'
import { Props } from './types'

const { color, space } = designTokens

const StatementRevealBoard = ({
    statements,
    revealAnswer,
    isLoading,
    error,
}: Props) => {
    // const [stage, setStage] = useState<STAGES>(STAGES.IDLE)

    if (isLoading)
        return <SquareLoader color={color.black} loading size={space.lg} />

    // const [submitState, submitSelectedStatement] = useAsyncFn(async () => {
    //     const response = await fetch(
    //         `/api/room/${roomSlug}/player/${playerSlug}/select-statement/${selectedId}`
    //     )
    //     const result = await response.json()
    //     return result
    // }, [selectedId])

    if (!statements || error || !revealAnswer)
        return <ScreenMessage text={error?.message || GENERAL_ERROR} />

    if ('error' in revealAnswer)
        return <ScreenMessage text={revealAnswer.error} />

    if ('error' in statements) return <ScreenMessage text={statements.error} />

    return (
        <div>
            {statements.map((s, i) => (
                <StatementContainer noBorderTop={!!i} key={s.id}>
                    {s.text}
                </StatementContainer>
            ))}
        </div>
    )
}

export default StatementRevealBoard
