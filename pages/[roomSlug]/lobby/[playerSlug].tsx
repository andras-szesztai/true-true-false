import { useRouter } from 'next/router'

import { GameContainer } from 'components/atoms/containers/GameContainer'
import { ValidateRoomSlug } from 'components/organisms/ValidateRoomSlug'
import { ValidatePlayerSlug } from 'components/organisms/ValidatePlayerSlug'

const PlayerGamePage = () => {
    const {
        query: { roomSlug, playerSlug },
    } = useRouter()

    // Check if room is in lobby stage, if not push into game page 'lobby | fill-in | game | end'

    // Fetch number of players, put current player on top, rest in order of created, add key to Player schema for isActive to show disconnected, maybe websocket connection on create-player page or here?

    // Show different UI for room admin (creator by default) and the rest

    // If room creator gets disconnected, make next one in line room admin

    return (
        <GameContainer>
            <ValidateRoomSlug roomSlug={roomSlug!}>
                {(roomData) => (
                    <ValidatePlayerSlug
                        roomSlug={roomData.slug}
                        playerSlug={playerSlug!}
                    >
                        {(playerData) => (
                            <div>
                                Player: {playerData.slug} | Room:{' '}
                                {roomData.slug}
                            </div>
                        )}
                    </ValidatePlayerSlug>
                )}
            </ValidateRoomSlug>
        </GameContainer>
    )
}

export default PlayerGamePage
