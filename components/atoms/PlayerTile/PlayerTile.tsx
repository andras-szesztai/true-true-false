import { Container, EmojiContainer, NameContainer } from './styles'
import { Props } from './types'

const PlayerTile = ({ name, noBorderTop, isOffline, emoji }: Props) => (
    <Container>
        <EmojiContainer noBorderTop={noBorderTop}>{emoji}</EmojiContainer>
        <NameContainer isOffline={isOffline} noBorderTop={noBorderTop}>
            {name}
        </NameContainer>
    </Container>
)

export default PlayerTile
