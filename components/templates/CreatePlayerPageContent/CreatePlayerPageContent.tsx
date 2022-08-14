import { useRouter } from 'next/router'
import { SquareLoader } from 'react-spinners'

import { GameContainer } from 'components/atoms/containers/GameContainer'
import { RoomSlugSizes, RoomSlugText } from 'components/atoms/RoomSlugText'
import { CreatePlayer } from 'components/organisms/CreatePlayer'
import { RoomDataHandler } from 'components/organisms/RoomDataHandler'
import { designTokens } from 'styles/designTokens'

import { Props } from './types'

const { color, space } = designTokens

const CreatePlayerPageContent = ({ isAdmin }: Props) => {
    const {
        query: { roomSlug },
    } = useRouter()
    return (
        <GameContainer>
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
                            <RoomSlugText
                                size={RoomSlugSizes.lg}
                                slug={roomData?.slug}
                            />
                            <CreatePlayer
                                roomSlug={roomData?.slug}
                                isAdmin={isAdmin}
                            />
                        </>
                    )
                }
            </RoomDataHandler>
        </GameContainer>
    )
}

export default CreatePlayerPageContent
