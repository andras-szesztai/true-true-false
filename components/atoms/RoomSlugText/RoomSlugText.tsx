import { Props } from './types'
import { Container, Text } from './styles'

const RoomSlugText = ({ slug, size, isFixed = true }: Props) => (
    <Container isFixed={isFixed}>
        <Text size={size}>Room</Text>
        <Text size={size}>{slug}</Text>
    </Container>
)

export default RoomSlugText
