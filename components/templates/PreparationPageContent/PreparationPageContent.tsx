// 1. Add 3 TextBoxes in column flexbox
// 2. Label them according (last one is false)
// 3. Submit button
// 4. Waiting Text
// 5. Admin should have "everyone is in" button
// 6. PlayersBoard with loading animations when writing + submit + offline
import { useState } from 'react'
import { useAsyncFn } from 'react-use'
import { RoomStage } from '@prisma/client'

import { Button, ButtonSizes } from 'components/atoms/Button'
import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { RoomSlugSizes, RoomSlugText } from 'components/atoms/RoomSlugText'
import { ChartCounter } from 'components/atoms/CharCounter'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { AdminButton } from 'components/molecules/AdminButton'
import { GENERAL_ERROR_TRY_AGAIN } from 'constants/messages'

import { Props } from './types'
import { TextArea, TextAreaContainer, TextBoxesContainer } from './styles'

const MAX_LENGTH = 50

// Check other players' statements array

const PreparationPageContent = ({ room, player }: Props) => {
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

    return (
        <HomeContentContainer>
            <RoomSlugText slug={room.slug} size={RoomSlugSizes.md} />

            {state.value?.success ? (
                <>
                    <ScreenMessage text="Waiting For Others To Submit Statements ⏳" />
                    <AdminButton
                        text="Start"
                        role={player.role}
                        isDisabled={false}
                        // isDisabled={players.length < 2}
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
