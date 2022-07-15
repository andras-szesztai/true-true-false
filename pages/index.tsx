import styled from '@emotion/styled'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { HomePageContainer } from 'components/atoms/containers/HomePageContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { MainTitle } from 'components/atoms/MainTitle'
import { generateRoomId } from 'utils/roomId'

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const JoinRoom = () => (
    <InputContainer>
        <div>Input here</div>
        <Link href="easieasd0" text="Join" size={LinkSizes.md} />
    </InputContainer>
)

const Home = () => (
    <HomePageContainer>
        <HomeContentContainer>
            <MainTitle>TrueTrueFalse</MainTitle>
            <Link
                href={generateRoomId(5)}
                text="Create a Room"
                size={LinkSizes.lg}
            />
            <JoinRoom />
        </HomeContentContainer>
    </HomePageContainer>
)

export default Home
