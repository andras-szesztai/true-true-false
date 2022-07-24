import { FC, ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import { SquareLoader } from 'react-spinners'
import useSWR from 'swr'

import { GetPlayerResponse, GetPlayerResponseSuccess } from 'types/apiResponses'
import { designTokens } from 'styles/designTokens'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { GENERAL_ERROR } from 'constants/messages'

const { color, space } = designTokens

const ValidatePlayerSlug: FC<{
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
    if (playerData && 'slug' in playerData) return children(playerData)
    if (error) return <ScreenMessage text={GENERAL_ERROR} />
    return <SquareLoader color={color.black} loading size={space.lg} />
}

export default ValidatePlayerSlug
