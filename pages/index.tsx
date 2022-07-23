import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { HomePageContainer } from 'components/atoms/containers/HomePageContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { MainTitle } from 'components/atoms/MainTitle'
import { JoinRoom } from 'components/organisms/JoinRoom'

// TODO
// - Thumbnail for sharing url

const Home = () => (
    <HomePageContainer>
        <HomeContentContainer>
            <MainTitle>TrueTrueFalse</MainTitle>
            <Link
                href="/create-room"
                text="Create a Room"
                size={LinkSizes.lg}
            />
            <JoinRoom />
        </HomeContentContainer>
    </HomePageContainer>
)

export default Home
