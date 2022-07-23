import { Input } from 'components/atoms/Input'
import { useState } from 'react'

import { CreatePlayerContainer } from './styles'

const CreatePlayerInput = () => {
    const [playerName, setPlayerName] = useState('')
    return (
        <CreatePlayerContainer>
            <Input
                maxLength={10}
                placeholder="Player's Name"
                onChange={(e) => {
                    setPlayerName(e.target.value)
                }}
                value={playerName}
                // error={showError}
            />
        </CreatePlayerContainer>
    )
}

export default CreatePlayerInput
