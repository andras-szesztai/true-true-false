import { useRouter } from 'next/router'
import { RoomStage } from '@prisma/client'

import { GameContainer } from 'components/atoms/containers/GameContainer'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { RoomDataHandler } from 'components/organisms/RoomDataHandler'
import { PlayersDataHandler } from 'components/organisms/PlayersDataHandler'
import { PlayerDataHandler } from 'components/organisms/PlayerDataHandler'
import { LobbyPageContent } from 'components/templates/LobbyPageContent'
import { GENERAL_ERROR } from 'constants/messages'

const PlayerGamePage = () => {
    const {
        query: { roomSlug, playerSlug },
    } = useRouter()
    // Fetch number of players, put current player on top, rest in order of created,
    // add key to Player schema isActive to show disconnected, maybe websocket connection on create-player page or here?
    // Show different UI for room admin (creator by default) and the rest
    // If room creator gets disconnected, make next one in line room admin
    return (
        <GameContainer>
            <RoomDataHandler roomSlug={roomSlug!}>
                {(roomData) => (
                    <PlayerDataHandler
                        roomSlug={roomData.slug}
                        playerSlug={playerSlug!}
                    >
                        {(playerData) => (
                            <PlayersDataHandler roomSlug={roomSlug!}>
                                {(playersData) => {
                                    switch (roomData.stage) {
                                        case RoomStage.LOBBY:
                                            return (
                                                <LobbyPageContent
                                                    room={roomData}
                                                    player={playerData}
                                                    players={playersData}
                                                />
                                            )
                                        case RoomStage.PREPARATION:
                                            return <div>Preparation</div>
                                        case RoomStage.GAME:
                                            return <div>Game</div>
                                        case RoomStage.END:
                                            return <div>End</div>
                                        default:
                                            return (
                                                <ScreenMessage
                                                    text={GENERAL_ERROR}
                                                />
                                            )
                                    }
                                }}
                            </PlayersDataHandler>
                        )}
                    </PlayerDataHandler>
                )}
            </RoomDataHandler>
        </GameContainer>
    )
}

export default PlayerGamePage
