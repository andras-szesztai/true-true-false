import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { shadows, color, fontSize, space, strokeWidth, breakPoints } =
    designTokens

const inputStylesMap = {
    padding: {
        base: `${space.base}px ${space.lg}px`,
        [breakPoints.sm]: `${space.base}px ${space.xl}px`,
        [breakPoints.md]: `${space.md}px ${space.xxl}px`,
    },
    width: {
        base: '236px',
        [breakPoints.sm]: '268px',
        [breakPoints.md]: '356px',
        [breakPoints.lg]: '468px',
    },
    fontSize: {
        base: fontSize.md,
        [breakPoints.md]: fontSize.lg,
        [breakPoints.lg]: fontSize.xl,
    },
}

export const StyledInput = styled.input`
    text-align: center;
    line-height: 1;
    background-color: ${color.background};
    border-radius: 0;
    border: ${strokeWidth.md}px solid ${color.black};
    z-index: 1;

    ::placeholder {
        color: ${color.placeholder};
    }

    &:focus {
        outline: none;
        box-shadow: ${shadows.focus};
        z-index: 0;
    }

    padding: ${inputStylesMap.padding.base};
    width: ${inputStylesMap.width.base};
    font-size: ${inputStylesMap.fontSize.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        padding: ${inputStylesMap.padding[breakPoints.sm]};
        width: ${inputStylesMap.width[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        padding: ${inputStylesMap.padding[breakPoints.md]};
        width: ${inputStylesMap.width[breakPoints.md]};
        font-size: ${inputStylesMap.fontSize[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        width: ${inputStylesMap.width[breakPoints.lg]};
        font-size: ${inputStylesMap.fontSize[breakPoints.lg]};
    }
`

export const InputContainer = styled.div`
    position: relative;
    z-index: 1;
`

const inputErrorStylesMap = {
    fontSize: {
        base: fontSize.sm,
        [breakPoints.sm]: fontSize.sm,
        [breakPoints.md]: fontSize.base,
        [breakPoints.lg]: fontSize.base,
    },
}

export const InputError = styled.span`
    position: absolute;
    bottom: 0px;
    left: 0px;
    background: ${color.accentTwo};
    width: 100%;
    text-align: center;
    border: ${strokeWidth.md}px solid ${color.black};
    border-top: none;

    font-size: ${fontSize.base};
    font-size: ${inputErrorStylesMap.fontSize.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        font-size: ${inputErrorStylesMap.fontSize[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        font-size: ${inputErrorStylesMap.fontSize[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        font-size: ${inputErrorStylesMap.fontSize[breakPoints.lg]};
    }
`
