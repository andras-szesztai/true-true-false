import { PlayerTile, PlayerTileSize } from 'components/atoms/PlayerTile'

import { Container } from './styles'
import { Props } from './types'

const PlayerTilesContainer = ({ player, players }: Props) => {
    return (
        <Container>
            <PlayerTile
                name={player.name}
                emoji={player.emoji}
                isOffline={!player.isActive}
                size={PlayerTileSize.lg}
            />
            {players
                .filter((p) => p.id !== player.id)
                .map((p) => (
                    <PlayerTile
                        key={`${p.name}${p.id}`}
                        name={p.name}
                        emoji={p.emoji}
                        noBorderTop
                        isOffline={!p.isActive}
                        size={PlayerTileSize.lg}
                    />
                ))}
        </Container>
    )
}

export default PlayerTilesContainer
