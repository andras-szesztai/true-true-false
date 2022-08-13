import styled from '@emotion/styled'
import { designTokens } from 'styles/designTokens'

const { fontSize, breakPoints } = designTokens

const stylesMap = {
    fontSize: {
        base: fontSize.lg,
        [breakPoints.sm]: fontSize.xl,
        [breakPoints.md]: fontSize.xxl,
    },
}

const MainTitle = styled.h1`
    text-align: center;

    font-size: ${stylesMap.fontSize.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        font-size: ${stylesMap.fontSize[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        font-size: ${stylesMap.fontSize[breakPoints.md]};
    }
`

export default MainTitle
