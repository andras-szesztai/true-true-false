import { GetRoomResponseSuccess } from 'types/apiResponses'
import { Container, Text } from './styles'

const RoomSlugText = ({ slug }: Pick<GetRoomResponseSuccess, 'slug'>) => {
    return (
        <Container>
            <Text>Room</Text>
            <Text>{slug}</Text>
        </Container>
    )
}

export default RoomSlugText
