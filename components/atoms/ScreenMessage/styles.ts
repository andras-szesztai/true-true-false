import styled from '@emotion/styled'
import { designTokens } from 'styles/designTokens'

const { fontSize, breakPoints } = designTokens

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`
const messageContainerStylesMapping = {
    width: {
        base: '240px',
        [breakPoints.sm]: '320px',
        [breakPoints.md]: '480px',
        [breakPoints.lg]: '800px',
    },
}

export const MessageContainer = styled.div`
    text-align: center;

    width: ${messageContainerStylesMapping.width.base};

    @media only screen and (min-width: ${breakPoints.sm}px) {
        width: ${messageContainerStylesMapping.width[breakPoints.sm]};
    }

    @media only screen and (min-width: ${breakPoints.md}px) {
        width: ${messageContainerStylesMapping.width[breakPoints.md]};
    }

    @media only screen and (min-width: ${breakPoints.lg}px) {
        width: ${messageContainerStylesMapping.width[breakPoints.lg]};
    }
`

const messageStylesMapping = {
    fontSize: {
        base: fontSize.md,
        [breakPoints.md]: fontSize.lg,
    },
}

export const Message = styled.h1`
    font-size: ${messageStylesMapping.fontSize.base};

    @media only screen and (min-width: ${breakPoints.md}px) {
        font-size: ${messageStylesMapping.fontSize[breakPoints.md]};
    }
`
