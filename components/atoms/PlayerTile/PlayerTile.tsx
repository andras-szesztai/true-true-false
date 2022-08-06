import { designTokens } from 'styles/designTokens'
import { OfflineIcon } from '../icons/OfflineIcon'

import { Container, EmojiContainer, NameContainer } from './styles'
import { Props } from './types'

const PlayerTile = ({ name, noBorderTop, isOffline, emoji, size }: Props) => (
    <Container>
        <EmojiContainer noBorderTop={noBorderTop} size={size}>
            {isOffline ? <OfflineIcon width={designTokens.space.lg} /> : emoji}
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

export default PlayerTile
