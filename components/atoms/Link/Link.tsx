import NextLink from 'next/link'

import { Props } from './types'
import { StyledLink } from './styles'

const Link = ({ text, size, href, noBorderTop, disabled }: Props) => (
    <NextLink href={disabled ? '' : href}>
        <StyledLink size={size} noBorderTop={noBorderTop} disabled={disabled}>
            {text}
        </StyledLink>
    </NextLink>
)

export default Link
