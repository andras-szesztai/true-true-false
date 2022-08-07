import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { PlayerTileSize } from 'components/molecules/PlayerTile'

import { designTokens } from 'styles/designTokens'

import { Props } from './types'

const { color, space, strokeWidth, breakPoints } = designTokens

const containerStylesMapping = {
    padding: {
        base: {
            [PlayerTileSize.md]: `${space.xs}px`,
            [PlayerTileSize.lg]: `${space.sm}px`,
        },
        [breakPoints.md]: {
            [PlayerTileSize.md]: `${space.sm}px`,
            [PlayerTileSize.lg]: `${space.base}px`,
        },
    },
    maxHeight: {
        base: {
            [PlayerTileSize.md]: '25vh',
            [PlayerTileSize.lg]: '45vh',
        },
        [breakPoints.sm]: {
            [PlayerTileSize.md]: '35vh',
            [PlayerTileSize.lg]: '45vh',
        },
        [breakPoints.md]: '50vh',
    },
    position: {
        [breakPoints.md]: `${space.md}px`,
        [breakPoints.lg]: `${space.lg}px`,
    },
}

export const Container = styled.div<
    Pick<Props, 'isFixed' | 'size' | 'fullWidth'>
>`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border: ${strokeWidth.md}px solid ${color.black};

    scrollbar-color: ${color.black} ${color.background};
    &::-webkit-scrollbar {
        width: ${space.xs}px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${color.black};
        border-radius: ${space.xs}px;
    }
    &::-webkit-scrollbar-track {
        background: ${color.background};
    }

    width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

    ${({ size }) => css`
        max-height: ${containerStylesMapping.maxHeight.base[size]};
        padding: ${containerStylesMapping.padding.base[size]};

        @media only screen and (min-width: ${breakPoints.sm}px) {
            max-height: ${containerStylesMapping.maxHeight[breakPoints.sm][
                size
            ]};
        }

        @media only screen and (min-width: ${breakPoints.md}px) {
            max-height: ${containerStylesMapping.maxHeight[breakPoints.md]};
            padding: ${containerStylesMapping.padding[breakPoints.md][size]};
        }
    `}

    ${({ isFixed }) =>
        isFixed &&
        css`
            position: fixed;
            width: auto;

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
        `}
`
