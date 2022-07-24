import { GameContainer } from 'components/atoms/containers/GameContainer'
import { RoomIdText } from 'components/atoms/RoomIdText'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { CreatePlayer } from 'components/organisms/CreatePlayer'
import { useRouter } from 'next/router'
import { Props } from './types'

// TODO add room ID check hook
const CreatePlayerPageContent = ({ isAdmin }: Props) => {
    const {
        query: { roomId },
    } = useRouter()

    return (
        <GameContainer>
            {typeof roomId === 'string' ? (
                <>
                    <RoomIdText />
                    <CreatePlayer roomId={roomId} isAdmin={isAdmin} />
                </>
            ) : (
                <ScreenMessage text="Please provide a valid Room ID" />
            )}
        </GameContainer>
    )
}

export default CreatePlayerPageContent
