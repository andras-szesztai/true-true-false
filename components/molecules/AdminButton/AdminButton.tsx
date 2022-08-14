import { useEffect, useState } from 'react'
import { Role } from '@prisma/client'
import { useMeasure, usePrevious, useToggle } from 'react-use'

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
    onSuccess,
    customError,
}: AdminButtonProps) => {
    const [ref, { height: buttonHeight }] = useMeasure<HTMLDivElement>()
    const [isLoading, setIsLoading] = useToggle(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useToggle(false)
    const prevSuccess = usePrevious(success)

    useEffect(() => {
        if (!prevSuccess && success && onSuccess) {
            onSuccess()
        }
    }, [success, onSuccess, prevSuccess])

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
            setError('')
            setSuccess(true)
        } catch (err) {
            if (err instanceof Error) {
                setSuccess(false)
                setError(err.message)
            }
        } finally {
            setIsLoading()
        }
    }

    return (
        <div ref={ref} style={{ minHeight: buttonHeight }}>
            {error && <ScreenMessage text={customError || error} />}
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
        </div>
    )
}

export default AdminButton
