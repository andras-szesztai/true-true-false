import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAsync } from 'react-use'

import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { PostRoomResponse } from 'types/apiResponses'

const CreateRoom = () => {
    const router = useRouter()

    const { value, loading, error } = useAsync(async () => {
        const response = await fetch('/api/room', {
            method: 'POST',
        })
        const result: PostRoomResponse = await response.json()
        return result
    }, [])

    useEffect(() => {
        if (value && 'slug' in value) {
            router.push(`/${value.slug}/create-player/admin`)
        }
    }, [value, router])

    if (loading)
        return (
            <ScreenMessage text="🧹🧽 One Second, We Are Preparing Your Room..." />
        )

    if (error || (value && 'error' in value))
        return (
            <ScreenMessage text="💔 Sorry, Something Went Wrong While Creating Your Room. Please Try Again!" />
        )
}

export default CreateRoom
