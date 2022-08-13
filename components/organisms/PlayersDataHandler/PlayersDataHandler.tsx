import { FC, ReactElement } from 'react'
import { SquareLoader } from 'react-spinners'
import useSWR from 'swr'

import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { fetcher } from 'utils/fetcher'
import { GENERAL_ERROR } from 'constants/messages'
import {
    GetPlayersResponse,
    GetPlayersResponseSuccess,
} from 'types/apiResponses'
import { REFRESH_INTERVAL } from 'constants/requests'
import { designTokens } from 'styles/designTokens'

const { color, space } = designTokens

const PlayersDataHandler: FC<{
    roomSlug: string | string[]
    children(data: GetPlayersResponseSuccess): ReactElement
}> = ({ roomSlug, children }) => {
    const { data: playersData, error } = useSWR<GetPlayersResponse>(
        `/api/room/${roomSlug}/players`,
        fetcher,
        { refreshInterval: REFRESH_INTERVAL }
    )
    console.log(playersData)

    if (playersData) {
        if ('error' in playersData) {
            return <ScreenMessage text={playersData.error} />
        }
        return children(playersData)
    }
    if (error) return <ScreenMessage text={GENERAL_ERROR} />
    return <SquareLoader color={color.black} loading size={space.lg} />
}

export default PlayersDataHandler
