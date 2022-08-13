import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

import { Props, RoomSlugSizes } from './types'

const { space, fontSize, breakPoints } = designTokens

const containerStylesMap = {
    position: {
        base: `${space.sm}px`,
        [breakPoints.sm]: `${space.base}px`,
        [breakPoints.md]: `${space.md}px`,
        [breakPoints.lg]: `${space.lg}px`,
    },
}

export const Container = styled.div<Pick<Props, 'isFixed'>>`
    display: flex;
    gap: ${space.xs}px;
    justify-content: center;

    ${({ isFixed }) =>
        isFixed &&
        css`
            position: fixed;
            justify-content: flex-end;

            right: ${containerStylesMap.position.base};
            top: ${containerStylesMap.position.base};

            @media only screen and (min-width: ${breakPoints.sm}px) {
                right: ${containerStylesMap.position[breakPoints.sm]};
                top: ${containerStylesMap.position[breakPoints.sm]};
            }

            @media only screen and (min-width: ${breakPoints.md}px) {
                flex-direction: column;
                right: ${containerStylesMap.position[breakPoints.md]};
                top: ${containerStylesMap.position[breakPoints.md]};
            }

            @media only screen and (min-width: ${breakPoints.lg}px) {
                right: ${containerStylesMap.position[breakPoints.lg]};
                top: ${containerStylesMap.position[breakPoints.lg]};
            }
        `}

    @media only screen and (min-width: ${breakPoints.md}px) {
        gap: 0;
    }
`

const textStylesMap = {
    fontSize: {
        base: {
            [RoomSlugSizes.md]: fontSize.base,
            [RoomSlugSizes.lg]: fontSize.md,
        },
        [breakPoints.sm]: {
            [RoomSlugSizes.md]: fontSize.md,
            [RoomSlugSizes.lg]: fontSize.md,
        },
        [breakPoints.md]: {
            [RoomSlugSizes.md]: fontSize.md,
            [RoomSlugSizes.lg]: fontSize.lg,
        },
        [breakPoints.lg]: {
            [RoomSlugSizes.md]: fontSize.lg,
            [RoomSlugSizes.lg]: fontSize.xl,
        },
    },
}

export const Text = styled.h1<Pick<Props, 'size'>>`
    text-align: right;

    ${({ size }) => css`
        font-size: ${textStylesMap.fontSize.base[size]};

        @media only screen and (min-width: ${breakPoints.sm}px) {
            font-size: ${textStylesMap.fontSize[breakPoints.sm][size]};
        }

        @media only screen and (min-width: ${breakPoints.md}px) {
            font-size: ${textStylesMap.fontSize[breakPoints.md][size]};
        }

        @media only screen and (min-width: ${breakPoints.lg}px) {
            font-size: ${textStylesMap.fontSize[breakPoints.lg][size]};
        }
    `}
`
