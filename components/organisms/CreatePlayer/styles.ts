import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { strokeWidth, color, fontSize, space, shadows, breakPoints } =
    designTokens

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

const stylesMap = {
    padding: {
        base: `${space.sm}px ${space.xs}px;`,
        [breakPoints.sm]: `${space.base}px ${space.base}px;`,
        [breakPoints.md]: `${space.base}px ${space.md}px;`,
        [breakPoints.lg]: `${space.base}px ${space.lg}px;`,
    },
    fontSize: {
        base: fontSize.base,
        [breakPoints.sm]: fontSize.md,
        [breakPoints.md]: fontSize.lg,
        [breakPoints.lg]: fontSize.xl,
    },
}

export const EmojiSelectorButton = styled.button`
    height: 100%;
    cursor: pointer;
    background: ${color.background};
    border: ${strokeWidth.md}px solid ${color.black};
    border-right: none;
    position: relative;
    z-index: 2;

    &:focus {
        outline: none;
        box-shadow: ${shadows.focus};
        z-index: 0;
    }

    font-size: ${stylesMap.fontSize.base};
    padding: ${stylesMap.padding.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        font-size: ${stylesMap.fontSize[breakPoints.sm]};
        padding: ${stylesMap.padding[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        font-size: ${stylesMap.fontSize[breakPoints.md]};
        padding: ${stylesMap.padding[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        font-size: ${stylesMap.fontSize[breakPoints.lg]};
        padding: ${stylesMap.padding[breakPoints.lg]};
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
