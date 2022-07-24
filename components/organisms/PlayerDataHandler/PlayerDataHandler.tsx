import { FC, ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import { SquareLoader } from 'react-spinners'
import useSWR from 'swr'
import { useUnmount } from 'react-use'

import { GetPlayerResponse, GetPlayerResponseSuccess } from 'types/apiResponses'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { GENERAL_ERROR } from 'constants/messages'
import { designTokens } from 'styles/designTokens'

const { color, space } = designTokens

const PlayerDataHandler: FC<{
    roomSlug: string | string[]
    playerSlug: string | string[]
    children(data: GetPlayerResponseSuccess): ReactElement
}> = ({ roomSlug, children, playerSlug }) => {
    const { data: playerData, error } = useSWR<GetPlayerResponse>(
        `/api/room/${roomSlug}/player/${playerSlug}`,
        (url: string) => fetch(url).then((res) => res.json())
    )
    const router = useRouter()
    useEffect(() => {
        if (playerData && 'error' in playerData) {
            router.push(`/${roomSlug}/create-player`)
        }
    })
    useUnmount(() => {
        fetch('/api/room/y6tmF')
    })
    if (playerData && 'slug' in playerData) return children(playerData)
    if (error) return <ScreenMessage text={GENERAL_ERROR} />
    return <SquareLoader color={color.black} loading size={space.lg} />
}

export default PlayerDataHandler
