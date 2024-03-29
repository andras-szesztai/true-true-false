import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { fontSize, breakPoints } = designTokens

export const JoinRoomContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const stylesMap = {
    fontSize: {
        base: fontSize.base,
        [breakPoints.md]: fontSize.md,
        [breakPoints.lg]: fontSize.lg,
    },
}

export const OrText = styled.h2`
    margin-bottom: ${designTokens.space.xxs}px;

    font-size: ${stylesMap.fontSize.base};

    @media only screen and (min-width: ${breakPoints.md}px) {
        font-size: ${stylesMap.fontSize[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        font-size: ${stylesMap.fontSize[breakPoints.lg]};
    }
`
