export const handleConnection = (
    roomSlug: string | string[],
    playerSlug: string | string[]
) => {
    fetch(`/api/room/${roomSlug}/player/${playerSlug}/connect`)
    window.onbeforeunload = () => {
        fetch(`/api/room/${roomSlug}/player/${playerSlug}/disconnect`)
    }
    window.addEventListener('online', () =>
        fetch(`/api/room/${roomSlug}/player/${playerSlug}/connect`)
    )
    window.addEventListener('offline', () =>
        fetch(`/api/room/${roomSlug}/player/${playerSlug}/disconnect`)
    )
}
