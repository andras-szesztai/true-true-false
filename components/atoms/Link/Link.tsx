import NextLink from 'next/link'

import { Props } from './types'
import { StyledLink } from './styles'

const Link = ({ text, size, href }: Props) => (
    <NextLink href={href}>
        <StyledLink size={size}>{text}</StyledLink>
    </NextLink>
)

export default Link
