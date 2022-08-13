import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space } = designTokens

export const Container = styled.div`
    position: fixed;
    bottom: ${space.lg}px;
    right: ${space.lg}px;
`
