import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, fontSize } = designTokens

export const Container = styled.div`
    position: fixed;

    bottom: ${space.lg}px;
    right: ${space.lg}px;
`

export const ErrorText = styled.p`
    margin-bottom: ${space.xxs}px;
    text-align: right;

    font-size: ${fontSize.base};
`
