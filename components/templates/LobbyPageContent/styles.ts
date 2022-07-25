import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, breakPoints } = designTokens

const screenMessagesContainerStylesMapping = {
    gap: {
        base: `${space.xs}px`,
        [breakPoints.md]: `${space.sm}px`,
    },
}

export const ScreenMessagesContainer = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${screenMessagesContainerStylesMapping.gap.base};

    @media only screen and (min-width: ${breakPoints.md}px) {
        gap: ${screenMessagesContainerStylesMapping.gap[breakPoints.md]};
    }
`