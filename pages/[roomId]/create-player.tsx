import { useRouter } from 'next/router'

import { GameContainer } from 'components/atoms/containers/GameContainer'
import { RoomIdText } from 'components/atoms/RoomIdText'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { CreatePlayer } from 'components/organisms/CreatePlayer'

// TODO
// - Style to responsive

const CreatePlayerPage = () => {
    const {
        query: { roomId },
    } = useRouter()
    return (
        <GameContainer>
            {typeof roomId === 'string' ? (
                <>
                    <RoomIdText />
                    <CreatePlayer roomId={roomId} />
                </>
            ) : (
                <ScreenMessage text="Please provide a valid Room ID" />
            )}
        </GameContainer>
    )
}

export default CreatePlayerPage
