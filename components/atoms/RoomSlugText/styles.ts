import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'
import { Props, RoomSlugSizes } from './types'

const { space, fontSize, breakPoints } = designTokens

const containerStylesMapping = {
    position: {
        base: `${space.sm}px`,
        [breakPoints.sm]: `${space.base}px`,
        [breakPoints.md]: `${space.md}px`,
        [breakPoints.lg]: `${space.lg}px`,
    },
}

export const Container = styled.div`
    position: absolute;
    display: flex;
    gap: ${space.xs}px;

    flex-direction: row;
    right: ${containerStylesMapping.position.base};
    top: ${containerStylesMapping.position.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        right: ${containerStylesMapping.position[breakPoints.sm]};
        top: ${containerStylesMapping.position[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        flex-direction: column;
        gap: 0;
        right: ${containerStylesMapping.position[breakPoints.md]};
        top: ${containerStylesMapping.position[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        right: ${containerStylesMapping.position[breakPoints.lg]};
        top: ${containerStylesMapping.position[breakPoints.lg]};
    }
`

const textStylesMapping = {
    fontSize: {
        base: {
            [RoomSlugSizes.md]: fontSize.base,
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
        font-size: ${textStylesMapping.fontSize.base[size]};

        @media only screen and (min-width: ${breakPoints.md}px) {
            font-size: ${textStylesMapping.fontSize[breakPoints.md][size]};
        }

        @media only screen and (min-width: ${breakPoints.lg}px) {
            font-size: ${textStylesMapping.fontSize[breakPoints.lg][size]};
        }
    `}
`
