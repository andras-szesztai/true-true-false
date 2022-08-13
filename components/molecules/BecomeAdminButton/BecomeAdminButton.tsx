import { Role } from '@prisma/client'

import { ErrorMessage } from 'components/atoms/ErrorMessage'
import { Button, ButtonSizes } from 'components/atoms/Button'
import { useAsyncFn } from 'hooks/useAsyncFn/useAsyncFn'

import { Container } from './styles'
import { Props } from './types'

const BecomeAdminButton = ({ players, roomSlug, playerSlug }: Props) => {
    const [handleBecomeAdmin, { data, loading, error }] = useAsyncFn<{
        success: true
    }>(() => fetch(`/api/room/${roomSlug}/player/${playerSlug}/become-admin`))

    if (!players.some((p) => p.role === Role.ADMIN && !p.isActive) || data) {
        return null
    }

    return (
        <Container>
            {error && <ErrorMessage text="Please Try Again!" />}
            <Button
                text="Become Admin"
                size={ButtonSizes.sm}
                onClick={handleBecomeAdmin}
                isLoading={loading}
                isDisabled={loading}
            />
        </Container>
    )
}

export default BecomeAdminButton
