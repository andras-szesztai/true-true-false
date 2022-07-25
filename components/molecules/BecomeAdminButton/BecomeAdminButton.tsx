import React, { useState } from 'react'
import { Role } from '@prisma/client'
import { useToggle } from 'react-use'

import { Button, ButtonSizes } from 'components/atoms/Button'

import { Container, ErrorText } from './styles'
import { Props } from './types'

const BecomeAdminButton = ({ players, roomSlug, playerSlug }: Props) => {
    const [loading, setLoading] = useToggle(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useToggle(false)

    if (!players.some((p) => p.role === Role.ADMIN && !p.isActive) || success)
        return null
    const handleBecomeAdminClick = async () => {
        try {
            setLoading()
            await fetch(
                `/api/room/${roomSlug}/player/${playerSlug}/become-admin`
            )
            setSuccess()
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
        } finally {
            setLoading()
        }
    }
    return (
        <Container>
            {error && <ErrorText>Please Try Again!</ErrorText>}
            <Button
                text="Become Admin"
                size={ButtonSizes.sm}
                onClick={handleBecomeAdminClick}
                isLoading={loading}
                isDisabled={loading}
            />
        </Container>
    )
}

export default BecomeAdminButton
