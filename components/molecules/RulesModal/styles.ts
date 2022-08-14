import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, breakPoints, color, strokeWidth, fontSize } = designTokens

const containerStylesMap = {
    position: {
        [breakPoints.md]: `${space.md}px`,
        [breakPoints.lg]: `${space.lg}px`,
    },
}

export const Container = styled.div`
    @media only screen and (min-width: ${breakPoints.md}px) {
        position: fixed;
        right: ${containerStylesMap.position[breakPoints.md]};
        top: ${containerStylesMap.position[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        right: ${containerStylesMap.position[breakPoints.lg]};
        top: ${containerStylesMap.position[breakPoints.lg]};
    }
`

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

    width: 60vw;
    gap: ${space.xl}px;
    padding: ${space.xxl}px;
    font-size: ${fontSize.md};
`
