import { useRouter } from 'next/router'

import { GameContainer } from 'components/atoms/containers/GameContainer'
import { ValidateRoomSlug } from 'components/organisms/ValidateRoomSlug'
import { ValidatePlayerSlug } from 'components/organisms/ValidatePlayerSlug'
import { RoomStage } from '@prisma/client'
import PlayersDataHandler from 'components/organisms/PlayersHandler/PlayersHandler'
import { GENERAL_ERROR } from 'constants/messages'
import { ScreenMessage } from 'components/atoms/ScreenMessage'

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
            <ValidateRoomSlug roomSlug={roomSlug!}>
                {(roomData) => (
                    <ValidatePlayerSlug
                        roomSlug={roomData.slug}
                        playerSlug={playerSlug!}
                    >
                        {(playerData) => (
                            <PlayersDataHandler roomSlug={roomSlug!}>
                                {(players) => {
                                    switch (roomData.stage) {
                                        case RoomStage.LOBBY:
                                            return <div>Lobby</div>
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
                    </ValidatePlayerSlug>
                )}
            </ValidateRoomSlug>
        </GameContainer>
    )
}

export default PlayerGamePage
