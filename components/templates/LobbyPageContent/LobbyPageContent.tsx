import { RoomStage } from '@prisma/client'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { PlayerTile } from 'components/atoms/PlayerTile'
import { RoomSlugText } from 'components/atoms/RoomSlugText'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { AdminButton } from 'components/molecules/AdminButton'

import { PlayerTilesContainer, ScreenMessagesContainer } from './styles'
import { Props } from './types'

const LobbyPageContent = ({ room, player, players }: Props) => {
    return (
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
            <AdminButton
                role={player.role}
                isDisabled={players.length < 2}
                slug={room.slug}
                text="start"
                apiRoute="/update-stage"
                postBody={{ stage: RoomStage.PREPARATION }}
            />
        </HomeContentContainer>
    )
}

export default LobbyPageContent
