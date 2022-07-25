import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space } = designTokens

export const ScreenMessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${space.sm}px;
`
