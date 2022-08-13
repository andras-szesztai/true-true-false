import { useEffect, useState } from 'react'
import { Role } from '@prisma/client'
import { usePrevious, useToggle } from 'react-use'

import { Button, ButtonSizes } from 'components/atoms/Button'
import { ScreenMessage } from 'components/atoms/ScreenMessage'

import { AdminButtonProps } from './types'

const AdminButton = ({
    role,
    slug,
    apiRoute,
    text,
    isDisabled = false,
    size = ButtonSizes.md,
    noSuccessMessage,
}: AdminButtonProps) => {
    const [isLoading, setIsLoading] = useToggle(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useToggle(false)

    const prevApiRout = usePrevious(apiRoute)
    useEffect(() => {
        if (apiRoute !== prevApiRout) {
            if (success) {
                setSuccess(false)
            }
            if (error) {
                setError('')
            }
        }
    }, [apiRoute, success, error, prevApiRout, setSuccess, setError])

    const handleRoomUpdate = async () => {
        setIsLoading()
        try {
            await fetch(`/api/room/${slug}${apiRoute}`)
            setSuccess()
            setError('')
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
                setSuccess(false)
            }
        } finally {
            setIsLoading()
        }
    }

    return (
        <>
            {error && <ScreenMessage text={error} />}
            {text && role === Role.ADMIN && !success && (
                <Button
                    text={text}
                    size={size}
                    isLoading={isLoading}
                    isDisabled={isDisabled || isLoading}
                    onClick={handleRoomUpdate}
                />
            )}
            {!noSuccessMessage && success && (
                <ScreenMessage text="Just One More Second..." />
            )}
        </>
    )
}

export default AdminButton
