import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

import { Props } from './types'

const { space, fontSize, color, breakPoints } = designTokens

const stylesMap = {
    position: {
        base: `${space.sm}px`,
        [breakPoints.sm]: `${space.base}px`,
        [breakPoints.md]: `${space.md}px`,
        [breakPoints.lg]: `${space.lg}px`,
    },
    fontSize: {
        base: fontSize.base,
        [breakPoints.sm]: fontSize.md,
        [breakPoints.lg]: fontSize.lg,
    },
}

export const Container = styled.div`
    position: fixed;
    display: flex;
    gap: ${space.base}px;
    align-items: center;

    bottom: ${stylesMap.position.base};
    left: ${stylesMap.position.base};
    font-size: ${stylesMap.fontSize.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        bottom: ${stylesMap.position[breakPoints.sm]};
        left: ${stylesMap.position[breakPoints.sm]};
        font-size: ${stylesMap.fontSize[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        bottom: ${stylesMap.position[breakPoints.md]};
        left: ${stylesMap.position[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        bottom: ${stylesMap.position[breakPoints.lg]};
        left: ${stylesMap.position[breakPoints.lg]};
        font-size: ${stylesMap.fontSize[breakPoints.lg]};
    }
`

export const Number = styled.span<Pick<Props, 'questionsLeft'>>`
    color: ${({ questionsLeft }) =>
        !questionsLeft ? color.accentTwo : color.black};
`
