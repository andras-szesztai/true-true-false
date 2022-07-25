import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

import { Props, StyleProps } from './types'

const { strokeWidth, color, space, fontSize } = designTokens

export const Container = styled.div`
    display: flex;
`

export const EmojiContainer = styled.div<Pick<Props, 'noBorderTop'>>`
    border: ${strokeWidth.md}px solid ${color.black};
    border-right: none;

    ${({ noBorderTop }) =>
        noBorderTop &&
        css`
            border-top: none;
        `}

    padding: ${space.base}px ${space.md}px;
    font-size: ${fontSize.lg};
`

export const NameContainer = styled.div<Pick<Props, StyleProps>>`
    border: ${strokeWidth.md}px solid ${color.black};
    text-align: center;
    flex: 1;

    ${({ isOffline }) =>
        isOffline &&
        css`
            color: ${color.gray};
            &::selection {
                background: ${color.black};
            }
        `}

    ${({ noBorderTop }) =>
        noBorderTop &&
        css`
            border-top: none;
        `}

    padding: ${space.base}px ${space.xxl}px;
    font-size: ${fontSize.lg};
`
