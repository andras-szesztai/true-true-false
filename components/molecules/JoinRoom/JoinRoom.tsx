import { useState } from 'react'
import { useAsync, usePrevious } from 'react-use'

import { Link, LinkSizes } from 'components/atoms/Link'
import { Input } from 'components/atoms/Input'
import { RoomIdResponse } from 'types/apiResponses'

import { JoinRoomContainer, OrText } from './styles'

const JoinRoom = () => {
    const [roomId, setRoomId] = useState('')
    const prevRoomId = usePrevious(roomId)
    const { value, loading } = useAsync(async () => {
        if (roomId.length === 5 && prevRoomId !== roomId) {
            const response = await fetch(`/api/room/${roomId}`)
            const result: RoomIdResponse = await response.json()
            return result
        }
    }, [roomId])
    const showError = value && 'error' in value ? value.error : ''
    const showLoading = !(value && 'id' in value)
    return (
        <JoinRoomContainer>
            <OrText>or</OrText>
            <Input
                value={roomId}
                maxLength={5}
                placeholder="Enter Room ID"
                onChange={(e) => {
                    setRoomId(e.target.value)
                }}
                error={showError}
            />
            <Link
                href={`${roomId}/create-player`}
                text="Join"
                size={LinkSizes.md}
                noBorderTop
                isDisabled={showLoading}
                isLoading={!!roomId.length && loading}
            />
        </JoinRoomContainer>
    )
}

export default JoinRoom
