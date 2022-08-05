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

const PlayerGamePage = () => {
    const {
        query: { roomSlug, playerSlug },
    } = useRouter()
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
                                                <>
                                                    <LobbyPageContent
                                                        room={roomData}
                                                        player={playerData}
                                                        players={playersData}
                                                    />
                                                    <BecomeAdminButton
                                                        players={playersData}
                                                        roomSlug={roomData.slug}
                                                        playerSlug={
                                                            playerData.slug
                                                        }
                                                    />
                                                </>
                                            )
                                        case RoomStage.PREPARATION:
                                            return (
                                                <>
                                                    <PreparationPageContent />
                                                    <BecomeAdminButton
                                                        players={playersData}
                                                        roomSlug={roomData.slug}
                                                        playerSlug={
                                                            playerData.slug
                                                        }
                                                    />
                                                </>
                                            )
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
