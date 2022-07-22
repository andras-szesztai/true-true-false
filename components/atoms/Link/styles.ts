import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { designTokens } from 'styles/designTokens'

import { LinkSizes, Props, StyleProps } from './types'

const { color, space, fontSize, strokeWidth } = designTokens

const linkStylesMapping = {
    padding: {
        desktop: {
            [LinkSizes.lg]: `${space.md}px ${space.xxl}px;`,
            [LinkSizes.md]: `${space.base}px ${space.lg}px;`,
        },
    },
    fontSize: {
        desktop: {
            [LinkSizes.lg]: fontSize.xl,
            [LinkSizes.md]: fontSize.lg,
        },
    },
} as const

export const StyledLink = styled.a<Pick<Props, StyleProps>>`
    position: relative;
    cursor: pointer;
    text-align: center;

    background: ${color.accentOne};
    border: ${strokeWidth.md}px solid ${color.black};

    ${({ size }) => css`
        font-size: ${linkStylesMapping.fontSize.desktop[size]};
        padding: ${linkStylesMapping.padding.desktop[size]};
    `}
    ${({ noBorderTop }) =>
        noBorderTop &&
        css`
            border-top: none;
        `}
    ${({ isDisabled }) =>
        isDisabled &&
        css`
            cursor: not-allowed;
            background: ${color.accentThree};
        `}
    ${({ isLoading }) =>
        isLoading &&
        css`
            color: transparent;
        `}
`

export const LoadingContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -45%);
`
