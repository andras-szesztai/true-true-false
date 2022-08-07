import React, { useState } from 'react'
import { useAsyncFn } from 'react-use'

import { Button, ButtonSizes } from 'components/atoms/Button'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { GENERAL_ERROR } from 'constants/messages'

import { Props } from './types'
import {
    ErrorText,
    StatementContainer,
    StatementLabel,
    TextBoxRadio,
} from './styles'

const StatementSelectionBoard = ({
    statements,
    isLoading,
    error,
    roomSlug,
    playerSlug,
    isPlayerReady,
    isAllReady,
}: Props) => {
    const [selectedId, setSelectedId] = useState<number | null>(null)

    const [submitState, submitSelectedStatement] = useAsyncFn(async () => {
        const response = await fetch(
            `/api/room/${roomSlug}/player/${playerSlug}/select-statement/${selectedId}`
        )
        const result = await response.json()
        return result
    }, [selectedId])

    if (isLoading) return <div>Loading...</div>

    if (!statements || error)
        return <ScreenMessage text={error?.message || GENERAL_ERROR} />

    if ('error' in statements) return <ScreenMessage text={statements.error} />

    if ((submitState.value && 'success' in submitState.value) || isPlayerReady)
        return (
            <ScreenMessage
                text={
                    isAllReady
                        ? 'Everyone is ready! 🚀'
                        : 'Waiting for Others to Select ⏳'
                }
            />
        )

    return (
        <>
            <div>
                {statements.map((s, i) => (
                    <StatementContainer
                        key={s.id}
                        noBorderTop={!!i}
                        isSelected={s.id === selectedId}
                    >
                        <StatementLabel htmlFor={`${s.id}`}>
                            {s.text}
                        </StatementLabel>
                        <TextBoxRadio
                            type="radio"
                            id={`${s.id}`}
                            onClick={() => setSelectedId(s.id)}
                            onFocus={() => setSelectedId(s.id)}
                        />
                    </StatementContainer>
                ))}
            </div>
            {'error' in submitState ||
                (submitState.error && <ErrorText>Please Try Again!</ErrorText>)}
            <Button
                text="Submit"
                onClick={submitSelectedStatement}
                size={ButtonSizes.md}
                isDisabled={!selectedId}
                isLoading={submitState.loading}
            />
        </>
    )
}

export default StatementSelectionBoard
