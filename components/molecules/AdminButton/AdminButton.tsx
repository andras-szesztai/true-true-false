import { useState } from 'react'
import { Role } from '@prisma/client'
import { useToggle } from 'react-use'

import { Button, ButtonSizes } from 'components/atoms/Button'
import { ScreenMessage } from 'components/atoms/ScreenMessage'

import { AdminButtonProps } from './types'

const AdminButton = ({
    role,
    isDisabled,
    slug,
    apiRoute,
    postBody,
    text,
    isLoading: parentIsLoading,
    isSuccess: parentIsSuccess,
    error: parentError,
    onClick = () => {},
}: AdminButtonProps) => {
    const [isLoading, setIsLoading] = useToggle(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useToggle(false)
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
            {(error || parentError) && (
                <ScreenMessage text={error || parentError!} />
            )}
            {role === Role.ADMIN && !success && (
                <Button
                    text={text}
                    size={ButtonSizes.md}
                    isLoading={isLoading || parentIsLoading}
                    isDisabled={isDisabled || isLoading || parentIsLoading}
                    onClick={apiRoute ? handleRoomUpdate : onClick}
                />
            )}
            {(success || parentIsSuccess) && (
                <ScreenMessage text="Just One More Second..." />
            )}
        </>
    )
}

export default AdminButton
