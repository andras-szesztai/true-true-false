import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, color, strokeWidth, fontSize, breakPoints } = designTokens

const stylesMap = {
    width: {
        base: '90vw',
        [breakPoints.sm]: '80vw',
        [breakPoints.md]: '70vw',
        [breakPoints.lg]: '60vw',
    },
    padding: {
        base: `${space.md}px`,
        [breakPoints.sm]: `${space.lg}px`,
        [breakPoints.md]: `${space.xl}px`,
        [breakPoints.lg]: `${space.xxl}px`,
    },
    gap: {
        base: `${space.md}px`,
        [breakPoints.md]: `${space.lg}px`,
    },
    fontSize: {
        base: fontSize.base,
        [breakPoints.md]: fontSize.md,
    },
}

export const ModalContainer = styled.div`
    z-index: 9999;
    position: fixed;
    height: 80vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    overflow-y: auto;
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

    display: flex;
    flex-direction: column;
    line-height: 1.5;

    background: ${color.accentOne};
    border: ${strokeWidth.md}px solid ${color.black};

    width: ${stylesMap.width.base};
    padding: ${stylesMap.padding.base};
    gap: ${stylesMap.gap.base};
    font-size: ${stylesMap.fontSize.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        width: ${stylesMap.width[breakPoints.sm]};
        padding: ${stylesMap.padding[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        width: ${stylesMap.width[breakPoints.md]};
        padding: ${stylesMap.padding[breakPoints.md]};
        gap: ${stylesMap.gap[breakPoints.md]};
        font-size: ${stylesMap.fontSize[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        width: ${stylesMap.width[breakPoints.lg]};
        padding: ${stylesMap.padding[breakPoints.md]};
    }
`
