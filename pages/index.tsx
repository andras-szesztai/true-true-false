import Head from 'next/head'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { HomePageContainer } from 'components/atoms/containers/HomePageContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { MainTitle } from 'components/atoms/MainTitle'
import { JoinRoom } from 'components/organisms/JoinRoom'
import { RulesModal } from 'components/molecules/RulesModal'
import { APP_NAME } from 'constants/appName'

// FEAT
// - 1. End Screen with delete game (players & statements) button for Admin
// - 2. CreatedBy & links
// MISC
// - Thumbnail for sharing url social media or chat
// - Add custom favicon
// TEST
// - e2e test with cypress
// FIX
// - Switch between submit & waiting (should keep statements in view)
// - Solution for Mobile slug and decrease questions button (not fixed after certain width)

const Home = () => (
    <>
        <Head>
            <title>{APP_NAME}</title>
        </Head>
        <HomePageContainer>
            <HomeContentContainer>
                <MainTitle>{APP_NAME}</MainTitle>
                <Link
                    href="/create-room"
                    text="Create a Room"
                    size={LinkSizes.lg}
                />
                <JoinRoom />
                <RulesModal />
            </HomeContentContainer>
        </HomePageContainer>
    </>
)

export default Home
