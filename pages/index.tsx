import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { HomePageContainer } from 'components/atoms/containers/HomePageContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { MainTitle } from 'components/atoms/MainTitle'
import { JoinRoom } from 'components/organisms/JoinRoom'

//
// TODO
//
// FEAT
// - End Screen with delete game (players & statements) button for Admin
// - Rules modal on start page
// - CreatedBy & links
// MISC
// - Thumbnail for sharing url social media or chat
// STYLING
// - Add margin or padding bottom to screens for mobile scrolling
// - Fix styling for responsiveness consistency
// API
// - Check if fetching players might be easier with relational fetch
// - Investigate better type safety on API side
// - Check if slug & id could be united into one key
// - review player & players request
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
