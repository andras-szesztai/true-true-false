import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { fontSize, space, breakPoints, color, strokeWidth } = designTokens

const emojiContainerStylesMap = {
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
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    min-height: ${space.lg}px;
    gap: ${space.xs}px;

    font-size: ${emojiContainerStylesMap.fontSize.base};
    padding-top: ${emojiContainerStylesMap.paddingTop.base};

    @media only screen and (min-width: ${breakPoints.md}px) {
        font-size: ${emojiContainerStylesMap.fontSize[breakPoints.md]};
        padding-top: ${emojiContainerStylesMap.paddingTop[breakPoints.md]};
    }
`

const scoreStylesMap = {
    padding: {
        base: `${space.xxs}px`,
        [breakPoints.sm]: `${space.xs}px`,
        [breakPoints.md]: `${space.sm}px`,
    },
    fontSize: {
        base: fontSize.base,
        [breakPoints.sm]: fontSize.md,
        [breakPoints.lg]: fontSize.lg,
    },
}

const ScoreContainer = styled.div`
    position: absolute;
    background-color: ${color.background};
    color: ${color.black};
    border: ${strokeWidth.md}px solid ${color.black};
    transform: translate(50%, -50%);
    line-height: 1;

    padding: ${scoreStylesMap.padding.base};
    font-size: ${scoreStylesMap.fontSize.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        padding: ${scoreStylesMap.padding[breakPoints.sm]};
        font-size: ${scoreStylesMap.fontSize[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        padding: ${scoreStylesMap.padding[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        font-size: ${scoreStylesMap.fontSize[breakPoints.lg]};
    }
`

export const StatementScoreContainer = styled(ScoreContainer)`
    right: 0px;
    top: 50%;
`

export const SelectedPlayerScoreContainer = styled(ScoreContainer)`
    right: 0px;
    top: 50%;
`

export const PlayerTileContainer = styled.div`
    position: relative;
`
