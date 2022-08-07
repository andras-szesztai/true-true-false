import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { fontSize, space, breakPoints } = designTokens

const stylesMapping = {
    fontSize: {
        base: fontSize.base,
        [breakPoints.md]: fontSize.md,
    },
    paddingTop: {
        base: ` ${space.xxs}px`,
        [breakPoints.md]: `${space.xs}px`,
    },
}

export const GuessEmojiContainer = styled.div`
    display: flex;
    align-items: center;
    min-height: ${space.lg}px;
    gap: ${space.xs}px;

    font-size: ${stylesMapping.fontSize.base};
    padding-top: ${stylesMapping.paddingTop.base};

    @media only screen and (min-width: ${breakPoints.md}px) {
        font-size: ${stylesMapping.fontSize[breakPoints.md]};
        padding-top: ${stylesMapping.paddingTop[breakPoints.md]};
    }
`
