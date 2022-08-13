import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

import { Props } from './types'

const { space, fontSize, color, breakPoints } = designTokens

const stylesMapping = {
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

    bottom: ${stylesMapping.position.base};
    left: ${stylesMapping.position.base};
    font-size: ${stylesMapping.fontSize.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        bottom: ${stylesMapping.position[breakPoints.sm]};
        left: ${stylesMapping.position[breakPoints.sm]};
        font-size: ${stylesMapping.fontSize[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        bottom: ${stylesMapping.position[breakPoints.md]};
        left: ${stylesMapping.position[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        bottom: ${stylesMapping.position[breakPoints.lg]};
        left: ${stylesMapping.position[breakPoints.lg]};
        font-size: ${stylesMapping.fontSize[breakPoints.lg]};
    }
`

export const Number = styled.span<Pick<Props, 'questionsLeft'>>`
    color: ${({ questionsLeft }) =>
        !questionsLeft ? color.accentTwo : color.black};
`
