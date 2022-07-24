import { useRouter } from 'next/router'
import { useAsync } from 'react-use'

import { GameContainer } from 'components/atoms/containers/GameContainer'
import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { RoomIdResponse } from 'types/apiResponses'

const PlayerGamePage = () => {
    const {
        query: { roomId, playerId },
    } = useRouter()

    // Use roomSlug instead of RoomId
    // Make it a component? Also add it at create-player page
    const { value: roomData, loading: roomDataLoading } = useAsync(async () => {
        const response = await fetch(`/api/room/${roomId}`)
        const result: RoomIdResponse = await response.json()
        return result
    }, [roomId])

    if (!roomDataLoading && roomData && 'error' in roomData) {
        return (
            <GameContainer>
                <HomeContentContainer>
                    <ScreenMessage text={roomData.error} />
                    <Link
                        href="/create-room"
                        text="Create a Room"
                        size={LinkSizes.lg}
                    />
                </HomeContentContainer>
            </GameContainer>
        )
    }

    // Check if room is in lobby stage, if not push into game page 'lobby | fill-in | game | end'

    // Check if player exists - if not, push to automatically (create-player page)

    // Fetch number of players, put current player on top, rest in order of created, add key to Player schema for isActive to show disconnected

    // Show different UI for room admin (creator by default) and the rest

    // If room creator gets disconnected, make next one in line room admin

    return (
        <div>
            Lobby: {roomId} & {playerId}
        </div>
    )
}

export default PlayerGamePage
