import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { color, strokeWidth, fontSize, space } = designTokens

export const GuessEmojiContainer = styled.div`
    display: flex;
    align-items: center;

    min-height: ${space.xl}px;

    padding: ${space.xxs}px ${space.xs}px;
    gap: ${space.xs}px;

    font-size: ${fontSize.md};

    background-color: ${color.background};
    border: ${strokeWidth.md}px solid ${color.black};
`
