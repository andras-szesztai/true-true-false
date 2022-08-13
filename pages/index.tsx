import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { HomePageContainer } from 'components/atoms/containers/HomePageContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { MainTitle } from 'components/atoms/MainTitle'
import { JoinRoom } from 'components/organisms/JoinRoom'

// STYLING
// - Add margin or padding bottom to screens for mobile scrolling
// - Fix styling for responsiveness consistency
// - Style tab name/page header
// FEAT
// - 1. End Screen with delete game (players & statements) button for Admin
// - 2. Rules modal on start page
// - 3. CreatedBy & links
// MISC
// - Thumbnail for sharing url social media or chat
// BUG
// - Something Went Wrong While Trying to Update Player Scores, Please Try Again (last round?)
// TEST
// - e2e test with cypress

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
