import { useRouter } from 'next/router'
import { RoomStage } from '@prisma/client'

import { GameContainer } from 'components/atoms/containers/GameContainer'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { RoomDataHandler } from 'components/organisms/RoomDataHandler'
import { PlayersDataHandler } from 'components/organisms/PlayersDataHandler'
import { PlayerDataHandler } from 'components/organisms/PlayerDataHandler'
import { BecomeAdminButton } from 'components/molecules/BecomeAdminButton'
import { LobbyPageContent } from 'components/templates/LobbyPageContent'
import { PreparationPageContent } from 'components/templates/PreparationPageContent'
import { GENERAL_ERROR } from 'constants/messages'
import { GamePageContent } from 'components/templates/GamePageContent'
import {
    GetPlayerResponseSuccess,
    GetPlayersResponseSuccess,
    GetRoomResponseSuccess,
} from 'types/apiResponses'

const PlayerGamePage = () => {
    const {
        query: { roomSlug, playerSlug },
    } = useRouter()

    const getPageContent = (
        roomData: GetRoomResponseSuccess,
        playerData: GetPlayerResponseSuccess,
        playersData: GetPlayersResponseSuccess
    ) => {
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
                return (
                    <PreparationPageContent
                        room={roomData}
                        player={playerData}
                        players={playersData}
                    />
                )
            case RoomStage.GAME:
                return (
                    <GamePageContent
                        room={roomData}
                        player={playerData}
                        players={playersData}
                    />
                )
            case RoomStage.END:
                return <div>End</div>
            default:
                return <ScreenMessage text={GENERAL_ERROR} />
        }
    }

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
                                {(playersData) => (
                                    <>
                                        {getPageContent(
                                            roomData,
                                            playerData,
                                            playersData
                                        )}
                                        <BecomeAdminButton
                                            roomSlug={roomData.slug}
                                            playerSlug={playerData.slug}
                                            players={playersData}
                                        />
                                    </>
                                )}
                            </PlayersDataHandler>
                        )}
                    </PlayerDataHandler>
                )}
            </RoomDataHandler>
        </GameContainer>
    )
}

export default PlayerGamePage
