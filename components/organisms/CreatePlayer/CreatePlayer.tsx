import { useState } from 'react'

import { Input } from 'components/molecules/Input'

import useSWR from 'swr'
import { Link, LinkSizes } from 'components/atoms/Link'
import { Player } from '@prisma/client'
import { CreatePlayerContainer } from './styles'
import { Props } from './types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const CreatePlayer = ({ roomId }: Props) => {
    const [playerName, setPlayerName] = useState('')

    const { data } = useSWR<{ players: Pick<Player, 'name'>[] }>(
        `/api/room/${roomId}/players`,
        fetcher
    )

    return (
        <CreatePlayerContainer>
            <Input
                maxLength={10}
                placeholder="Player's Name"
                onChange={(e) => {
                    setPlayerName(e.target.value)
                }}
                value={playerName}
                error={
                    data?.players.some((d) => d.name === playerName)
                        ? 'Sorry, Name & Emoji Combination Is Already Taken'
                        : ''
                }
            />
            <Link
                href={`${roomId}/create-player`}
                text="Join"
                size={LinkSizes.md}
                noBorderTop
                // isDisabled={showLoading}
                // isLoading={!!roomId.length && loading}
            />
        </CreatePlayerContainer>
    )
}

export default CreatePlayer
