import { useRouter } from 'next/router'

const PlayerGamePage = () => {
    const {
        query: { roomId, playerId },
    } = useRouter()

    // Check if room exists - (also add it at create-player page) - if no room, offer to create one with button

    // Check if room is in lobby stage, if not push into game page 'lobby | fill-in | game | end'

    // Check if player exists - if not, push to automatically (create-player page)

    // Fetch number of players, put current player on top, rest in order of created, add key to Player schema for isActive to show disconnected

    // Show different UI for room admin (creator by default) and the rest

    // If room creator gets disconnected, make next one in line room admin

    return (
        <div>
            Lobby: {roomId} & {playerId}
        </div>
    )
}

export default PlayerGamePage
