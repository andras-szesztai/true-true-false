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

export const InputContainer = styled.div`
    position: relative;
`

export const InputError = styled.span`
    position: absolute;
    bottom: 0px;
    left: 0px;
    background: ${designTokens.color.accentTwo};
    font-size: ${designTokens.fontSize.base};
    width: 100%;
    height: ${designTokens.space.md};
    text-align: center;
    border: ${designTokens.strokeWidth.md}px solid ${designTokens.color.black};
    border-top: none;
`
