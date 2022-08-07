import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, fontSize } = designTokens

export const StatementLabel = styled.label<{ noBorderTop?: boolean }>`
    cursor: pointer;
    flex: 1;
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
