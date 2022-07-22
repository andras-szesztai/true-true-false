import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

export const StyledInput = styled.input`
    text-align: center;
    line-height: 1;
    padding: ${designTokens.space.md}px ${designTokens.space.xxl}px;
    font-size: ${designTokens.fontSize.xl};
    background-color: ${designTokens.color.background};
    border: ${designTokens.strokeWidth.md}px solid ${designTokens.color.black};

    ::placeholder {
        color: ${designTokens.color.black};
    }
`
