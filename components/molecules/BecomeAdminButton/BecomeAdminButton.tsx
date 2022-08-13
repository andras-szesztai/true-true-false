import { Role } from '@prisma/client'
import { useAsyncFn } from 'react-use'

import { Button, ButtonSizes } from 'components/atoms/Button'

import { Container, ErrorText } from './styles'
import { Props } from './types'

const BecomeAdminButton = ({ players, roomSlug, playerSlug }: Props) => {
    const [becomeAdminState, handleBecomeAdmin] = useAsyncFn(async () => {
        const response = await fetch(
            `/api/room/${roomSlug}/player/${playerSlug}/become-admin`
        )
        const result = await response.json()
        return result
    }, [roomSlug, playerSlug])

    if (
        !players.some((p) => p.role === Role.ADMIN && !p.isActive) ||
        ('value' in becomeAdminState && 'success' in becomeAdminState.value)
    )
        return null

    return (
        <Container>
            {(becomeAdminState.error || becomeAdminState?.value?.error) && (
                <ErrorText>Please Try Again!</ErrorText>
            )}
            <Button
                text="Become Admin"
                size={ButtonSizes.sm}
                onClick={handleBecomeAdmin}
                isLoading={becomeAdminState.loading}
                isDisabled={becomeAdminState.loading}
            />
        </Container>
    )
}

export default BecomeAdminButton
