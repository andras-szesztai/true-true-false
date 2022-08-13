import styled from '@emotion/styled'

export const StatementLabel = styled.label<{
    noBorderTop?: boolean
    isCurrentPlayerSelected: boolean
}>`
    flex: 1;
    cursor: ${({ isCurrentPlayerSelected }) =>
        isCurrentPlayerSelected ? 'default' : 'pointer'};
`

export const TextBoxRadio = styled.input`
    opacity: 0;
    position: absolute;
`
