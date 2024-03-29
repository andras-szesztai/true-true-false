import styled from '@emotion/styled'
import { designTokens } from 'styles/designTokens'

const { space, breakPoints } = designTokens

const stylesMap = {
    gap: {
        base: space.lg,
        [breakPoints.sm]: space.xl,
        [breakPoints.lg]: space.xxl,
    },
}

const HomeContentContainer = styled.div`
    display: grid;
    justify-items: center;

    gap: ${stylesMap.gap.base}px;
    padding: ${space.md}px 0;

    @media only screen and (min-width: ${breakPoints.sm}px) {
        gap: ${stylesMap.gap[breakPoints.sm]}px;
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        padding: 0px;
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        gap: ${stylesMap.gap[breakPoints.lg]}px;
    }
`

export default HomeContentContainer
