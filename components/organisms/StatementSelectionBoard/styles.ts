import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, fontSize } = designTokens

export const StatementLabel = styled.label<{
    noBorderTop?: boolean
    isCurrentPlayerStatements: boolean
}>`
    flex: 1;
    cursor: ${({ isCurrentPlayerStatements }) =>
        isCurrentPlayerStatements ? 'default' : 'pointer'};
`

export const TextBoxRadio = styled.input`
    opacity: 0;
    position: absolute;
`

// TODO make it atom?
export const ErrorText = styled.p`
    margin-bottom: ${space.xxs}px;
    text-align: right;

    font-size: ${fontSize.base};
`
