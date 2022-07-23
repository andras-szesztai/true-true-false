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
        {error && <InputError>{error}</InputError>}
        <ChartCounter value={maxLength - value.length} />
    </InputContainer>
)

export default Input
