import styled from '@emotion/styled'
import { designTokens } from 'styles/designTokens'

const { space, breakPoints } = designTokens

const homeContainerStylesMapping = {
    gap: {
        base: space.lg,
        [breakPoints.sm]: space.xl,
        [breakPoints.lg]: space.xxl,
    },
}

const HomeContentContainer = styled.div`
    display: grid;
    justify-items: center;

    gap: ${homeContainerStylesMapping.gap.base}px;
    padding-block: ${space.md}px;

    @media only screen and (min-width: ${breakPoints.sm}px) {
        gap: ${homeContainerStylesMapping.gap[breakPoints.sm]}px;
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        padding-block: 0px;
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        gap: ${homeContainerStylesMapping.gap[breakPoints.lg]}px;
    }
`

export default HomeContentContainer
