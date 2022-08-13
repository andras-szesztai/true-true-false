import { RoomStage } from '@prisma/client'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { RoomSlugSizes, RoomSlugText } from 'components/atoms/RoomSlugText'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { AdminButton } from 'components/molecules/AdminButton'
import { PlayerTileSize } from 'components/molecules/PlayerTile'
import { PlayersBoard } from 'components/organisms/PlayersBoard'

import { Props } from './types'
import { ScreenMessagesContainer } from './styles'

const LobbyPageContent = ({ room, player, players }: Props) => (
    <HomeContentContainer>
        <RoomSlugText slug={room.slug} size={RoomSlugSizes.lg} />
        <ScreenMessagesContainer>
            {players.length > 1 && (
                <ScreenMessage
                    text={`${players.length} Players in the Lobby`}
                />
            )}
            <ScreenMessage text="Waiting for Others to Join ⏳" />
        </ScreenMessagesContainer>
        <PlayersBoard
            player={player}
            players={players}
            size={PlayerTileSize.lg}
        />
        <AdminButton
            role={player.role}
            isDisabled={players.length < 2}
            slug={room.slug}
            text="Start"
            apiRoute={`/update-room-stage/${RoomStage.PREPARATION}`}
        />
    </HomeContentContainer>
)

export default LobbyPageContent
