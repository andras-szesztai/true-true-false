import { useState } from 'react'
import { useRouter } from 'next/router'
import { useKey, usePrevious } from 'react-use'
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
    const [data, setData] = useState<null | GetRoomResponseSuccess>(null)
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

    const router = useRouter()
    useKey(
        'Enter',
        () => {
            if (data) {
                router.push(`/${roomSlug}/create-player`)
            }
        },
        {},
        [data]
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
                error={roomSlug.length === 5 ? error : ''}
            />
            <Link
                href={`/${roomSlug}/create-player`}
                text="Join"
                size={LinkSizes.md}
                noBorderTop
                isDisabled={!data}
                isLoading={roomSlug.length === 5 && !data && !error}
            />
        </JoinRoomContainer>
    )
}

export default JoinRoom
