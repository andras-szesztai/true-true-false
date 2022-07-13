import styled from '@emotion/styled'

import { Button, ButtonSizes } from 'components/atoms/Button'
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

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Home = () => (
    <HomeContainer>
        <ContentContainer>
            <Title>TrueTrueFalse</Title>
            <Button text="Create a Room" size={ButtonSizes.lg} />
            <InputContainer>
                <div>Input here</div>
                <Button text="Join" size={ButtonSizes.md} />
            </InputContainer>
        </ContentContainer>
    </HomeContainer>
)

export default Home
