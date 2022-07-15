import styled from '@emotion/styled'

import { Link, LinkSizes } from 'components/atoms/Link'
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
            <Link href="easieasd0" text="Create a Room" size={LinkSizes.lg} />
            <InputContainer>
                <div>Input here</div>
                <Link href="easieasd0" text="Join" size={LinkSizes.md} />
            </InputContainer>
        </ContentContainer>
    </HomeContainer>
)

export default Home
