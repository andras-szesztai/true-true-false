import NextLink from 'next/link'

import { Props } from './types'
import { StyledLink } from './styles'

const Link = ({ text, size, href, noBorderTop }: Props) => (
    <NextLink href={href}>
        <StyledLink size={size} noBorderTop={noBorderTop}>
            {text}
        </StyledLink>
    </NextLink>
)

export default Link
