import { NextSeo } from 'next-seo'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { HomePageContainer } from 'components/atoms/containers/HomePageContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { MainTitle } from 'components/atoms/MainTitle'
import { JoinRoom } from 'components/organisms/JoinRoom'
import { RulesModal } from 'components/molecules/RulesModal'
import { APP_NAME } from 'constants/appName'

// MISC
// - Review rules
// TEST
// - e2e test with cypress

const Home = () => (
    <>
        <NextSeo
            title={APP_NAME}
            description="An online team building game, find out more about your fellow players while having fun together."
            openGraph={{
                type: 'website',
                url: 'https://truetruefalse.netlify.app/',
                title: APP_NAME,
                description:
                    'Online team building game, find out more about your fellow players while having fun together.',
                images: [{ url: 'https://ibb.co/4Tj1xjQ' }],
            }}
            twitter={{
                handle: '@handle',
                site: '@some',
                cardType: 'summary_large_image',
            }}
        />
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
