import { GameContainer } from 'components/atoms/containers/GameContainer'
import { CreatePlayerInput } from 'components/organisms/CreatePlayerInput'
import { useRouter } from 'next/router'

// Check if nothing is in localStorage as playerName key value - pre-populate Input if there is value
// Empty input with placeholder

const CreatePlayer = () => {
    const { query } = useRouter()
    return (
        <GameContainer>
            {query.roomId}
            <CreatePlayerInput />
        </GameContainer>
    )
}

export default CreatePlayer
