import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

import { PlayerTileSize, Props, StyleProps } from './types'

const { strokeWidth, color, space, fontSize, breakPoints } = designTokens

export const Container = styled.div`
    display: flex;
    align-self: stretch;
`

const emojiContainerStylesMap = {
    width: {
        base: {
            [PlayerTileSize.md]: `${space.xl}px`,
            [PlayerTileSize.lg]: `${space.xl}px`,
        },
        [breakPoints.sm]: {
            [PlayerTileSize.md]: `${space.xl}px`,
            [PlayerTileSize.lg]: `${space.xxl}px`,
        },
        [breakPoints.md]: {
            [PlayerTileSize.md]: `${space.xxl}px`,
            [PlayerTileSize.lg]: `${space.xxl}px`,
        },
        [breakPoints.lg]: {
            [PlayerTileSize.md]: `${space.xxl}px`,
            [PlayerTileSize.lg]: `${space['3xl']}px`,
        },
    },
    fontSize: {
        base: {
            [PlayerTileSize.md]: fontSize.base,
            [PlayerTileSize.lg]: fontSize.md,
        },
        [breakPoints.md]: {
            [PlayerTileSize.md]: fontSize.md,
            [PlayerTileSize.lg]: fontSize.md,
        },
        [breakPoints.lg]: {
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
    justify-content: center;
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
            width: ${emojiContainerStylesMap.offLineSvgWidth.base[size]};
            height: ${emojiContainerStylesMap.offLineSvgWidth.base[size]};
        }
        width: ${emojiContainerStylesMap.width.base[size]};
        font-size: ${emojiContainerStylesMap.fontSize.base[size]};
        padding: ${emojiContainerStylesMap.padding.base[size]};

        @media only screen and (min-width: ${breakPoints.sm}px) {
            width: ${emojiContainerStylesMap.width[breakPoints.sm][size]};
            padding: ${emojiContainerStylesMap.padding[breakPoints.sm][size]};
        }

        @media only screen and (min-width: ${breakPoints.md}px) {
            .offline-icon {
                width: ${emojiContainerStylesMap.offLineSvgWidth[
                    breakPoints.md
                ][size]};
                height: ${emojiContainerStylesMap.offLineSvgWidth[
                    breakPoints.md
                ][size]};
            }
            width: ${emojiContainerStylesMap.width[breakPoints.md][size]};
            font-size: ${emojiContainerStylesMap.fontSize[breakPoints.md][
                size
            ]};
            padding: ${emojiContainerStylesMap.padding[breakPoints.md][size]};
        }

        @media only screen and (min-width: ${breakPoints.lg}px) {
            width: ${emojiContainerStylesMap.width[breakPoints.lg][size]};
            padding: ${emojiContainerStylesMap.padding[breakPoints.lg][size]};
            font-size: ${emojiContainerStylesMap.fontSize[breakPoints.lg][
                size
            ]};
        }
    `}
`

const nameContainerStylesMap = {
    fontSize: {
        base: {
            [PlayerTileSize.md]: fontSize.sm,
            [PlayerTileSize.lg]: fontSize.base,
        },
        [breakPoints.sm]: {
            [PlayerTileSize.md]: fontSize.base,
            [PlayerTileSize.lg]: fontSize.md,
        },
        [breakPoints.md]: {
            [PlayerTileSize.md]: fontSize.base,
            [PlayerTileSize.lg]: fontSize.md,
        },
        [breakPoints.lg]: {
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
        font-size: ${nameContainerStylesMap.fontSize.base[size]};
        padding: ${nameContainerStylesMap.padding.base[size]};

        @media only screen and (min-width: ${breakPoints.sm}px) {
            font-size: ${nameContainerStylesMap.fontSize[breakPoints.sm][size]};
            padding: ${nameContainerStylesMap.padding[breakPoints.sm][size]};
        }

        @media only screen and (min-width: ${breakPoints.md}px) {
            font-size: ${nameContainerStylesMap.fontSize[breakPoints.md][size]};
            padding: ${nameContainerStylesMap.padding[breakPoints.md][size]};
        }

        @media only screen and (min-width: ${breakPoints.lg}px) {
            font-size: ${nameContainerStylesMap.fontSize[breakPoints.lg][size]};
            padding: ${nameContainerStylesMap.padding[breakPoints.lg][size]};
        }
    `}
`

const scoreContainerStylesMap = {
    width: {
        base: {
            [PlayerTileSize.md]: `${space.xl}px`,
            [PlayerTileSize.lg]: `${space.xxl}px`,
        },
        [breakPoints.sm]: {
            [PlayerTileSize.md]: `${space.xxl}px`,
            [PlayerTileSize.lg]: `${space.xxl}px`,
        },
        [breakPoints.md]: {
            [PlayerTileSize.md]: `${space['3xl']}px`,
            [PlayerTileSize.lg]: `${space['5xl']}px`,
        },
    },
    paddingRight: {
        base: {
            [PlayerTileSize.md]: `${space.base}px`,
            [PlayerTileSize.lg]: `${space.md}px`,
        },
        [breakPoints.md]: {
            [PlayerTileSize.md]: `${space.md}px`,
            [PlayerTileSize.lg]: `${space.lg}px`,
        },
    },
}

export const ScoreContainer = styled.div<Pick<Props, 'size'>>`
    align-self: stretch;
    position: relative;
    display: flex;
    align-items: center;

    ${({ size }) => css`
        width: ${scoreContainerStylesMap.width.base[size]};
        padding-right: ${scoreContainerStylesMap.paddingRight.base[size]};

        @media only screen and (min-width: ${breakPoints.sm}px) {
            width: ${scoreContainerStylesMap.width[breakPoints.sm][size]};
        }

        @media only screen and (min-width: ${breakPoints.md}px) {
            width: ${scoreContainerStylesMap.width[breakPoints.md][size]};
            padding-right: ${scoreContainerStylesMap.paddingRight[
                breakPoints.md
            ][size]};
        }
    `}
`

export const ScoreBar = styled.span<{ width: number }>`
    width: ${({ width }) => width * 100}%;
    height: 50%;
    background: ${color.black};

    @media only screen and (min-width: ${breakPoints.md}px) {
        height: 60%;
    }
`

const scoreNumberContainerStylesMap = {
    fontSize: {
        base: {
            [PlayerTileSize.md]: fontSize.sm,
            [PlayerTileSize.lg]: fontSize.base,
        },
        [breakPoints.md]: {
            [PlayerTileSize.md]: fontSize.base,
            [PlayerTileSize.lg]: fontSize.md,
        },
    },
}

export const StarContainer = styled.span<Pick<Props, 'size'>>`
    position: absolute;
    left: ${space.xxs}px;
    top: 50%;
    transform: translateY(-50%);

    ${({ size }) => css`
        font-size: ${scoreNumberContainerStylesMap.fontSize.base[size]};

        @media only screen and (min-width: ${breakPoints.md}px) {
            font-size: ${scoreNumberContainerStylesMap.fontSize[breakPoints.md][
                size
            ]};
        }
    `}
`

export const ScoreNumberContainer = styled.span<Pick<Props, 'size'>>`
    position: absolute;
    right: 0px;

    ${({ size }) => css`
        font-size: ${scoreNumberContainerStylesMap.fontSize.base[size]};

        @media only screen and (min-width: ${breakPoints.md}px) {
            font-size: ${scoreNumberContainerStylesMap.fontSize[breakPoints.md][
                size
            ]};
        }
    `}
`
