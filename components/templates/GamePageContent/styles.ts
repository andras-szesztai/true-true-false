import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, breakPoints } = designTokens

const screenMessagesContainerStylesMap = {
    gap: {
        base: `${space.xs}px`,
        [breakPoints.md]: `${space.sm}px`,
    },
}

export const ScreenMessagesContainer = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${screenMessagesContainerStylesMap.gap.base};

    @media only screen and (min-width: ${breakPoints.md}px) {
        gap: ${screenMessagesContainerStylesMap.gap[breakPoints.md]};
    }
`
