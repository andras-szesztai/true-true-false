import { useRouter } from 'next/router'
import { SquareLoader } from 'react-spinners'

import { GameContainer } from 'components/atoms/containers/GameContainer'
import { RoomDataHandler } from 'components/organisms/RoomDataHandler'
import { Link, LinkSizes } from 'components/atoms/Link'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'

import { designTokens } from 'styles/designTokens'

const { color, space } = designTokens

const CreateAPlayerCatch = () => {
    const {
        query: { roomSlug },
    } = useRouter()
    return (
        <GameContainer>
            <HomeContentContainer>
                <RoomDataHandler roomSlug={roomSlug!}>
                    {(roomData, roomDataLoading) =>
                        roomDataLoading ? (
                            <SquareLoader
                                color={color.black}
                                loading
                                size={space.lg}
                            />
                        ) : (
                            <>
                                <ScreenMessage text="You Must Be a Player to Join a Room" />
                                <Link
                                    href={`/${roomData?.slug}/create-player`}
                                    text="Create a Player"
                                    size={LinkSizes.lg}
                                />
                            </>
                        )
                    }
                </RoomDataHandler>
            </HomeContentContainer>
        </GameContainer>
    )
}

export default CreateAPlayerCatch
