import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { color, strokeWidth, space, breakPoints, fontSize, shadows } =
    designTokens

const stylesMap = {
    padding: {
        base: `${space.base}px`,
        [breakPoints.sm]: `${space.base}px`,
        [breakPoints.md]: `${space.md}px`,
    },
    fontSize: {
        base: fontSize.base,
        [breakPoints.sm]: fontSize.md,
        [breakPoints.lg]: fontSize.lg,
    },
}

const TextArea = styled.textarea<{ noBorderTop?: boolean }>`
    resize: none;
    background-color: ${color.background};
    border-radius: 0;
    border: ${strokeWidth.md}px solid ${color.black};
    z-index: 1;

    ${({ noBorderTop }) =>
        noBorderTop &&
        css`
            border-top: none;
        `}

    ::placeholder {
        color: ${color.placeholder};
    }

    &:focus {
        outline: none;
        box-shadow: ${shadows.focus};
        z-index: 0;
    }

    padding: ${stylesMap.padding.base};
    font-size: ${stylesMap.fontSize.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        padding: ${stylesMap.padding[breakPoints.sm]};
        font-size: ${stylesMap.fontSize[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        padding: ${stylesMap.padding[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        font-size: ${stylesMap.fontSize[breakPoints.lg]};
    }
`

export default TextArea
