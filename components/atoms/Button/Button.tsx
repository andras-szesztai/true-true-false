import { StyledButton } from './styles'
import { Props } from './types'

const Button = ({ text, size }: Props) => (
    <StyledButton size={size}>{text}</StyledButton>
)

export default Button
