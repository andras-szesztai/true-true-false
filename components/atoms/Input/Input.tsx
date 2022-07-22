import { StyledInput } from './styles'
import { Props } from './types'

const Input = ({ onChange, placeholder, maxLength = 5 }: Props) => {
    return (
        <StyledInput
            type="text"
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

export default Input
