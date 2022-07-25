import { Container } from './styles'

const PlayerTilesContainer = () => {
    return (
        <Container>
            {/* <PlayerTile
                    name={player.name}
                    emoji={player.emoji}
                    isOffline={!player.isActive}
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
                        />
                    ))} */}
        </Container>
    )
}

export default PlayerTilesContainer
