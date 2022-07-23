import styled from '@emotion/styled'
import { designTokens } from 'styles/designTokens'

const { strokeWidth, color, fontSize, space, shadows } = designTokens

export const CreatePlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const InputContainer = styled.div`
    display: flex;
`

export const ButtonContainer = styled.div`
    align-self: stretch;
`

export const EmojiSelectorButton = styled.button`
    height: 100%;
    cursor: pointer;
    background: ${color.background};
    border: ${strokeWidth.md}px solid ${color.black};
    border-right: none;
    position: relative;
    font-size: ${fontSize.xl};
    padding: ${space.base}px ${space.lg}px;
    z-index: 2;

    &:focus {
        outline: none;
        box-shadow: ${shadows.focus};
        z-index: 0;
    }
`

export const EmojiSelectorContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    font-size: ${fontSize.sm};
`
