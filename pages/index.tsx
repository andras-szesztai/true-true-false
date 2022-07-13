import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { designTokens } from 'styles/designTokens'

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${designTokens.space.xxl}px;
`

const Title = styled.h1`
    font-size: ${designTokens.fontSize.xxl};
`

enum ButtonSizes {
    md = 'md',
    lg = 'lg',
}

const buttonStylesMapping = {
    padding: {
        desktop: {
            [ButtonSizes.lg]: `${designTokens.space.md}px ${designTokens.space.xxl}px;`,
            [ButtonSizes.md]: `${designTokens.space.base}px ${designTokens.space.lg}px;`,
        },
    },
    fontSize: {
        desktop: {
            [ButtonSizes.lg]: designTokens.fontSize.xl,
            [ButtonSizes.md]: designTokens.fontSize.lg,
        },
    },
} as const

const Button = styled.button<{ size: ButtonSizes }>`
    background: ${designTokens.color.accentOne};
    border: ${designTokens.strokeWidth.md}px solid ${designTokens.color.black};
    cursor: pointer;
    line-height: 1;

    ${({ size }) => css`
        font-size: ${buttonStylesMapping.fontSize.desktop[size]};
        padding: ${buttonStylesMapping.padding.desktop[size]};
    `}
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Home = () => (
    <HomeContainer>
        <ContentContainer>
            <Title>TrueTrueFalse</Title>
            <Button size={ButtonSizes.lg}>Create a Room</Button>
            <InputContainer>
                <div>Input here</div>
                <Button size={ButtonSizes.md}>Join</Button>
            </InputContainer>
        </ContentContainer>
    </HomeContainer>
)

export default Home
