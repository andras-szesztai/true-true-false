import SquareLoader from 'react-spinners/SquareLoader'

import { designTokens } from 'styles/designTokens'

import { Props } from './types'
import { LoadingContainer, StyledButton } from './styles'

const { color, space } = designTokens

const Button = ({
    onClick,
    text,
    size,
    noBorderTop,
    isDisabled = false,
    isLoading = false,
}: Props) => (
    <StyledButton
        onClick={onClick}
        size={size}
        noBorderTop={noBorderTop}
        isDisabled={isDisabled}
        isLoading={isLoading}
        disabled={isDisabled}
    >
        {text}
        <LoadingContainer>
            <SquareLoader
                loading={isLoading}
                color={color.black}
                size={space.md}
            />
        </LoadingContainer>
    </StyledButton>
)

export default Button
