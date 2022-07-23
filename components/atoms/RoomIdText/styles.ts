import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, fontSize } = designTokens

export const Container = styled.div`
    position: absolute;
    display: flex;
    right: ${space.lg}px;
    top: ${space.lg}px;
    flex-direction: column;
    justify-content: flex-end;
`

export const Text = styled.h1`
    font-size: ${fontSize.xl};
    text-align: right;
`
