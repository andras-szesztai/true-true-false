import { Props } from './types'

const LobbyPageContent = ({ player, players }: Props) => {
    return (
        <div>
            {players.length} & {player.id}
        </div>
    )
}

export default LobbyPageContent
