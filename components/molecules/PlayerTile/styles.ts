import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

import { PlayerTileSize, Props, StyleProps } from './types'

const { strokeWidth, color, space, fontSize, breakPoints } = designTokens

export const Container = styled.div`
    display: flex;
    align-self: stretch;
`

const emojiContainerStylesMapping = {
    fontSize: {
        base: {
            [PlayerTileSize.md]: fontSize.base,
            [PlayerTileSize.lg]: fontSize.md,
        },
        [breakPoints.md]: {
            [PlayerTileSize.md]: fontSize.md,
            [PlayerTileSize.lg]: fontSize.lg,
        },
    },
    offLineSvgWidth: {
        base: {
            [PlayerTileSize.md]: `${space.base}px`,
            [PlayerTileSize.lg]: `${space.md}px`,
        },
        [breakPoints.md]: {
            [PlayerTileSize.md]: `${space.md}px`,
            [PlayerTileSize.lg]: `${space.lg}px`,
        },
    },
    padding: {
        base: {
            [PlayerTileSize.md]: `${space.xs}px ${space.xs}px`,
            [PlayerTileSize.lg]: `${space.sm}px ${space.sm}px`,
        },
        [breakPoints.sm]: {
            [PlayerTileSize.md]: `${space.sm}px ${space.xs}px`,
            [PlayerTileSize.lg]: `${space.sm}px ${space.base}px`,
        },
        [breakPoints.md]: {
            [PlayerTileSize.md]: `${space.sm}px ${space.sm}px`,
            [PlayerTileSize.lg]: `${space.base}px ${space.base}px`,
        },
        [breakPoints.lg]: {
            [PlayerTileSize.md]: `${space.sm}px ${space.base}px`,
            [PlayerTileSize.lg]: `${space.base}px ${space.md}px`,
        },
    },
}

export const EmojiContainer = styled.div<Pick<Props, 'noBorderTop' | 'size'>>`
    display: flex;
    align-items: center;
    border: ${strokeWidth.md}px solid ${color.black};
    border-right: none;
    line-height: 1;

    ${({ noBorderTop }) =>
        noBorderTop &&
        css`
            border-top: none;
        `}

    ${({ size }) => css`
        .offline-icon {
            width: ${emojiContainerStylesMapping.offLineSvgWidth.base[size]};
            height: ${emojiContainerStylesMapping.offLineSvgWidth.base[size]};
        }
        font-size: ${emojiContainerStylesMapping.fontSize.base[size]};
        padding: ${emojiContainerStylesMapping.padding.base[size]};

        @media only screen and (min-width: ${breakPoints.sm}px) {
            padding: ${emojiContainerStylesMapping.padding[breakPoints.sm][
                size
            ]};
        }

        @media only screen and (min-width: ${breakPoints.md}px) {
            .offline-icon {
                width: ${emojiContainerStylesMapping.offLineSvgWidth[
                    breakPoints.md
                ][size]};
                height: ${emojiContainerStylesMapping.offLineSvgWidth[
                    breakPoints.md
                ][size]};
            }
            font-size: ${emojiContainerStylesMapping.fontSize[breakPoints.md][
                size
            ]};
            padding: ${emojiContainerStylesMapping.padding[breakPoints.md][
                size
            ]};
        }

        @media only screen and (min-width: ${breakPoints.lg}px) {
            padding: ${emojiContainerStylesMapping.padding[breakPoints.lg][
                size
            ]};
        }
    `}
`

const nameContainerStylesMapping = {
    fontSize: {
        base: {
            [PlayerTileSize.md]: fontSize.base,
            [PlayerTileSize.lg]: fontSize.md,
        },
        [breakPoints.md]: {
            [PlayerTileSize.md]: fontSize.md,
            [PlayerTileSize.lg]: fontSize.lg,
        },
    },
    padding: {
        base: {
            [PlayerTileSize.md]: `${space.xs}px ${space.base}px`,
            [PlayerTileSize.lg]: `${space.sm}px ${space.base}px`,
        },
        [breakPoints.sm]: {
            [PlayerTileSize.md]: `${space.xs}px ${space.md}px`,
            [PlayerTileSize.lg]: `${space.sm}px ${space.lg}px`,
        },
        [breakPoints.md]: {
            [PlayerTileSize.md]: `${space.sm}px ${space.md}px`,
            [PlayerTileSize.lg]: `${space.base}px ${space.xl}px`,
        },
        [breakPoints.lg]: {
            [PlayerTileSize.md]: `${space.sm}px ${space.lg}px`,
            [PlayerTileSize.lg]: `${space.base}px ${space.xxl}px`,
        },
    },
}

export const NameContainer = styled.div<Pick<Props, StyleProps>>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${strokeWidth.md}px solid ${color.black};
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

        ${({ size }) => css`
        font-size: ${nameContainerStylesMapping.fontSize.base[size]};
        padding: ${nameContainerStylesMapping.padding.base[size]};

        @media only screen and (min-width: ${breakPoints.sm}px) {
            padding: ${nameContainerStylesMapping.padding[breakPoints.sm][
                size
            ]};
        }

        @media only screen and (min-width: ${breakPoints.md}px) {
            font-size: ${nameContainerStylesMapping.fontSize[breakPoints.md][
                size
            ]};
            padding: ${nameContainerStylesMapping.padding[breakPoints.md][
                size
            ]};
        }

        @media only screen and (min-width: ${breakPoints.lg}px) {
            padding: ${nameContainerStylesMapping.padding[breakPoints.lg][
                size
            ]};
        }
    `}
`

const scoreContainerStylesMapping = {
    width: {
        base: `${space.xl}px`,
        [breakPoints.sm]: `${space.xxl}px`,
        [breakPoints.md]: `${space['3xl']}px`,
    },
    paddingRight: {
        base: `${space.base}px`,
        [breakPoints.md]: `${space.md}px`,
    },
}

export const ScoreContainer = styled.div`
    align-self: stretch;
    position: relative;
    display: flex;
    align-items: center;

    width: ${scoreContainerStylesMapping.width.base};
    padding-right: ${scoreContainerStylesMapping.paddingRight.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        width: ${scoreContainerStylesMapping.width[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        width: ${scoreContainerStylesMapping.width[breakPoints.md]};
        padding-right: ${scoreContainerStylesMapping.paddingRight[
            breakPoints.md
        ]};
    }
`

export const ScoreBar = styled.span<{ width: number }>`
    width: ${({ width }) => width * 100}%;
    height: 50%;
    background: ${color.black};
`

export const StarContainer = styled.span`
    position: absolute;
    left: ${space.xxs}px;
    top: 50%;
    transform: translateY(-50%);
`

const scoreNumberContainerStylesMapping = {
    fontSize: {
        base: fontSize.sm,
        [breakPoints.md]: fontSize.base,
    },
}

export const ScoreNumberContainer = styled.span`
    position: absolute;
    right: 0px;
    font-size: ${scoreNumberContainerStylesMapping.fontSize.base};

    @media only screen and (min-width: ${breakPoints.md}px) {
        font-size: ${scoreNumberContainerStylesMapping.fontSize[
            breakPoints.md
        ]};
    }
`
