import { PlayerTile } from 'components/molecules/PlayerTile'

import { Container } from './styles'
import { Props } from './types'

const PlayersBoard = ({ player, players, isFixed, size, fullWidth }: Props) => {
    return (
        <Container isFixed={isFixed} size={size} fullWidth={fullWidth}>
            <PlayerTile
                name={player.name}
                emoji={player.emoji}
                isOffline={!player.isActive}
                size={size}
                isLoading={player.showLoading}
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
                        size={size}
                        isLoading={p.showLoading}
                    />
                ))}
        </Container>
    )
}

export default PlayersBoard
