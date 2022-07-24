import React, { FC, ReactElement } from 'react'
import { GetRoomResponse, GetRoomResponseSuccess } from 'types/apiResponses'
import { SquareLoader } from 'react-spinners'
import useSWR from 'swr'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { GENERAL_ERROR } from 'constants/messages'
import { designTokens } from 'styles/designTokens'

const { color, space } = designTokens

const RoomDataHandler: FC<{
    roomSlug: string | string[]
    children(data: GetRoomResponseSuccess): ReactElement
}> = ({ roomSlug, children }) => {
    const { data: roomData, error } = useSWR<GetRoomResponse>(
        `/api/room/${roomSlug}`,
        (url: string) => fetch(url).then((res) => res.json())
    )
    if (roomData) {
        if ('error' in roomData) {
            return (
                <HomeContentContainer>
                    <ScreenMessage text={roomData.error} />
                    <Link
                        href="/create-room"
                        text="Create a Room"
                        size={LinkSizes.lg}
                    />
                </HomeContentContainer>
            )
        }
        if ('slug' in roomData) return children(roomData)
    }
    if (error) return <ScreenMessage text={GENERAL_ERROR} />
    return <SquareLoader color={color.black} loading size={space.lg} />
}

export default RoomDataHandler