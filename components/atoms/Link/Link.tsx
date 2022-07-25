import NextLink from 'next/link'
import SquareLoader from 'react-spinners/SquareLoader'

import { designTokens } from 'styles/designTokens'

import { Props } from './types'
import { LoadingContainer, StyledLink } from './styles'

const { color, space } = designTokens

const Link = ({
    text,
    size,
    href,
    noBorderTop,
    isDisabled,
    isLoading = false,
}: Props) => (
    <NextLink href={isDisabled ? '' : href}>
        <StyledLink
            href=""
            size={size}
            noBorderTop={noBorderTop}
            isDisabled={isDisabled}
            isLoading={isLoading}
        >
            {text}
            <LoadingContainer>
                <SquareLoader
                    loading={isLoading}
                    color={color.black}
                    size={space.md}
                />
            </LoadingContainer>
        </StyledLink>
    </NextLink>
)

export default Link
