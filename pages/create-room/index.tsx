import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { PostRoomResponse } from 'types/apiResponses'
import { fetcher } from 'utils/fetcher'

const CreateRoom = () => {
    const router = useRouter()
    const { data, error } = useSWR<PostRoomResponse>('/api/room', fetcher)

    useEffect(() => {
        if (data && 'slug' in data) {
            router.push(`/${data.slug}/create-player/admin`)
        }
    }, [data, router])

    if (!data && !error)
        return (
            <ScreenMessage text="🧹🧽 One Second, We Are Preparing Your Room..." />
        )

    if (error || (data && 'error' in data))
        return (
            <ScreenMessage text="💔 Sorry, Something Went Wrong While Creating Your Room. Please Try Again!" />
        )
}

export default CreateRoom
