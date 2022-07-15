import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { designTokens } from 'styles/designTokens'
import { LinkSizes } from './types'

const linkStylesMapping = {
    padding: {
        desktop: {
            [LinkSizes.lg]: `${designTokens.space.md}px ${designTokens.space.xxl}px;`,
            [LinkSizes.md]: `${designTokens.space.base}px ${designTokens.space.lg}px;`,
        },
    },
    fontSize: {
        desktop: {
            [LinkSizes.lg]: designTokens.fontSize.xl,
            [LinkSizes.md]: designTokens.fontSize.lg,
        },
    },
} as const

export const StyledLink = styled.a<{ size: LinkSizes }>`
    background: ${designTokens.color.accentOne};
    border: ${designTokens.strokeWidth.md}px solid ${designTokens.color.black};
    cursor: pointer;
    line-height: 1;

    ${({ size }) => css`
        font-size: ${linkStylesMapping.fontSize.desktop[size]};
        padding: ${linkStylesMapping.padding.desktop[size]};
    `}
`
