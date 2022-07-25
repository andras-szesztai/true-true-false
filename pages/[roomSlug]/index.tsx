import { useRouter } from 'next/router'

import { GameContainer } from 'components/atoms/containers/GameContainer'
import { RoomDataHandler } from 'components/organisms/RoomDataHandler'
import { Link, LinkSizes } from 'components/atoms/Link'

const EmptyRoomPage = () => {
    const {
        query: { roomSlug },
    } = useRouter()
    return (
        <GameContainer>
            <RoomDataHandler roomSlug={roomSlug!}>
                {(roomData) => (
                    <Link
                        href={`/${roomData.slug}/create-player`}
                        text="Create a Player"
                        size={LinkSizes.lg}
                    />
                )}
            </RoomDataHandler>
        </GameContainer>
    )
}

export default EmptyRoomPage
