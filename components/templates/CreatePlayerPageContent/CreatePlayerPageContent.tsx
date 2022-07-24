import { GameContainer } from 'components/atoms/containers/GameContainer'
import { RoomSlugText } from 'components/atoms/RoomSlugText'
import { CreatePlayer } from 'components/organisms/CreatePlayer'
import { ValidateRoomSlug } from 'components/organisms/ValidateRoomSlug'

import { useRouter } from 'next/router'
import { Props } from './types'

const CreatePlayerPageContent = ({ isAdmin }: Props) => {
    const {
        query: { roomSlug },
    } = useRouter()
    return (
        <GameContainer>
            <ValidateRoomSlug roomSlug={roomSlug!}>
                {(roomData) => (
                    <>
                        <RoomSlugText />
                        <CreatePlayer
                            roomSlug={roomData.slug}
                            isAdmin={isAdmin}
                        />
                    </>
                )}
            </ValidateRoomSlug>
        </GameContainer>
    )
}

export default CreatePlayerPageContent
