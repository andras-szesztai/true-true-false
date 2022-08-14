import Head from 'next/head'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { HomePageContainer } from 'components/atoms/containers/HomePageContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { MainTitle } from 'components/atoms/MainTitle'
import { JoinRoom } from 'components/organisms/JoinRoom'
import { RulesModal } from 'components/molecules/RulesModal'
import { APP_NAME } from 'constants/appName'
import { useMount } from 'react-use'

// FEAT
// - Send cleanup request on home page mount
// MISC
// - Thumbnail for sharing url social media or chat
// TEST
// - e2e test with cypress
// FIX
// - Solution for Mobile slug and decrease questions button (not fixed after certain width)

const Home = () => {
    useMount(() => fetch('/api/room/clean-up'))
    return (
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
}

export default Home
