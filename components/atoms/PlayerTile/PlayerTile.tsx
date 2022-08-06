import { SquareLoader } from 'react-spinners'
import { useWindowSize } from 'react-use'
import { designTokens } from 'styles/designTokens'

import { OfflineIcon } from '../icons/OfflineIcon'

import { Container, EmojiContainer, NameContainer } from './styles'
import { Props } from './types'

const { color, space, breakPoints } = designTokens

const PlayerTile = ({
    name,
    noBorderTop,
    isOffline,
    emoji,
    size,
    isLoading,
}: Props) => {
    const { width } = useWindowSize()

    const getEmojiState = () => {
        if (isOffline) {
            return <OfflineIcon width={designTokens.space.lg} />
        }
        if (isLoading) {
            return (
                <SquareLoader
                    loading={isLoading}
                    color={color.black}
                    size={width <= breakPoints.md ? space.base : space.md}
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
        </Container>
    )
}

export default PlayerTile
