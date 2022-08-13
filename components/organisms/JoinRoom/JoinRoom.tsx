import { useState } from 'react'
import { usePrevious } from 'react-use'
import useSWR from 'swr'

import { Link, LinkSizes } from 'components/atoms/Link'
import { Input } from 'components/molecules/Input'
import { fetcher } from 'utils/fetcher'
import { GetRoomResponse, GetRoomResponseSuccess } from 'types/apiResponses'

import { JoinRoomContainer, OrText } from './styles'

const JoinRoom = () => {
    const [roomSlug, setRoomSlug] = useState('')
    const prevRoomSlug = usePrevious(roomSlug)

    const shouldFetch = roomSlug.length === 5 && prevRoomSlug !== roomSlug
    const [error, setError] = useState('')
    const [data, setData] = useState<null | GetRoomResponseSuccess>()
    useSWR<GetRoomResponse>(
        shouldFetch ? `/api/room/${roomSlug}` : null,
        fetcher,
        {
            onSuccess: (data) => {
                if ('error' in data) {
                    setData(null)
                    setError(data.error)
                } else {
                    setError('')
                    setData(data)
                }
            },
            onError: (err) => {
                setData(null)
                setError(err.message)
            },
        }
    )

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
                error={error}
            />
            <Link
                href={`/${roomSlug}/create-player`}
                text="Join"
                size={LinkSizes.md}
                noBorderTop
                isDisabled={!data}
                isLoading={!!roomSlug.length && !data && !error}
            />
        </JoinRoomContainer>
    )
}

export default JoinRoom
