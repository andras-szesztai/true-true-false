import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

import { Props, StyleProps } from './types'

const { strokeWidth, color, space, fontSize, breakPoints } = designTokens

export const Container = styled.div`
    display: flex;
`

const emojiContainerStylesMapping = {
    fontSize: {
        base: fontSize.md,
        [breakPoints.md]: fontSize.lg,
    },
    offLineSvgWidth: {
        base: `${space.md}px`,
        [breakPoints.sm]: `${space.md}px`,
        [breakPoints.md]: `${space.lg}px`,
    },
    padding: {
        base: `${space.sm}px ${space.sm}px`,
        [breakPoints.sm]: `${space.sm}px ${space.base}px`,
        [breakPoints.md]: `${space.base}px ${space.base}px`,
        [breakPoints.lg]: `${space.base}px ${space.md}px`,
    },
}

export const EmojiContainer = styled.div<Pick<Props, 'noBorderTop'>>`
    display: flex;
    align-items: center;
    border: ${strokeWidth.md}px solid ${color.black};
    border-right: none;

    ${({ noBorderTop }) =>
        noBorderTop &&
        css`
            border-top: none;
        `}

    .offline-icon {
        width: ${emojiContainerStylesMapping.offLineSvgWidth.base};
    }
    font-size: ${emojiContainerStylesMapping.fontSize.base};
    padding: ${emojiContainerStylesMapping.padding.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        .offline-icon {
            width: ${emojiContainerStylesMapping.offLineSvgWidth[
                breakPoints.sm
            ]};
        }
        padding: ${emojiContainerStylesMapping.padding[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        .offline-icon {
            width: ${emojiContainerStylesMapping.offLineSvgWidth[
                breakPoints.md
            ]};
        }
        font-size: ${emojiContainerStylesMapping.fontSize[breakPoints.md]};
        padding: ${emojiContainerStylesMapping.padding[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        padding: ${emojiContainerStylesMapping.padding[breakPoints.lg]};
    }
`

const nameContainerStylesMapping = {
    fontSize: {
        base: fontSize.md,
        [breakPoints.md]: fontSize.lg,
    },
    padding: {
        base: `${space.sm}px ${space.base}px`,
        [breakPoints.sm]: `${space.sm}px ${space.lg}px`,
        [breakPoints.md]: `${space.base}px ${space.xl}px`,
        [breakPoints.lg]: `${space.base}px ${space.xxl}px`,
    },
}

export const NameContainer = styled.div<Pick<Props, StyleProps>>`
    border: ${strokeWidth.md}px solid ${color.black};
    text-align: center;
    flex: 1;

    ${({ isOffline }) =>
        isOffline &&
        css`
            color: ${color.gray};
            &::selection {
                background: ${color.black};
            }
        `}

    ${({ noBorderTop }) =>
        noBorderTop &&
        css`
            border-top: none;
        `}

    font-size: ${nameContainerStylesMapping.fontSize.base};
    padding: ${nameContainerStylesMapping.padding.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        padding: ${nameContainerStylesMapping.padding[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        font-size: ${nameContainerStylesMapping.fontSize[breakPoints.md]};
        padding: ${nameContainerStylesMapping.padding[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        padding: ${nameContainerStylesMapping.padding[breakPoints.lg]};
    }
`
