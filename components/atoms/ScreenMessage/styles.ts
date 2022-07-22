import styled from '@emotion/styled'
import { designTokens } from 'styles/designTokens'

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const MessageContainer = styled.div`
    max-width: 700px;
    text-align: center;
`

export const Message = styled.h1`
    font-size: ${designTokens.fontSize.lg};
`
