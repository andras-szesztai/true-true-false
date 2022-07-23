import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, fontSize, breakPoints } = designTokens

const containerStylesMapping = {
    position: {
        base: `${space.sm}px`,
        [breakPoints.sm]: `${space.base}px`,
        [breakPoints.md]: `${space.md}px`,
        [breakPoints.lg]: `${space.lg}px`,
    },
} as const

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
        base: fontSize.md,
        [breakPoints.md]: fontSize.lg,
        [breakPoints.lg]: fontSize.xl,
    },
} as const

export const Text = styled.h1`
    text-align: right;
    font-size: ${textStylesMapping.fontSize.base};

    @media only screen and (min-width: ${breakPoints.md}px) {
        font-size: ${textStylesMapping.fontSize[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        font-size: ${textStylesMapping.fontSize[breakPoints.lg]};
    }
`
