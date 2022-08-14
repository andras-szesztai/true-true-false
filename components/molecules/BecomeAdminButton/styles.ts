import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, breakPoints } = designTokens

const containerStylesMap = {
    position: {
        [breakPoints.md]: `${space.md}px`,
        [breakPoints.lg]: `${space.lg}px`,
    },
}

export const Container = styled.div`
    @media only screen and (min-width: ${breakPoints.md}px) {
        position: fixed;
        right: ${containerStylesMap.position[breakPoints.md]};
        bottom: ${containerStylesMap.position[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        right: ${containerStylesMap.position[breakPoints.lg]};
        bottom: ${containerStylesMap.position[breakPoints.lg]};
    }
`
