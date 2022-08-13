import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { HomePageContainer } from 'components/atoms/containers/HomePageContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { MainTitle } from 'components/atoms/MainTitle'
import { JoinRoom } from 'components/organisms/JoinRoom'

// TODO
// - Thumbnail for sharing url social media or chat
// - Check if fetching players might be easier with relational fetch
// - Add margin or padding bottom to screens for mobile scrolling
// - Check if slug & id could be united into one key
// - Investigate better type safety on API side

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
