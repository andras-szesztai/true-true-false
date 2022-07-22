import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url: string) =>
    fetch(url, { method: 'POST' }).then((res) => res.json())

const Room = () => {
    const { query } = useRouter()
    const { data } = useSWR(`/api/room/${query.roomId}`, fetcher)
    console.log({ data })
    return <div>Room</div>
}

export default Room
