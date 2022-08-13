import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, fontSize } = designTokens

export const StyledParagraph = styled.p`
    margin-bottom: ${space.xxs}px;
    text-align: right;

    font-size: ${fontSize.base};
`
