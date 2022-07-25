import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

import { LinkSizes, Props, StyleProps } from './types'

const { color, space, fontSize, strokeWidth, shadows, breakPoints } =
    designTokens

const linkStylesMapping = {
    padding: {
        base: {
            [LinkSizes.md]: `${space.sm}px ${space.md}px;`,
            [LinkSizes.lg]: `${space.base}px ${space.lg}px;`,
        },
        [breakPoints.sm]: {
            [LinkSizes.md]: `${space.sm}px ${space.md}px;`,
            [LinkSizes.lg]: `${space.base}px ${space.xl}px;`,
        },
        [breakPoints.md]: {
            [LinkSizes.md]: `${space.base}px ${space.lg}px;`,
            [LinkSizes.lg]: `${space.md}px ${space.xxl}px;`,
        },
    },
    fontSize: {
        base: {
            [LinkSizes.md]: fontSize.base,
            [LinkSizes.lg]: fontSize.md,
        },
        [breakPoints.md]: {
            [LinkSizes.md]: fontSize.md,
            [LinkSizes.lg]: fontSize.lg,
        },
        [breakPoints.lg]: {
            [LinkSizes.md]: fontSize.lg,
            [LinkSizes.lg]: fontSize.xl,
        },
    },
}

export const StyledLink = styled.a<Pick<Props, StyleProps>>`
    position: relative;
    cursor: pointer;
    text-align: center;
    width: fit-content;

    background: ${color.accentOne};
    border: ${strokeWidth.md}px solid ${color.black};
    color: ${color.black};
    text-decoration: none;
    z-index: 1;

    &:focus {
        outline: none;
        box-shadow: ${shadows.focus};
        z-index: 0;
    }

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

            &:focus {
                outline: none;
                box-shadow: none;
                z-index: 0;
            }
        `}
    ${({ isLoading }) =>
        isLoading &&
        css`
            color: transparent;
        `}

    ${({ size }) => css`
        font-size: ${linkStylesMapping.fontSize.base[size]};
        padding: ${linkStylesMapping.padding.base[size]};

        @media only screen and (min-width: ${breakPoints.sm}px) {
            padding: ${linkStylesMapping.padding[breakPoints.sm][size]};
        }

        @media only screen and (min-width: ${breakPoints.md}px) {
            font-size: ${linkStylesMapping.fontSize[breakPoints.md][size]};
            padding: ${linkStylesMapping.padding[breakPoints.md][size]};
        }

        @media only screen and (min-width: ${breakPoints.lg}px) {
            font-size: ${linkStylesMapping.fontSize[breakPoints.lg][size]};
        }
    `}
`

export const LoadingContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -45%);
`
