import { SquareLoader } from 'react-spinners'
import { Role } from '@prisma/client'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { PlayerTile } from 'components/atoms/PlayerTile'
import { RoomSlugText } from 'components/atoms/RoomSlugText'
import { designTokens } from 'styles/designTokens'
import { Button, ButtonSizes } from 'components/atoms/Button'

import { Props } from './types'
import { PlayerTilesContainer } from './styles'

const { color, space } = designTokens

const LobbyPageContent = ({ room, player, players }: Props) => {
    const currPlayer = players.find((p) => p.id === player.id)!
    if (!currPlayer)
        return <SquareLoader color={color.black} loading size={space.lg} />
    return (
        <HomeContentContainer>
            <RoomSlugText slug={room.slug} />
            <PlayerTilesContainer>
                <PlayerTile
                    name={currPlayer?.name}
                    isOffline={!currPlayer.isActive}
                />
                {players
                    .filter((p) => p.id !== player.id)
                    .map((p) => (
                        <PlayerTile
                            key={`${p.name}${p.id}`}
                            name={p.name}
                            noBorderTop
                            isOffline={!p.isActive}
                        />
                    ))}
            </PlayerTilesContainer>
            {player.role === Role.ADMIN && (
                <Button
                    text="Start"
                    size={ButtonSizes.md}
                    onClick={() => {
                        console.log('Ready!')
                    }}
                />
            )}
        </HomeContentContainer>
    )
}

export default LobbyPageContent
