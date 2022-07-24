import { FC, ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAsync } from 'react-use'
import { SquareLoader } from 'react-spinners'

import { GetPlayerResponse, GetPlayerResponseSuccess } from 'types/apiResponses'
import { designTokens } from 'styles/designTokens'

const { color, space } = designTokens

const ValidatePlayerSlug: FC<{
    roomSlug: string | string[]
    playerSlug: string | string[]
    children(data: GetPlayerResponseSuccess): ReactElement
}> = ({ roomSlug, children, playerSlug }) => {
    const { value: playerData, loading: playerDataLoading } =
        useAsync(async () => {
            const response = await fetch(
                `/api/room/${roomSlug}/player/${playerSlug}`
            )
            const result: GetPlayerResponse = await response.json()
            return result
        }, [roomSlug])

    const router = useRouter()
    useEffect(() => {
        if (!playerDataLoading && playerData && 'error' in playerData) {
            router.push(`/${roomSlug}/create-player`)
        }
    })
    if (playerData && 'slug' in playerData) {
        return children(playerData)
    }
    return <SquareLoader color={color.black} loading size={space.lg} />
}

export default ValidatePlayerSlug
