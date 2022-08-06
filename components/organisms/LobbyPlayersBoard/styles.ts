import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

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
}

export const Container = styled.div`
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
`
