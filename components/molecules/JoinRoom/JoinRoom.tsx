import { useState } from 'react'

import { Link, LinkSizes } from 'components/atoms/Link'
import { Input } from 'components/atoms/Input'

import { JoinRoomContainer } from './styles'

const JoinRoom = () => {
    const [roomId, setRoomId] = useState('')
    return (
        <JoinRoomContainer>
            <Input
                maxLength={5}
                placeholder="Enter Room ID"
                onChange={(e) => {
                    setRoomId(e.target.value)
                }}
            />
            <Link
                href={roomId}
                text="Join"
                size={LinkSizes.md}
                noBorderTop
                disabled={roomId.length !== 5}
            />
        </JoinRoomContainer>
    )
}

export default JoinRoom
