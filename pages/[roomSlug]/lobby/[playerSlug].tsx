import { useRouter } from 'next/router'

import { GameContainer } from 'components/atoms/containers/GameContainer'
import { ValidateRoomSlug } from 'components/organisms/ValidateRoomSlug'

const PlayerGamePage = () => {
    const {
        query: { roomSlug },
    } = useRouter()

    // Check if player exists - if not, push to automatically (create-player page)

    // Check if room is in lobby stage, if not push into game page 'lobby | fill-in | game | end'

    // Fetch number of players, put current player on top, rest in order of created, add key to Player schema for isActive to show disconnected

    // Show different UI for room admin (creator by default) and the rest

    // If room creator gets disconnected, make next one in line room admin

    return (
        <GameContainer>
            <ValidateRoomSlug roomSlug={roomSlug!}>
                {(roomData) => {
                    return <div>{roomData.slug}</div>
                }}
            </ValidateRoomSlug>
        </GameContainer>
    )
}

export default PlayerGamePage
