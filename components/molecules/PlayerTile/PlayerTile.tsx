import { isUndefined } from 'lodash'
import { SquareLoader } from 'react-spinners'
import { useWindowSize } from 'react-use'

import { OfflineIcon } from 'components/atoms/icons/OfflineIcon'
import { designTokens } from 'styles/designTokens'

import { PlayerTileSize, Props } from './types'
import {
    Container,
    EmojiContainer,
    NameContainer,
    ScoreBar,
    ScoreContainer,
    ScoreNumberContainer,
    StarContainer,
} from './styles'

const { color, space, breakPoints } = designTokens

const PlayerTile = ({
    name,
    noBorderTop,
    isOffline,
    emoji,
    size,
    isLoading,
    score,
    maxScore,
}: Props) => {
    const { width } = useWindowSize()

    const LoaderSize = {
        smallScreen: {
            [PlayerTileSize.md]: space.base,
            [PlayerTileSize.lg]: space.md,
        },
        largeScreen: {
            [PlayerTileSize.md]: space.md,
            [PlayerTileSize.lg]: space.lg,
        },
    }

    const getEmojiState = () => {
        if (isOffline) {
            return <OfflineIcon width={designTokens.space.lg} />
        }
        if (isLoading) {
            return (
                <SquareLoader
                    loading={isLoading}
                    color={color.black}
                    size={
                        width <= breakPoints.md
                            ? LoaderSize.smallScreen[size]
                            : LoaderSize.largeScreen[size]
                    }
                />
            )
        }
        return emoji
    }

    return (
        <Container>
            <EmojiContainer noBorderTop={noBorderTop} size={size}>
                {getEmojiState()}
            </EmojiContainer>
            <NameContainer
                isOffline={isOffline}
                noBorderTop={noBorderTop}
                size={size}
            >
                <p>{name}</p>
            </NameContainer>
            {!isUndefined(score) && (
                <ScoreContainer size={size}>
                    <ScoreBar width={maxScore ? score / maxScore : 0} />
                    {score === maxScore && !!maxScore && (
                        <StarContainer size={size}>⭐</StarContainer>
                    )}
                    <ScoreNumberContainer size={size}>
                        {score}
                    </ScoreNumberContainer>
                </ScoreContainer>
            )}
        </Container>
    )
}

export default PlayerTile
