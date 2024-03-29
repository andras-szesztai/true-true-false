import { RoomStage } from '@prisma/client'
import { useState } from 'react'
import { useWindowSize } from 'react-use'
import useSWR from 'swr'

import { Button, ButtonSizes } from 'components/atoms/Button'
import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { RoomSlugSizes, RoomSlugText } from 'components/atoms/RoomSlugText'
import { ChartCounter } from 'components/atoms/CharCounter'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { AdminButton } from 'components/molecules/AdminButton'
import { TextArea } from 'components/atoms/TextArea'
import { PlayerTileSize } from 'components/molecules/PlayerTile'
import { PlayersBoard } from 'components/organisms/PlayersBoard'
import { useAsyncFn } from 'hooks/useAsyncFn/useAsyncFn'
import { GENERAL_ERROR_TRY_AGAIN } from 'constants/messages'
import { fetcher } from 'utils/fetcher'
import { designTokens } from 'styles/designTokens'

import { Props } from './types'
import { TextAreaContainer, TextBoxesContainer } from './styles'

const MAX_LENGTH = 50

const { breakPoints } = designTokens

const PreparationPageContent = ({ room, player, players }: Props) => {
    const { width } = useWindowSize()
    const [firstTrueStatement, setFirstTrueStatement] = useState('')
    const [secondTrueStatement, setSecondTrueStatement] = useState('')
    const [falseStatement, setFalseStatement] = useState('')

    const [postStatements, { loading, data, error }] = useAsyncFn(() =>
        fetch(`/api/room/${room.slug}/player/${player.slug}/statements`, {
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
        })
    )

    useSWR(
        !player.showLoading && !data
            ? `/api/room/${room.slug}/player/${player.slug}/update-show-loading`
            : null,
        fetcher
    )

    const isMobileSize = width <= breakPoints.md
    const isMinimumReady =
        players.reduce((acc, curr) => acc + +!curr.showLoading, 0) >= 2
    const allReady = !players.some((d) => d.showLoading)
    return (
        <HomeContentContainer>
            <RoomSlugText slug={room.slug} size={RoomSlugSizes.md} />
            <PlayersBoard
                player={player}
                players={players}
                size={PlayerTileSize.md}
                isFixed={!isMobileSize}
                fullWidth
            />
            {data ? (
                <>
                    <ScreenMessage
                        text={
                            allReady
                                ? 'Everyone is ready! 🚀'
                                : 'Waiting for Others to Submit Statements ⏳'
                        }
                    />
                    <AdminButton
                        text="Start"
                        role={player.role}
                        isDisabled={!isMinimumReady}
                        slug={room.slug}
                        apiRoute={`/update-room-stage/${RoomStage.GAME}`}
                    />
                </>
            ) : (
                <>
                    <TextBoxesContainer>
                        <TextAreaContainer>
                            <TextArea
                                rows={3}
                                maxLength={MAX_LENGTH}
                                placeholder="True Statement"
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
                                placeholder="True Statement"
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
                    {error && <ScreenMessage text={GENERAL_ERROR_TRY_AGAIN} />}
                    <Button
                        text="Submit"
                        size={ButtonSizes.md}
                        onClick={postStatements}
                        isLoading={loading}
                        isDisabled={
                            !firstTrueStatement ||
                            !secondTrueStatement ||
                            !falseStatement ||
                            loading
                        }
                    />
                </>
            )}
        </HomeContentContainer>
    )
}

export default PreparationPageContent
