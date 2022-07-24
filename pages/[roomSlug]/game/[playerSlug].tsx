import { useRouter } from 'next/router'

const PlayerGamePage = () => {
    const {
        query: { roomSlug, playerSlug },
    } = useRouter()
    return (
        <div>
            Game: {roomSlug} & {playerSlug}
        </div>
    )
}

export default PlayerGamePage
