import { designTokens } from 'styles/designTokens'
import { OfflineIcon } from '../icons/OfflineIcon'

import { Container, EmojiContainer, NameContainer } from './styles'
import { Props } from './types'

const PlayerTile = ({ name, noBorderTop, isOffline, emoji }: Props) => (
    <Container>
        <EmojiContainer noBorderTop={noBorderTop}>
            {isOffline ? <OfflineIcon width={designTokens.space.lg} /> : emoji}
        </EmojiContainer>
        <NameContainer isOffline={isOffline} noBorderTop={noBorderTop}>
            {name}
        </NameContainer>
    </Container>
)

export default PlayerTile
