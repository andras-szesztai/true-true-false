import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, breakPoints } = designTokens

const containerStylesMapping = {
    position: {
        base: `${space.sm}px`,
        [breakPoints.sm]: `${space.base}px`,
        [breakPoints.md]: `${space.md}px`,
        [breakPoints.lg]: `${space.lg}px`,
    },
}

export const MainContainer = styled.div`
    position: fixed;

    left: ${containerStylesMapping.position.base};
    top: ${containerStylesMapping.position.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        left: ${containerStylesMapping.position[breakPoints.sm]};
        top: ${containerStylesMapping.position[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        flex-direction: column;
        gap: 0;
        left: ${containerStylesMapping.position[breakPoints.md]};
        top: ${containerStylesMapping.position[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        left: ${containerStylesMapping.position[breakPoints.lg]};
        top: ${containerStylesMapping.position[breakPoints.lg]};
    }
`

export const PlayersContainer = styled.div`
    display: flex;
    flex-direction: column;
`
