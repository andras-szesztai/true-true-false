import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { color, space, strokeWidth } = designTokens

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 50vh;
    padding: ${space.base}px;
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
`
