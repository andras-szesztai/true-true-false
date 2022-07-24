import { PlayerTile } from 'components/atoms/PlayerTile'
import { RoomSlugText } from 'components/atoms/RoomSlugText'
import { SquareLoader } from 'react-spinners'
import { designTokens } from 'styles/designTokens'

import { Props } from './types'

const { color, space } = designTokens

const LobbyPageContent = ({ room, player, players }: Props) => {
    const currPlayer = players.find((p) => p.id === player.id)!
    if (!currPlayer)
        return <SquareLoader color={color.black} loading size={space.lg} />
    return (
        <>
            <RoomSlugText slug={room.slug} />
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
        </>
    )
}

export default LobbyPageContent
