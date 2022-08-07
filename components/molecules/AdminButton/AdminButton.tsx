import { useEffect, useState } from 'react'
import { Role } from '@prisma/client'
import { usePrevious, useToggle } from 'react-use'

import { Button, ButtonSizes } from 'components/atoms/Button'
import { ScreenMessage } from 'components/atoms/ScreenMessage'

import { isEqual } from 'lodash'
import { AdminButtonProps } from './types'

const AdminButton = ({
    role,
    isDisabled,
    slug,
    apiRoute,
    postBody,
    text,
}: AdminButtonProps) => {
    const [isLoading, setIsLoading] = useToggle(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useToggle(false)

    const prevApiRout = usePrevious(apiRoute)
    const prevPostBody = usePrevious(postBody)
    useEffect(() => {
        if (apiRoute !== prevApiRout || !isEqual(postBody, prevPostBody)) {
            if (success) {
                setSuccess(false)
            }
            if (error) {
                setError('')
            }
        }
    }, [
        apiRoute,
        success,
        error,
        prevApiRout,
        setSuccess,
        setError,
        postBody,
        prevPostBody,
    ])
    // TODO sync fetch fns
    const handleRoomUpdate = async () => {
        try {
            setIsLoading()
            await fetch(`/api/room/${slug}${apiRoute}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postBody),
            })
            setSuccess()
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
        } finally {
            setIsLoading()
        }
    }
    return (
        <>
            {error && <ScreenMessage text={error} />}
            {role === Role.ADMIN && !success && (
                <Button
                    text={text}
                    size={ButtonSizes.md}
                    isLoading={isLoading}
                    isDisabled={isDisabled || isLoading}
                    onClick={handleRoomUpdate}
                />
            )}
            {success && <ScreenMessage text="Just One More Second..." />}
        </>
    )
}

export default AdminButton
