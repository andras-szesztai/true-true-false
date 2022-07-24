import { RoomSlugText } from 'components/atoms/RoomSlugText'
import { Props } from './types'

const LobbyPageContent = ({ room, player, players }: Props) => {
    return (
        <>
            <RoomSlugText slug={room.slug} />
            {players.length} & {player.id}
        </>
    )
}

export default LobbyPageContent
