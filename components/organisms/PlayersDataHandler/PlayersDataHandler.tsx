import { FC, ReactElement } from 'react'
import useSWR from 'swr'

import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { fetcher } from 'utils/fetcher'
import { GENERAL_ERROR } from 'constants/messages'
import {
    GetPlayersResponse,
    GetPlayersResponseSuccess,
} from 'types/apiResponses'
import { REFRESH_INTERVAL } from 'constants/requests'

const PlayersDataHandler: FC<{
    roomSlug: string | string[] | undefined
    children(
        data: GetPlayersResponseSuccess | null,
        loading: boolean
    ): ReactElement
}> = ({ roomSlug, children }) => {
    const { data: playersData, error } = useSWR<GetPlayersResponse>(
        roomSlug ? `/api/room/${roomSlug}/players` : null,
        fetcher,
        { refreshInterval: REFRESH_INTERVAL }
    )

    if (playersData) {
        if ('error' in playersData) {
            return <ScreenMessage text={playersData.error} />
        }
        return children(playersData, false)
    }
    if (error) return <ScreenMessage text={GENERAL_ERROR} />
    return children(null, true)
}

export default PlayersDataHandler
