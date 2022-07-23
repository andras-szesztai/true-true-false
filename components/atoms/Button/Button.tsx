import SquareLoader from 'react-spinners/SquareLoader'

import { designTokens } from 'styles/designTokens'

import { Props } from './types'
import { LoadingContainer, StyledButton } from './styles'

const Button = ({
    onClick,
    text,
    size,
    noBorderTop,
    isDisabled,
    isLoading = false,
}: Props) => (
    <StyledButton
        onClick={onClick}
        size={size}
        noBorderTop={noBorderTop}
        isDisabled={isDisabled}
        isLoading={isLoading}
    >
        {text}
        <LoadingContainer>
            <SquareLoader
                color={designTokens.color.black}
                loading={isLoading}
                size={24}
            />
        </LoadingContainer>
    </StyledButton>
)

export default Button
