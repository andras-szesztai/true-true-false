import { FC, ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { fetcher } from 'utils/fetcher'
import { GetPlayerResponse, GetPlayerResponseSuccess } from 'types/apiResponses'
import { GENERAL_ERROR } from 'constants/messages'
import { REFRESH_INTERVAL } from 'constants/requests'

import { handleConnection } from './utils'

const PlayerDataHandler: FC<{
    roomSlug: string | string[] | undefined
    playerSlug: string | string[] | undefined
    children(
        data: GetPlayerResponseSuccess | null,
        loading: boolean
    ): ReactElement
}> = ({ roomSlug, children, playerSlug }) => {
    const { data: playerData, error } = useSWR<GetPlayerResponse>(
        roomSlug && playerSlug
            ? `/api/room/${roomSlug}/player/${playerSlug}`
            : null,
        fetcher,
        { refreshInterval: REFRESH_INTERVAL }
    )
    const router = useRouter()
    useEffect(() => {
        if (playerData && 'error' in playerData) {
            router.push(`/${roomSlug}/create-player`)
        }
    })
    useEffect(() => {
        if (playerSlug && roomSlug) {
            handleConnection(roomSlug, playerSlug)
        }
    }, [roomSlug, playerSlug])
    if (playerData && 'slug' in playerData) return children(playerData, false)
    if (error) return <ScreenMessage text={GENERAL_ERROR} />
    return children(null, true)
}

export default PlayerDataHandler
