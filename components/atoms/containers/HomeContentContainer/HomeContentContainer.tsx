import styled from '@emotion/styled'
import { designTokens } from 'styles/designTokens'

const { space, breakPoints } = designTokens

const homeContainerStylesMapping = {
    gap: {
        base: space.lg,
        [breakPoints.sm]: space.xl,
        [breakPoints.md]: space.xxl,
        [breakPoints.lg]: space.xxl,
    },
} as const

const HomeContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: ${homeContainerStylesMapping.gap.base}px;

    @media only screen and (min-width: ${breakPoints.sm}px) {
        gap: ${homeContainerStylesMapping.gap[breakPoints.sm]}px;
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        gap: ${homeContainerStylesMapping.gap[breakPoints.md]}px;
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        gap: ${homeContainerStylesMapping.gap[breakPoints.lg]}px;
    }
`

export default HomeContentContainer
