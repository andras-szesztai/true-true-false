import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Role } from '@prisma/client'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { MainTitle } from 'components/atoms/MainTitle'
import { AdminButton } from 'components/molecules/AdminButton'
import { PlayerTileSize } from 'components/molecules/PlayerTile'
import { PlayersBoard } from 'components/organisms/PlayersBoard'

import { Props } from './types'

const ResultsPageContent = ({
    players,
    playerRole,
    roomSlug,
    isDeleteStarted,
}: Props) => {
    const router = useRouter()
    useEffect(() => {
        if (isDeleteStarted && playerRole !== Role.ADMIN) {
            router.push('/')
        }
    }, [isDeleteStarted, router, playerRole])

    return (
        <HomeContentContainer>
            <MainTitle>✨ Results ✨</MainTitle>
            <PlayersBoard
                players={players}
                size={PlayerTileSize.lg}
                displayScore
            />
            <AdminButton
                text={`${isDeleteStarted ? 'Finish' : 'Start'} Room Delete`}
                role={playerRole}
                slug={roomSlug}
                customError={
                    isDeleteStarted
                        ? `We Could Not Delete Your Room, Please Try Again or Send an Email to truetruefalse-contact@gmail.com with Room ID ${roomSlug}. Sorry for the Inconvenience.`
                        : ''
                }
                onSuccess={
                    isDeleteStarted
                        ? () => {
                              router.push('/')
                          }
                        : undefined
                }
                apiRoute={`/${isDeleteStarted ? 'finish' : 'start'}-delete`}
            />
        </HomeContentContainer>
    )
}

export default ResultsPageContent
