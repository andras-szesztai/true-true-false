import { NextSeo } from 'next-seo'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { HomePageContainer } from 'components/atoms/containers/HomePageContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { MainTitle } from 'components/atoms/MainTitle'
import { JoinRoom } from 'components/organisms/JoinRoom'
import { RulesModal } from 'components/molecules/RulesModal'
import { APP_DESCRIPTION, APP_NAME } from 'constants/appName'

// MISC
// - Review rules
// - Search TODOs
// E2E Pages:
// [ ] 10. Game Question End
// [ ] 11. Game Guess Reveal
// [ ] 12. Game Score Reveal
// [ ] 13. Game Scoring,
// [ ] 14. Results page
// [ ] 15. Room deleted

const Home = () => (
    <>
        <NextSeo
            title={APP_NAME}
            description={APP_DESCRIPTION}
            openGraph={{
                type: 'website',
                url: 'https://truetruefalse.netlify.app/',
                title: `${APP_NAME}, an online team building game`,
                description: APP_DESCRIPTION,
                images: [
                    {
                        url: 'https://i.ibb.co/Kq9KH91/Screenshot-2022-08-14-at-17-39-47.png',
                    },
                ],
            }}
            twitter={{
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
