import { GameContainer } from 'components/atoms/containers/GameContainer'
import { RoomSlugText } from 'components/atoms/RoomSlugText'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { CreatePlayer } from 'components/organisms/CreatePlayer'
import { useRouter } from 'next/router'
import { Props } from './types'

// TODO add room ID check hook
const CreatePlayerPageContent = ({ isAdmin }: Props) => {
    const {
        query: { roomSlug },
    } = useRouter()

    return (
        <GameContainer>
            {typeof roomSlug === 'string' ? (
                <>
                    <RoomSlugText />
                    <CreatePlayer roomSlug={roomSlug} isAdmin={isAdmin} />
                </>
            ) : (
                <ScreenMessage text="Please provide a valid Room ID" />
            )}
        </GameContainer>
    )
}

export default CreatePlayerPageContent
