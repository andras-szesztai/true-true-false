import { PlayerTile } from 'components/molecules/PlayerTile'
import { maxBy } from 'lodash'

import { Container } from './styles'
import { Props } from './types'

const PlayersBoard = ({
    player,
    players,
    isFixed,
    size,
    fullWidth,
    displayScore,
}: Props) => {
    const maxScore = maxBy(players, 'score')?.score
    return (
        <Container isFixed={isFixed} size={size} fullWidth={fullWidth}>
            {player && (
                <PlayerTile
                    name={player.name}
                    emoji={player.emoji}
                    isOffline={!player.isActive}
                    size={size}
                    isLoading={player.showLoading}
                    score={displayScore ? player.score : undefined}
                    maxScore={maxScore}
                />
            )}
            {players
                .filter((p) => p.id !== player?.id)
                .map((p, i) => (
                    <PlayerTile
                        key={`${p.name}${p.id}`}
                        name={p.name}
                        emoji={p.emoji}
                        noBorderTop={!!player || !!i}
                        isOffline={!p.isActive}
                        size={size}
                        isLoading={p.showLoading}
                        score={displayScore ? p.score : undefined}
                        maxScore={maxScore}
                    />
                ))}
        </Container>
    )
}

export default PlayersBoard
