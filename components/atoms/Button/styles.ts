import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

import { ButtonSizes, Props, StyleProps } from './types'

const { color, space, fontSize, strokeWidth, shadows, breakPoints } =
    designTokens

const stylesMap = {
    padding: {
        base: {
            [ButtonSizes.sm]: `${space.xs}px ${space.sm}px;`,
            [ButtonSizes.md]: `${space.sm}px ${space.md}px;`,
            [ButtonSizes.lg]: `${space.base}px ${space.lg}px;`,
        },
        [breakPoints.sm]: {
            [ButtonSizes.sm]: `${space.sm}px ${space.md}px;`,
            [ButtonSizes.md]: `${space.sm}px ${space.md}px;`,
            [ButtonSizes.lg]: `${space.base}px ${space.xl}px;`,
        },
        [breakPoints.md]: {
            [ButtonSizes.sm]: `${space.sm}px ${space.md}px;`,
            [ButtonSizes.md]: `${space.base}px ${space.lg}px;`,
            [ButtonSizes.lg]: `${space.md}px ${space.xxl}px;`,
        },
    },
    fontSize: {
        base: {
            [ButtonSizes.sm]: fontSize.base,
            [ButtonSizes.md]: fontSize.base,
            [ButtonSizes.lg]: fontSize.md,
        },
        [breakPoints.sm]: {
            [ButtonSizes.sm]: fontSize.base,
            [ButtonSizes.md]: fontSize.md,
            [ButtonSizes.lg]: fontSize.lg,
        },
        [breakPoints.md]: {
            [ButtonSizes.sm]: fontSize.base,
            [ButtonSizes.md]: fontSize.md,
            [ButtonSizes.lg]: fontSize.lg,
        },
        [breakPoints.lg]: {
            [ButtonSizes.sm]: fontSize.md,
            [ButtonSizes.md]: fontSize.lg,
            [ButtonSizes.lg]: fontSize.xl,
        },
    },
}

export const StyledButton = styled.button<Pick<Props, StyleProps>>`
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
        font-size: ${stylesMap.fontSize.base[size]};
        padding: ${stylesMap.padding.base[size]};

        @media only screen and (min-width: ${breakPoints.sm}px) {
            font-size: ${stylesMap.fontSize[breakPoints.sm][size]};
            padding: ${stylesMap.padding[breakPoints.sm][size]};
        }

        @media only screen and (min-width: ${breakPoints.md}px) {
            font-size: ${stylesMap.fontSize[breakPoints.md][size]};
            padding: ${stylesMap.padding[breakPoints.md][size]};
        }

        @media only screen and (min-width: ${breakPoints.lg}px) {
            font-size: ${stylesMap.fontSize[breakPoints.lg][size]};
        }
    `}
`

export const LoadingContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -45%);
`
