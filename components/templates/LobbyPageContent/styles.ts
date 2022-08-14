import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, breakPoints } = designTokens

const stylesMap = {
    gap: {
        base: `${space.xs}px`,
        [breakPoints.md]: `${space.sm}px`,
    },
}

export const ScreenMessagesContainer = styled.div`
    display: grid;

    gap: ${stylesMap.gap.base};

    @media only screen and (min-width: ${breakPoints.md}px) {
        gap: ${stylesMap.gap[breakPoints.md]};
    }
`
