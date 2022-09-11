import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useSWR from 'swr'

import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { fetcher } from 'utils/fetcher'

import { PostRoomResponse } from 'types/apiResponses'
import { APP_NAME } from 'constants/appName'

const CreateRoom = () => {
    const router = useRouter()
    const { data, error } = useSWR<PostRoomResponse>('/api/room', fetcher)

    useEffect(() => {
        if (data && 'slug' in data) {
            router.push(`/${data.slug}/create-player/admin`)
        }
    }, [data, router])

    return (
        <>
            <Head>
                <title>{APP_NAME} - Preparing Your Room</title>
            </Head>
            {!data && !error && (
                <ScreenMessage text="🧹🧽 One Second, We Are Preparing Your Room..." />
            )}
            {(error || (data && 'error' in data)) && (
                <ScreenMessage text="💔 Sorry, Something Went Wrong While Creating Your Room. Please Try Again!" />
            )}
        </>
    )
}

export default CreateRoom
