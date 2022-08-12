import React, { useState } from 'react'
import { useAsyncFn } from 'react-use'
import { SquareLoader } from 'react-spinners'

import { Button, ButtonSizes } from 'components/atoms/Button'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { StatementContainer } from 'components/atoms/containers/StatementContainer'
import { PlayerTile, PlayerTileSize } from 'components/molecules/PlayerTile'
import { GENERAL_ERROR } from 'constants/messages'
import { designTokens } from 'styles/designTokens'

import { Props } from './types'
import { ErrorText, StatementLabel, TextBoxRadio } from './styles'

const { color, space } = designTokens

const StatementSelectionBoard = ({
    statements,
    isLoading,
    error,
    roomSlug,
    playerSlug,
    isPlayerReady,
    isAllReady,
    isCurrentPlayerStatements,
    selectedPlayer,
}: Props) => {
    const [selectedId, setSelectedId] = useState<number | null>(null)

    const [submitState, submitSelectedStatement] = useAsyncFn(async () => {
        const response = await fetch(
            `/api/room/${roomSlug}/player/${playerSlug}/select-statement/${selectedId}`
        )
        const result = await response.json()
        return result
    }, [selectedId])

    if (isLoading) {
        return <SquareLoader color={color.black} loading size={space.lg} />
    }

    if (!statements || error) {
        return <ScreenMessage text={error?.message || GENERAL_ERROR} />
    }

    if ('error' in statements) {
        return <ScreenMessage text={statements.error} />
    }

    if (
        (submitState.value && 'success' in submitState.value) ||
        isPlayerReady
    ) {
        return (
            <ScreenMessage
                text={
                    isAllReady
                        ? 'Everyone is ready! 🚀'
                        : 'Waiting for Others to Select ⏳'
                }
            />
        )
    }

    return (
        <>
            {selectedPlayer && (
                <PlayerTile
                    name={selectedPlayer.name}
                    size={PlayerTileSize.lg}
                    emoji={selectedPlayer.emoji}
                    isOffline={false}
                />
            )}
            <div>
                {statements.map((s, i) => (
                    <StatementContainer
                        key={s.id}
                        noBorderTop={!!i}
                        isSelected={s.id === selectedId}
                    >
                        <StatementLabel
                            htmlFor={`${s.id}`}
                            isCurrentPlayerStatements={
                                isCurrentPlayerStatements
                            }
                        >
                            {s.text}
                        </StatementLabel>
                        <TextBoxRadio
                            aria-disabled={isCurrentPlayerStatements}
                            disabled={isCurrentPlayerStatements}
                            type="radio"
                            id={`${s.id}`}
                            onClick={() => {
                                setSelectedId(s.id)
                            }}
                            onFocus={() => {
                                setSelectedId(s.id)
                            }}
                        />
                    </StatementContainer>
                ))}
            </div>
            {'error' in submitState ||
                (submitState.error && <ErrorText>Please Try Again!</ErrorText>)}

            {!isCurrentPlayerStatements && (
                <Button
                    text="Submit"
                    onClick={submitSelectedStatement}
                    size={ButtonSizes.md}
                    isDisabled={!selectedId}
                    isLoading={submitState.loading}
                />
            )}
        </>
    )
}

export default StatementSelectionBoard
