import { useState } from 'react'
import { useAsync, usePrevious } from 'react-use'

import { Link, LinkSizes } from 'components/atoms/Link'
import { Input } from 'components/molecules/Input'
import { GetRoomResponse } from 'types/apiResponses'

import { JoinRoomContainer, OrText } from './styles'

const JoinRoom = () => {
    const [roomSlug, setRoomSlug] = useState('')
    const prevRoomSlug = usePrevious(roomSlug)
    const { value, loading } = useAsync(async () => {
        if (roomSlug.length === 5 && prevRoomSlug !== roomSlug) {
            const response = await fetch(`/api/room/${roomSlug}`)
            const result: GetRoomResponse = await response.json()
            return result
        }
    }, [roomSlug])
    const showError = value && 'error' in value ? value.error : ''
    const disableLink = !(value && 'id' in value)
    return (
        <JoinRoomContainer>
            <OrText>or</OrText>
            <Input
                value={roomSlug}
                maxLength={5}
                placeholder="Enter Room ID"
                onChange={(e) => {
                    setRoomSlug(e.target.value)
                }}
                error={showError}
            />
            <Link
                href={`/${roomSlug}/create-player`}
                text="Join"
                size={LinkSizes.md}
                noBorderTop
                isDisabled={disableLink}
                isLoading={!!roomSlug.length && loading}
            />
        </JoinRoomContainer>
    )
}

export default JoinRoom
