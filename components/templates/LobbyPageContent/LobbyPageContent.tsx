import { RoomStage } from '@prisma/client'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { RoomSlugSizes, RoomSlugText } from 'components/atoms/RoomSlugText'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { AdminButton } from 'components/molecules/AdminButton'
import { PlayerTilesContainer } from 'components/molecules/PlayerTilesContainer'

import { Props } from './types'
import { ScreenMessagesContainer } from './styles'

const LobbyPageContent = ({ room, player, players }: Props) => (
    <HomeContentContainer>
        <RoomSlugText slug={room.slug} size={RoomSlugSizes.lg} />
        <ScreenMessagesContainer>
            {players.length > 1 && (
                <ScreenMessage
                    text={`${players.length} Players In The Lobby`}
                />
            )}
            <ScreenMessage text="Waiting For Others To Join..." />
        </ScreenMessagesContainer>
        <PlayerTilesContainer player={player} players={players} />
        <AdminButton
            role={player.role}
            isDisabled={players.length < 2}
            slug={room.slug}
            text="Start"
            apiRoute="/update-stage"
            postBody={{ stage: RoomStage.PREPARATION }}
        />
    </HomeContentContainer>
)

export default LobbyPageContent
