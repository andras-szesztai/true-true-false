import { Role } from '@prisma/client'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { PlayerTile } from 'components/atoms/PlayerTile'
import { RoomSlugText } from 'components/atoms/RoomSlugText'
import { Button, ButtonSizes } from 'components/atoms/Button'
import { ScreenMessage } from 'components/atoms/ScreenMessage'

import { Props } from './types'
import { PlayerTilesContainer, ScreenMessagesContainer } from './styles'

const LobbyPageContent = ({ room, player, players }: Props) => (
    <HomeContentContainer>
        <RoomSlugText slug={room.slug} />
        <ScreenMessagesContainer>
            {players.length > 1 && (
                <ScreenMessage
                    text={`${players.length} Players In The Lobby`}
                />
            )}

            <ScreenMessage text="Waiting For Others To Join..." />
        </ScreenMessagesContainer>
        <PlayerTilesContainer>
            <PlayerTile
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
                ))}
        </PlayerTilesContainer>
        {player.role === Role.ADMIN && (
            <Button
                text="Start"
                size={ButtonSizes.md}
                isDisabled={players.length < 2}
                onClick={() => {
                    console.log('Ready!')
                }}
            />
        )}
    </HomeContentContainer>
)

export default LobbyPageContent
