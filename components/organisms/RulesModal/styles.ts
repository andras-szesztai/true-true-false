import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const { space, breakPoints, color, strokeWidth } = designTokens

const containerStylesMap = {
    position: {
        [breakPoints.md]: `${space.md}px`,
        [breakPoints.lg]: `${space.lg}px`,
    },
}

export const Container = styled.div<{ isFixed: boolean }>`
    ${({ isFixed }) =>
        isFixed &&
        css`
            position: fixed;
            @media only screen and (min-width: ${breakPoints.md}px) {
                flex-direction: column;
                right: ${containerStylesMap.position[breakPoints.md]};
                top: ${containerStylesMap.position[breakPoints.md]};
            }

            @media only screen and (min-width: ${breakPoints.lg}px) {
                right: ${containerStylesMap.position[breakPoints.lg]};
                top: ${containerStylesMap.position[breakPoints.lg]};
            }
        `}
`

export const ModalContainer = styled.div`
    z-index: 9999;
    position: fixed;
    width: 80vw;
    height: 80vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${color.accentOne};
    border: ${strokeWidth.md}px solid ${color.black};
`
