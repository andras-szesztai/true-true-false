import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { shadows, color, fontSize, space, strokeWidth } = designTokens

export const StyledInput = styled.input`
    text-align: center;
    line-height: 1;
    padding: ${space.md}px ${space.xxl}px;
    font-size: ${fontSize.xl};
    background-color: ${color.background};
    border: ${strokeWidth.md}px solid ${color.black};
    z-index: 1;
    width: 468px;

    ::placeholder {
        color: ${color.black};
    }

    &:focus {
        outline: none;
        box-shadow: ${shadows.focus};
        z-index: 0;
    }
`

export const InputContainer = styled.div`
    position: relative;
    z-index: 1;
`

export const InputError = styled.span`
    position: absolute;
    bottom: 0px;
    left: 0px;
    background: ${color.accentTwo};
    font-size: ${fontSize.base};
    width: 100%;
    height: ${space.md};
    text-align: center;
    border: ${strokeWidth.md}px solid ${color.black};
    border-top: none;
`
