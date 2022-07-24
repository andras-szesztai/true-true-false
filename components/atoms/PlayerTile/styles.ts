import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

import { Props, StyleProps } from './types'

const { strokeWidth, color, space, fontSize } = designTokens

export const NameContainer = styled.div<Pick<Props, StyleProps>>`
    border: ${strokeWidth.md}px solid ${color.black};
    text-align: center;

    ${({ isOffline }) =>
        isOffline &&
        css`
            color: ${color.gray};
        `}

    ${({ noBorderTop }) =>
        noBorderTop &&
        css`
            border-top: none;
        `}

    padding: ${space.base}px ${space.xxl}px;
    font-size: ${fontSize.lg};
`
