import { useRouter } from 'next/router'

const PlayerGamePage = () => {
    const {
        query: { roomId, playerId },
    } = useRouter()
    return (
        <div>
            Game: {roomId} & {playerId}
        </div>
    )
}

export default PlayerGamePage
