import React from 'react'
import { Role } from '@prisma/client'

import { Button, ButtonSizes } from 'components/atoms/Button'

import { Props } from './types'
import { Container } from './styles'

const BecomeAdminButton = ({ players }: Props) => {
    const shouldShow = !players.some(
        (p) => p.role === Role.ADMIN && !p.isActive
    )
    if (shouldShow) return null
    return (
        <Container>
            <Button
                text="Become Admin"
                size={ButtonSizes.sm}
                onClick={() => {
                    console.log('Becoming admin')
                }}
                // isLoading={isLoading}
                // isDisabled={isDisabled || isLoading}
            />
        </Container>
    )
}

export default BecomeAdminButton
