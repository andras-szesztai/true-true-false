import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, color, strokeWidth, fontSize } = designTokens

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
    gap: ${space.lg}px;
    padding: ${space.xxl}px;
    font-size: ${fontSize.md};
`
