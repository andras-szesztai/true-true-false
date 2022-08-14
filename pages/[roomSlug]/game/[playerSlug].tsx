import Head from 'next/head'
import { useRouter } from 'next/router'
import { RoomStage } from '@prisma/client'
import { SquareLoader } from 'react-spinners'
import { orderBy } from 'lodash'

import { GameContainer } from 'components/atoms/containers/GameContainer'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { BecomeAdminButton } from 'components/molecules/BecomeAdminButton'
import { RoomDataHandler } from 'components/organisms/RoomDataHandler'
import { PlayersDataHandler } from 'components/organisms/PlayersDataHandler'
import { PlayerDataHandler } from 'components/organisms/PlayerDataHandler'
import { LobbyPageContent } from 'components/templates/LobbyPageContent'
import { PreparationPageContent } from 'components/templates/PreparationPageContent'
import { GamePageContent } from 'components/templates/GamePageContent'
import { ResultsPageContent } from 'components/templates/ResultsPageContent'
import { GENERAL_ERROR } from 'constants/messages'
import { APP_NAME } from 'constants/appName'
import {
    GetPlayerResponseSuccess,
    GetPlayersResponseSuccess,
    GetRoomResponseSuccess,
} from 'types/apiResponses'
import { designTokens } from 'styles/designTokens'

const { color, space } = designTokens

const PlayerGamePage = () => {
    const {
        query: { roomSlug, playerSlug },
    } = useRouter()

    const getPageContent = (
        roomData: GetRoomResponseSuccess | null,
        playerData: GetPlayerResponseSuccess | null,
        playersData: GetPlayersResponseSuccess | null
    ) => {
        if (roomData && playerData && playersData) {
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
                            <ResultsPageContent
                                players={orderBy(playersData, 'score', 'desc')}
                                playerRole={playerData.role}
                                roomSlug={roomData.slug}
                                isDeleteStarted={roomData.isDeleteStarted}
                            />
                        </>
                    )

                default:
                    return <ScreenMessage text={GENERAL_ERROR} />
            }
        }
        return null
    }

    return (
        <GameContainer>
            <RoomDataHandler roomSlug={roomSlug!}>
                {(roomData, roomDataLoading) => (
                    <PlayerDataHandler
                        roomSlug={roomData?.slug}
                        playerSlug={playerSlug}
                    >
                        {(playerData, playerDataLoading) => (
                            <PlayersDataHandler roomSlug={roomSlug}>
                                {(playersData, playersDataLoading) => (
                                    <>
                                        {getPageContent(
                                            roomData,
                                            playerData,
                                            playersData
                                        )}
                                        {(roomDataLoading ||
                                            playersDataLoading ||
                                            playerDataLoading) && (
                                            <SquareLoader
                                                color={color.black}
                                                loading
                                                size={space.lg}
                                            />
                                        )}
                                        <BecomeAdminButton
                                            roomSlug={roomData?.slug}
                                            playerSlug={playerData?.slug}
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
