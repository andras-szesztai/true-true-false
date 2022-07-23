import { ChartCounter } from 'components/atoms/CharCounter'

import { InputContainer, InputError, StyledInput } from './styles'
import { Props } from './types'

const Input = ({
    onChange,
    placeholder,
    maxLength = 5,
    error,
    value,
}: Props) => (
    <InputContainer>
        <StyledInput
            type="text"
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
        <ChartCounter value={maxLength - value.length} />
        {error && <InputError>{error}</InputError>}
    </InputContainer>
)

export default Input
