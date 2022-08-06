import { PlayerTile, PlayerTileSize } from 'components/atoms/PlayerTile'

import { Props } from './types'
import { MainContainer, PlayersContainer } from './styles'

const PlayersBoard = ({ players, player }: Props) => {
    return (
        <MainContainer>
            <PlayersContainer>
                <PlayerTile
                    name={player.name}
                    emoji={player.emoji}
                    isOffline={!player.isActive}
                    size={PlayerTileSize.md}
                    isLoading={!player.statements.length}
                />
                {players
                    .filter((p) => p.id !== player.id)
                    .map((p) => (
                        <PlayerTile
                            key={p.id}
                            name={p.name}
                            emoji={p.emoji}
                            isOffline={!p.isActive}
                            size={PlayerTileSize.md}
                            isLoading={!p.statements.length}
                            noBorderTop
                        />
                    ))}
            </PlayersContainer>
        </MainContainer>
    )
}

export default PlayersBoard
