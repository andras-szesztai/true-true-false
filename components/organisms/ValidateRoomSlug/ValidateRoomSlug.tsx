import React, { FC, ReactElement } from 'react'
import { useAsync } from 'react-use'
import { GetRoomResponse } from 'types/apiResponses'
import { Room } from '@prisma/client'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { ScreenMessage } from 'components/atoms/ScreenMessage'

const ValidateRoomSlug: FC<{
    roomSlug: string | string[]
    children(data: Pick<Room, 'slug' | 'id'>): ReactElement
}> = ({ roomSlug, children }) => {
    const { value: roomData, loading: roomDataLoading } = useAsync(async () => {
        const response = await fetch(`/api/room/${roomSlug}`)
        const result: GetRoomResponse = await response.json()
        return result
    }, [roomSlug])

    if (!roomDataLoading && roomData && 'error' in roomData) {
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
    if (roomData && 'slug' in roomData) {
        return children(roomData)
    }
    return null
}

export default ValidateRoomSlug
