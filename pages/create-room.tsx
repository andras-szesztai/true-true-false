import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAsync } from 'react-use'

const CreateRoom = () => {
    const router = useRouter()
    const { value, loading, error } = useAsync(async () => {
        const response = await fetch('/api/room', { method: 'POST' })
        const result = await response.json()
        return result
    }, [])

    useEffect(() => {
        if (value?.data) {
            router.push(`/${value.data.slug}/create-player`)
        }
    }, [value, router])

    if (loading) return <div>Creating room, please wait . . .</div>
    if (error || value.error)
        return (
            <div>
                Sorry, something went wrong creating your room! Please try again
                later.
            </div>
        )
}

export default CreateRoom
