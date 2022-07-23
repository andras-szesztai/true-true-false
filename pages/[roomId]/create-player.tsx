import { GameContainer } from 'components/atoms/containers/GameContainer'
import { CreatePlayer } from 'components/organisms/CreatePlayer'
import { useRouter } from 'next/router'

// Check if nothing is in localStorage as playerName key value - pre-populate Input if there is value
// Empty input with placeholder

const CreatePlayerPage = () => {
    const {
        query: { roomId },
    } = useRouter()
    return (
        <GameContainer>
            {typeof roomId === 'string' && <CreatePlayer roomId={roomId} />}
        </GameContainer>
    )
}

export default CreatePlayerPage
