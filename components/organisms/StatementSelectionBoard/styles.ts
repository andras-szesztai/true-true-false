import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { designTokens } from 'styles/designTokens'

const { color, strokeWidth, space, fontSize } = designTokens

export const StatementContainer = styled.div<{
    noBorderTop?: boolean
    isSelected: boolean
}>`
    position: relative;
    display: flex;
    background-color: ${color.background};
    border: ${strokeWidth.md}px solid ${color.black};

    ${({ noBorderTop }) =>
        noBorderTop &&
        css`
            border-top: none;
        `}

    ${({ isSelected }) =>
        isSelected &&
        css`
            background-color: ${color.black};
            color: ${color.background};
        `}

    padding: ${space.md}px;
    font-size: ${fontSize.lg};
    width: 360px;
`

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
