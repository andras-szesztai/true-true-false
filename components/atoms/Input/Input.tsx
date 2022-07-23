import { InputContainer, InputError, StyledInput } from './styles'
import { Props } from './types'

const Input = ({ onChange, placeholder, maxLength = 5, error }: Props) => {
    return (
        <InputContainer>
            <StyledInput
                type="text"
                maxLength={maxLength}
                placeholder={placeholder}
                onChange={onChange}
            />
            {error && <InputError>{error}</InputError>}
        </InputContainer>
    )
}

export default Input
