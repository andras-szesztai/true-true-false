import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'
import { Props } from './types'

const { color, space, strokeWidth, breakPoints } = designTokens

const containerStylesMapping = {
    padding: {
        base: `${space.sm}px`,
        [breakPoints.md]: `${space.base}px`,
    },
    maxHeight: {
        base: '45vh',
        [breakPoints.md]: '50vh',
    },
    position: {
        base: `${space.sm}px`,
        [breakPoints.sm]: `${space.base}px`,
        [breakPoints.md]: `${space.md}px`,
        [breakPoints.lg]: `${space.lg}px`,
    },
}

export const Container = styled.div<Pick<Props, 'isFixed'>>`
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

    max-height: ${containerStylesMapping.maxHeight.base};
    padding: ${containerStylesMapping.padding.base};

    @media only screen and (min-width: ${breakPoints.md}px) {
        max-height: ${containerStylesMapping.maxHeight[breakPoints.md]};
        padding: ${containerStylesMapping.padding[breakPoints.md]};
    }

    ${({ isFixed }) =>
        isFixed &&
        css`
            position: fixed;

            left: ${containerStylesMapping.position.base};
            top: ${containerStylesMapping.position.base};

            @media only screen and (min-width: ${breakPoints.sm}px) {
                left: ${containerStylesMapping.position[breakPoints.sm]};
                top: ${containerStylesMapping.position[breakPoints.sm]};
            }

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
