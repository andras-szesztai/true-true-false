import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

import { PlayerTileSize, Props, StyleProps } from './types'

const { strokeWidth, color, space, fontSize, breakPoints } = designTokens

export const Container = styled.div`
    display: flex;
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

    ${({ noBorderTop }) =>
        noBorderTop &&
        css`
            border-top: none;
        `}

    ${({ size }) => css`
        .offline-icon {
            width: ${emojiContainerStylesMapping.offLineSvgWidth.base[size]};
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
