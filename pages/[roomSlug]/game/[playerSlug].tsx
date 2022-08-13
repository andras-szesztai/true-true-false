import Head from 'next/head'
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
import { GamePageContent } from 'components/templates/GamePageContent'
import { GENERAL_ERROR } from 'constants/messages'
import { APP_NAME } from 'constants/appName'
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
                    <>
                        <Head>
                            <title>{APP_NAME} - Lobby</title>
                        </Head>
                        <LobbyPageContent
                            room={roomData}
                            player={playerData}
                            players={playersData}
                        />
                    </>
                )
            case RoomStage.PREPARATION:
                return (
                    <>
                        <Head>
                            <title>{APP_NAME} - Preparation</title>
                        </Head>
                        <PreparationPageContent
                            room={roomData}
                            player={playerData}
                            players={playersData}
                        />
                    </>
                )
            case RoomStage.GAME:
                return (
                    <>
                        <Head>
                            <title>{APP_NAME} - Game</title>
                        </Head>
                        <GamePageContent
                            room={roomData}
                            player={playerData}
                            players={playersData}
                        />
                    </>
                )

            case RoomStage.END:
                return (
                    <>
                        <Head>
                            <title>{APP_NAME} - Results</title>
                        </Head>
                        <div>End</div>
                    </>
                )

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
