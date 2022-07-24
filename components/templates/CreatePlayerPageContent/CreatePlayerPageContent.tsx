import { GameContainer } from 'components/atoms/containers/GameContainer'
import { RoomSlugText } from 'components/atoms/RoomSlugText'
import { CreatePlayer } from 'components/organisms/CreatePlayer'
import { RoomDataHandler } from 'components/organisms/RoomDataHandler'

import { useRouter } from 'next/router'
import { Props } from './types'

const CreatePlayerPageContent = ({ isAdmin }: Props) => {
    const {
        query: { roomSlug },
    } = useRouter()
    return (
        <GameContainer>
            <RoomDataHandler roomSlug={roomSlug!}>
                {(roomData) => (
                    <>
                        <RoomSlugText />
                        <CreatePlayer
                            roomSlug={roomData.slug}
                            isAdmin={isAdmin}
                        />
                    </>
                )}
            </RoomDataHandler>
        </GameContainer>
    )
}

export default CreatePlayerPageContent
