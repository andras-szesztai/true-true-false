import { Room } from '@prisma/client'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAsync } from 'react-use'

const CreateRoom = () => {
    const router = useRouter()

    const { value, loading, error } = useAsync(async () => {
        const response = await fetch('/api/room', {
            method: 'POST',
        })
        const result: { data: Room } | { error: string } = await response.json()
        return result
    }, [])

    useEffect(() => {
        if (value && 'data' in value) {
            router.push(`/${value.data.slug}/create-player`)
        }
    }, [value, router])

    if (loading)
        return <ScreenMessage text="One second, we are creating your room..." />

    if (error || (value && 'error' in value))
        return (
            <ScreenMessage text="Sorry, something went wring while creating your room. Please try again!" />
        )
}

export default CreateRoom
