import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { color, strokeWidth, space, fontSize, breakPoints } = designTokens

const stylesMapping = {
    width: {
        base: '240px',
        [breakPoints.sm]: '320px',
        [breakPoints.md]: '360px',
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

    width: ${stylesMapping.width.base};
    padding: ${stylesMapping.padding.base};
    font-size: ${stylesMapping.fontSize.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        width: ${stylesMapping.width[breakPoints.sm]};
        padding: ${stylesMapping.padding[breakPoints.sm]};
        font-size: ${stylesMapping.fontSize[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        width: ${stylesMapping.width[breakPoints.md]};
        padding: ${stylesMapping.padding[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        font-size: ${stylesMapping.fontSize[breakPoints.lg]};
    }
`
export default StatementContainer
