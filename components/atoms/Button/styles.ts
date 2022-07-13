import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { designTokens } from 'styles/designTokens'
import { ButtonSizes } from './types'

const buttonStylesMapping = {
    padding: {
        desktop: {
            [ButtonSizes.lg]: `${designTokens.space.md}px ${designTokens.space.xxl}px;`,
            [ButtonSizes.md]: `${designTokens.space.base}px ${designTokens.space.lg}px;`,
        },
    },
    fontSize: {
        desktop: {
            [ButtonSizes.lg]: designTokens.fontSize.xl,
            [ButtonSizes.md]: designTokens.fontSize.lg,
        },
    },
} as const

export const StyledButton = styled.button<{ size: ButtonSizes }>`
    background: ${designTokens.color.accentOne};
    border: ${designTokens.strokeWidth.md}px solid ${designTokens.color.black};
    cursor: pointer;
    line-height: 1;

    ${({ size }) => css`
        font-size: ${buttonStylesMapping.fontSize.desktop[size]};
        padding: ${buttonStylesMapping.padding.desktop[size]};
    `}
`
