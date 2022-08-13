import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { HomePageContainer } from 'components/atoms/containers/HomePageContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { MainTitle } from 'components/atoms/MainTitle'
import { JoinRoom } from 'components/organisms/JoinRoom'

// TODO
//
// FEAT
// - End Screen with delete game (players & statements) button for Admin
// - Rules modal on start page
// - CreatedBy & links
// MISC
// - Thumbnail for sharing url social media or chat
// - Style tab name/page header
// STYLING
// - Add margin or padding bottom to screens for mobile scrolling
// - Fix styling for responsiveness consistency
// API
// - Review player & players request
// - Check if fetching players might be easier with relational fetch
// TEST
// - e2e test with cypress
// BUG
// - Something Went Wrong While Trying to Update Player Scores, Please Try Again (last round?)
//

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
