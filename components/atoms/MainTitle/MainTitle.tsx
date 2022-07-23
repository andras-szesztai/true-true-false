import styled from '@emotion/styled'
import { designTokens } from 'styles/designTokens'

const { fontSize, breakPoints } = designTokens

const mainTitleStylesMapping = {
    fontSize: {
        base: fontSize.lg,
        [breakPoints.sm]: fontSize.xl,
        [breakPoints.md]: fontSize.xxl,
        [breakPoints.lg]: fontSize.xxl,
    },
} as const

const MainTitle = styled.h1`
    text-align: center;

    font-size: ${mainTitleStylesMapping.fontSize.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        font-size: ${mainTitleStylesMapping.fontSize[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        font-size: ${mainTitleStylesMapping.fontSize[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        font-size: ${mainTitleStylesMapping.fontSize[breakPoints.lg]};
    }
`

export default MainTitle
