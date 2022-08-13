import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { color, strokeWidth, space, fontSize, breakPoints } = designTokens

const stylesMap = {
    width: {
        base: '240px',
        [breakPoints.sm]: '320px',
        [breakPoints.md]: '440px',
    },
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

const StatementContainer = styled.div<{
    noBorderTop?: boolean
    isSelected?: boolean
}>`
    position: relative;
    display: flex;
    line-height: 1;
    flex-direction: column;
    background-color: ${color.background};
    border: ${strokeWidth.md}px solid ${color.black};

    ${({ noBorderTop }) =>
        noBorderTop &&
        css`
            border-top: none;
        `}

    ${({ isSelected }) =>
        isSelected &&
        css`
            background-color: ${color.black};
            color: ${color.background};
        `}

    width: ${stylesMap.width.base};
    padding: ${stylesMap.padding.base};
    font-size: ${stylesMap.fontSize.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        width: ${stylesMap.width[breakPoints.sm]};
        padding: ${stylesMap.padding[breakPoints.sm]};
        font-size: ${stylesMap.fontSize[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        width: ${stylesMap.width[breakPoints.md]};
        padding: ${stylesMap.padding[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        font-size: ${stylesMap.fontSize[breakPoints.lg]};
    }
`
export default StatementContainer
