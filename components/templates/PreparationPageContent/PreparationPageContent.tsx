import { RoomStage } from '@prisma/client'
import { useState } from 'react'
import { useAsync, useAsyncFn, useWindowSize } from 'react-use'

import { Button, ButtonSizes } from 'components/atoms/Button'
import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { RoomSlugSizes, RoomSlugText } from 'components/atoms/RoomSlugText'
import { ChartCounter } from 'components/atoms/CharCounter'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { AdminButton } from 'components/molecules/AdminButton'
import { PlayerTileSize } from 'components/molecules/PlayerTile'
import { PlayersBoard } from 'components/organisms/PlayersBoard'
import { GENERAL_ERROR_TRY_AGAIN } from 'constants/messages'
import { designTokens } from 'styles/designTokens'

import { Props } from './types'
import { TextArea, TextAreaContainer, TextBoxesContainer } from './styles'

const MAX_LENGTH = 50

const { breakPoints } = designTokens

const PreparationPageContent = ({ room, player, players }: Props) => {
    const { width } = useWindowSize()
    const [firstTrueStatement, setFirstTrueStatement] = useState('')
    const [secondTrueStatement, setSecondTrueStatement] = useState('')
    const [falseStatement, setFalseStatement] = useState('')

    const [state, doFetch] = useAsyncFn(async () => {
        const response = await fetch(
            `/api/room/${room.slug}/player/${player.slug}/statements`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([
                    { text: firstTrueStatement, isTrue: true },
                    { text: secondTrueStatement, isTrue: true },
                    { text: falseStatement, isTrue: false },
                ]),
            }
        )
        const result = await response.json()
        return result
    }, [firstTrueStatement, secondTrueStatement, falseStatement])

    const isReady = state.value?.success || !!player.statements.length
    useAsync(async () => {
        if (!player.showLoading && !isReady) {
            await fetch(
                `/api/room/${room.slug}/player/${player.slug}/update-show-loading`
            )
        }
    }, [player, isReady])

    return (
        <HomeContentContainer>
            <RoomSlugText slug={room.slug} size={RoomSlugSizes.md} />
            <PlayersBoard
                player={player}
                players={players}
                size={PlayerTileSize.md}
                isFixed={width > breakPoints.md}
            />
            {isReady ? (
                <>
                    <ScreenMessage text="Waiting for Others to Submit Statements ⏳" />
                    <AdminButton
                        text="Start"
                        role={player.role}
                        isDisabled={
                            !(
                                players.reduce(
                                    (acc, curr) => acc + curr.statements.length,
                                    0
                                ) >= 6
                            )
                        }
                        slug={room.slug}
                        apiRoute="/update-stage"
                        postBody={{ stage: RoomStage.GAME }}
                    />
                </>
            ) : (
                <>
                    <TextBoxesContainer>
                        <TextAreaContainer>
                            <TextArea
                                rows={3}
                                maxLength={MAX_LENGTH}
                                placeholder="1st True Statement"
                                onChange={(e) =>
                                    setFirstTrueStatement(e.target.value)
                                }
                            />
                            <ChartCounter
                                value={MAX_LENGTH - firstTrueStatement.length}
                            />
                        </TextAreaContainer>
                        <TextAreaContainer>
                            <TextArea
                                rows={3}
                                maxLength={MAX_LENGTH}
                                placeholder="2nd True Statement"
                                onChange={(e) =>
                                    setSecondTrueStatement(e.target.value)
                                }
                                noBorderTop
                            />
                            <ChartCounter
                                value={MAX_LENGTH - secondTrueStatement.length}
                            />
                        </TextAreaContainer>
                        <TextAreaContainer>
                            <TextArea
                                rows={3}
                                maxLength={MAX_LENGTH}
                                placeholder="False Statement"
                                onChange={(e) =>
                                    setFalseStatement(e.target.value)
                                }
                                noBorderTop
                            />
                            <ChartCounter
                                value={MAX_LENGTH - falseStatement.length}
                            />
                        </TextAreaContainer>
                    </TextBoxesContainer>
                    {state.error ||
                        (state.value?.error && (
                            <ScreenMessage text={GENERAL_ERROR_TRY_AGAIN} />
                        ))}
                    <Button
                        text="Submit"
                        size={ButtonSizes.lg}
                        onClick={doFetch}
                        isLoading={state.loading}
                        isDisabled={
                            !firstTrueStatement ||
                            !secondTrueStatement ||
                            !falseStatement ||
                            state.loading
                        }
                    />
                </>
            )}
        </HomeContentContainer>
    )
}

export default PreparationPageContent
